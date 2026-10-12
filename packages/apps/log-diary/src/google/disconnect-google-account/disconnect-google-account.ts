import { loadGoogleSignIn } from "@/google/load-google-sign-in";

export async function disconnectGoogleAccount() {
  const { GoogleOneTapSignIn } = await loadGoogleSignIn();
  await GoogleOneTapSignIn.signOut();
}
