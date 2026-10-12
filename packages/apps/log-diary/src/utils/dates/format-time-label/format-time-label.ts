/** 노트 테마는 `[09시 13분]`, 미니멀 테마는 `09:13` */
export function formatTimeLabel(time: string, isBracketTime: boolean) {
  if (!isBracketTime) {
    return time;
  }
  const [hour, minute] = time.split(":");
  return `[${hour}시 ${minute}분]`;
}
