import { useSettingsManagerContext } from "@/contexts/settings-manager-context";
import { useQuickWriteNotification } from "@/hooks/use-quick-write-notification";

/** 설정을 다 불러온 뒤에만 그려, 기본값(꺼짐)으로 알림을 내렸다 다시 띄우지 않게 한다 */
export function QuickWriteNotificationSync() {
  const settingsManager = useSettingsManagerContext();
  const { persistentNotification, lastBackupFailure } = settingsManager.settings;
  useQuickWriteNotification(persistentNotification, lastBackupFailure?.at ?? null);
  return null;
}
