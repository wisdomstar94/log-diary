import { loadGoogleSignIn } from "@/google/load-google-sign-in";

export async function clearGoogleAccessToken(accessToken: string) {
  const { GoogleOneTapSignIn } = await loadGoogleSignIn();
  await GoogleOneTapSignIn.clearCachedAccessToken(accessToken);
}
