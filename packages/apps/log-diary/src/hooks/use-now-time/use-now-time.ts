import { useEffect, useState } from "react";

import { getNowTime } from "@/utils/dates/get-now-time";

const TICK_MS = 5000;

/** 'HH:mm'. 화면에 띄운 현재 시각을 분이 바뀔 때 갱신한다 */
export function useNowTime() {
  const [nowTime, setNowTime] = useState(() => getNowTime());

  useEffect(() => {
    const timer = setInterval(() => setNowTime(getNowTime()), TICK_MS);
    return () => clearInterval(timer);
  }, []);

  return nowTime;
}
