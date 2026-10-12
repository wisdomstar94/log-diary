import { useEffect, useEffectEvent, useState } from "react";

import { getEntryById } from "@/db/entries/get-entry-by-id";
import type { Entry } from "@/types/entry";
import { getNowTime } from "@/utils/dates/get-now-time";

/** entryId 가 있으면 그 기록을 불러와 채운다 */
export function useComposeForm(entryId: string | undefined) {
  const [time, setTime] = useState(() => getNowTime());
  const [text, setText] = useState("");

  // setTime · setText 는 아래 두 함수에서만 호출한다.
  function changeTime(nextTime: string, options?: { from: string }) {
    if (__DEV__) {
      console.log("changeComposeTime from", options?.from);
    }
    setTime(nextTime);
  }

  function changeText(nextText: string, options?: { from: string }) {
    if (__DEV__) {
      console.log("changeComposeText from", options?.from);
    }
    setText(nextText);
  }

  const fillFromEntry = useEffectEvent((entry: Entry | null) => {
    if (entry === null) {
      return;
    }
    changeTime(entry.time, { from: "수정할 기록 불러오기" });
    changeText(entry.content, { from: "수정할 기록 불러오기" });
  });

  useEffect(() => {
    if (entryId === undefined) {
      return;
    }
    getEntryById(entryId).then(fillFromEntry);
  }, [entryId]);

  return { time, text, changeTime, changeText };
}
