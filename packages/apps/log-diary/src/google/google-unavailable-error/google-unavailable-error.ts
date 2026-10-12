/** Expo Go 이거나 클라이언트 ID 가 비어 있어 Google 로그인을 쓸 수 없을 때 */
export class GoogleUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GoogleUnavailableError";
  }
}
