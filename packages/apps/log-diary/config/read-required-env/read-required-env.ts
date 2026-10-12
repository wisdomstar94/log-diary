// loadVariantEnv 가 먼저 APP_VARIANT 를 검증해 채운 뒤에만 호출한다.
export function readRequiredEnv(name: string) {
  const value = process.env[name] ?? "";
  if (value === "") {
    throw new Error(
      `${name} 가 설정되지 않았습니다. packages/apps/log-diary/envs/example.env 를 참고해 envs/${process.env.APP_VARIANT}.env 를 채워 주세요.`,
    );
  }
  return value;
}
