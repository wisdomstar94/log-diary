import { DriveRequestError } from "@/drive/drive-request-error";
import { clearGoogleAccessToken } from "@/google/clear-google-access-token";
import { getGoogleAccessToken } from "@/google/get-google-access-token";

/** 액세스 토큰을 붙여 요청하고, 401 이면 캐시된 토큰을 지운 뒤 한 번 다시 시도한다 */
export async function driveFetch(url: string, init: RequestInit = {}) {
  const request = (accessToken: string) =>
    fetch(url, {
      ...init,
      headers: { ...init.headers, Authorization: `Bearer ${accessToken}` },
    });
  const accessToken = await getGoogleAccessToken();
  const response = await request(accessToken);
  if (response.status !== 401) {
    return assertOk(response);
  }
  await clearGoogleAccessToken(accessToken);
  return assertOk(await request(await getGoogleAccessToken()));
}

async function assertOk(response: Response) {
  if (!response.ok) {
    throw new DriveRequestError(response.status, await response.text());
  }
  return response;
}
