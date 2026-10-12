import { updateSetting } from "@/db/settings/update-setting";

/** 사용자 변경을 바로 기록해 두어, 백업 전에 앱이 꺼져도 다음 실행 때 다시 올린다 */
export function markUnsyncedChange() {
  return updateSetting("hasUnsyncedChanges", true);
}
