import { useEffect, useEffectEvent, useState } from "react";

import { subscribeDataChanged } from "@/db/data-change-emitter";

/**
 * queryKey 가 바뀌거나 DB 쓰기가 일어나면 query 를 다시 실행한다.
 * 이전 queryKey 의 결과는 data 로 돌려주지 않는다.
 */
export function useDbQuery<T>(queryKey: string, query: () => Promise<T>) {
  const [result, setResult] = useState<{ queryKey: string; data: T } | null>(null);

  const runQuery = useEffectEvent(async (key: string, isCancelled: () => boolean) => {
    const data = await query();
    if (isCancelled()) {
      return;
    }
    setResult({ queryKey: key, data });
  });

  useEffect(() => {
    let isCancelledFlag = false;
    const isCancelled = () => isCancelledFlag;
    runQuery(queryKey, isCancelled);
    const unsubscribe = subscribeDataChanged(() => {
      runQuery(queryKey, isCancelled);
    });
    return () => {
      isCancelledFlag = true;
      unsubscribe();
    };
  }, [queryKey]);

  const isCurrent = result !== null && result.queryKey === queryKey;
  return { data: isCurrent ? result.data : undefined, isLoading: !isCurrent };
}
