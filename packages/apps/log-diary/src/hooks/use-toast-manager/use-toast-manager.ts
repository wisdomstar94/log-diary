import { useEffect, useRef, useState } from "react";

const TOAST_DURATION_MS = 1800;

export function useToastManager() {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // setMessage 는 이 함수에서만 호출한다.
  function changeMessage(nextMessage: string | null, options?: { from: string }) {
    if (__DEV__) {
      console.log("changeToastMessage", nextMessage, "from", options?.from);
    }
    setMessage(nextMessage);
  }

  function showToast(nextMessage: string, options?: { from: string }) {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    changeMessage(nextMessage, options);
    timerRef.current = setTimeout(() => {
      changeMessage(null, { from: "토스트 자동 닫힘" });
    }, TOAST_DURATION_MS);
  }

  return { message, showToast };
}
