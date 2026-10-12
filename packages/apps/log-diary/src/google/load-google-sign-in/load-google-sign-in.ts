import Constants, { ExecutionEnvironment } from "expo-constants";

import { DRIVE_APPDATA_SCOPE } from "@/constants/google-drive";
import { GoogleUnavailableError } from "@/google/google-unavailable-error";

type GoogleSignInModule = typeof import("react-native-nitro-google-signin");

let loadedModule: GoogleSignInModule | null = null;

function readClientIds() {
  const extra = Constants.expoConfig?.extra ?? {};
  return {
    webClientId: String(extra.googleWebClientId ?? ""),
    iosClientId: String(extra.googleIosClientId ?? ""),
  };
}

/**
 * 네이티브 모듈이 없는 Expo Go 에서 앱 전체가 멈추지 않도록, 필요할 때만 불러와 한 번 설정한다.
 * 동적 import() 는 개발 모드에서 코드를 서버에 따로 요청해 실기기에서 실패할 수 있어 require() 를 쓴다.
 */
export async function loadGoogleSignIn() {
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    throw new GoogleUnavailableError("개발 빌드에서만 Google 계정을 연결할 수 있어요");
  }
  const clientIds = readClientIds();
  if (clientIds.webClientId === "") {
    throw new GoogleUnavailableError("Google 클라이언트 ID 가 설정되지 않았어요");
  }
  if (loadedModule === null) {
    const module: GoogleSignInModule = require("react-native-nitro-google-signin");
    module.GoogleOneTapSignIn.configure({
      webClientId: clientIds.webClientId,
      iosClientId: clientIds.iosClientId === "" ? null : clientIds.iosClientId,
      scopes: [DRIVE_APPDATA_SCOPE],
    });
    loadedModule = module;
  }
  return loadedModule;
}
