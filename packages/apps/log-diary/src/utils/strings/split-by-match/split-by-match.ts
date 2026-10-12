/** 대소문자 구분 없이 처음 일치한 부분을 기준으로 나눈다. 일치가 없으면 hit 이 빈 문자열 */
export function splitByMatch(text: string, query: string) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  const isMatched = (() => {
    if (query === "") {
      return false;
    }
    return index >= 0;
  })();
  if (!isMatched) {
    return { pre: text, hit: "", post: "" };
  }
  return {
    pre: text.slice(0, index),
    hit: text.slice(index, index + query.length),
    post: text.slice(index + query.length),
  };
}
