import { loadGoogleSignIn } from "@/google/load-google-sign-in";

/** 저장된 로그인으로 새 액세스 토큰을 받는다. 계정 선택 화면은 띄우지 않는다 */
export async function getGoogleAccessToken() {
  const { GoogleOneTapSignIn } = await loadGoogleSignIn();
  // iOS 는 앱을 새로 켜면 로그인 사용자가 비어 있어, 이전 로그인을 먼저 조용히 복원해야 토큰을 받을 수 있다.
  if (GoogleOneTapSignIn.getCurrentUser() === null) {
    await GoogleOneTapSignIn.signIn();
  }
  const tokens = await GoogleOneTapSignIn.getTokens();
  return tokens.accessToken;
}
