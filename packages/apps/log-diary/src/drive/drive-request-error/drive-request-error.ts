/** Drive API 가 2xx 가 아닌 응답을 준 경우. 응답 본문으로 실패 원인을 가려낸다 */
export class DriveRequestError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(status: number, body: string) {
    super(`Drive 요청 실패 (${status}) ${body}`);
    this.name = "DriveRequestError";
    this.status = status;
    this.body = body;
  }
}
