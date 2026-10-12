import { DRIVE_APPDATA_SCOPE } from "@/constants/google-drive";
import { loadGoogleSignIn } from "@/google/load-google-sign-in";

/** 계정을 고르게 하고 Drive 앱 전용 폴더 권한을 받는다. 취소하면 null */
export async function connectGoogleAccount() {
  const { GoogleOneTapSignIn, isSuccessResponse } = await loadGoogleSignIn();
  await GoogleOneTapSignIn.checkPlayServices();
  const response = await GoogleOneTapSignIn.createAccount();
  if (!isSuccessResponse(response)) {
    return null;
  }
  const authorization = await GoogleOneTapSignIn.requestScopes([DRIVE_APPDATA_SCOPE]);
  if (authorization.accessToken === null) {
    return null;
  }
  return { email: response.data.user.email ?? response.data.user.id };
}
