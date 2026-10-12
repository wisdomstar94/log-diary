import { Platform } from "react-native";

import { SettingsGroup } from "@/components/settings-group";
import { SettingsRow } from "@/components/settings-row";
import { useSettingsManagerContext } from "@/contexts/settings-manager-context";
import { useToastManagerContext } from "@/contexts/toast-manager-context";
import { setupQuickWriteChannel } from "@/notifications/quick-write/setup-quick-write-channel";
import { showQuickWriteNotification } from "@/notifications/quick-write/show-quick-write-notification";
import { requestNotificationPermission } from "@/utils/permissions/request-notification-permission";

import { IosWidgetRow } from "./_components/ios-widget-row";

/** Android 는 상시 알림 설정, iOS 는 잠금화면 위젯 안내 */
export function QuickWriteSettingsGroup() {
  const settingsManager = useSettingsManagerContext();
  const toastManager = useToastManagerContext();
  const isEnabled = settingsManager.settings.persistentNotification;

  if (Platform.OS === "ios") {
    return (
      <SettingsGroup label="빠른 작성">
        <IosWidgetRow />
      </SettingsGroup>
    );
  }

  async function toggle() {
    if (isEnabled) {
      settingsManager.changeSetting("persistentNotification", false, {
        from: "설정 — 상시 알림 끔",
      });
      return;
    }
    const isGranted = await requestNotificationPermission();
    if (!isGranted) {
      toastManager.showToast("알림 권한이 꺼져 있어요", { from: "설정 — 상시 알림 권한 거부" });
      return;
    }
    settingsManager.changeSetting("persistentNotification", true, { from: "설정 — 상시 알림 켬" });
  }

  async function preview() {
    const isGranted = await requestNotificationPermission();
    if (!isGranted) {
      toastManager.showToast("알림 권한이 꺼져 있어요", { from: "설정 — 알림 미리보기 권한 거부" });
      return;
    }
    await setupQuickWriteChannel();
    await showQuickWriteNotification({ isSticky: isEnabled });
    toastManager.showToast("알림 패널을 내려 확인해 보세요", { from: "설정 — 알림 미리보기" });
  }

  return (
    <SettingsGroup label="빠른 작성">
      <SettingsRow
        title="알림 패널에 상시 표시"
        description="'일기 바로 작성' 알림을 항상 띄움"
        accessory={{ type: "toggle", isOn: isEnabled }}
        onPress={toggle}
      />
      <SettingsRow
        title="알림 미리보기"
        accessory={{ type: "chevron" }}
        onPress={preview}
        hasTopBorder
      />
    </SettingsGroup>
  );
}
