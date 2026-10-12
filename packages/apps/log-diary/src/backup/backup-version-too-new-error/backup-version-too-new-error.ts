/** 더 새 버전의 앱이 만든 백업. 이 앱이 모르는 데이터를 덮어쓰지 않도록 합치기 · 올리기를 멈춘다 */
export class BackupVersionTooNewError extends Error {
  readonly version: number;

  constructor(version: number) {
    super("더 새 버전의 앱으로 만든 백업이에요. 앱을 업데이트해 주세요");
    this.name = "BackupVersionTooNewError";
    this.version = version;
  }
}
