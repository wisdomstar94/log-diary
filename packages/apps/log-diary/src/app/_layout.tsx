import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { AutoBackupSync } from "@/components/auto-backup-sync";
import { QuickWriteNotificationSync } from "@/components/quick-write-notification-sync";
import { QuickWriteWidgetSync } from "@/components/quick-write-widget-sync";
import { Toast } from "@/components/toast";
import { FONT_ASSETS } from "@/constants/font-family";
import { THEMES } from "@/constants/theme";
import { SettingsManagerContext } from "@/contexts/settings-manager-context";
import { ThemeNameContext } from "@/contexts/theme-name-context";
import { ToastManagerContext } from "@/contexts/toast-manager-context";
import { useSettingsManager } from "@/hooks/use-settings-manager";
import { useToastManager } from "@/hooks/use-toast-manager";

SplashScreen.preventAutoHideAsync();

// 위젯 · 알림 딥링크로 작성 화면이 바로 열려도 메인 화면 위에 모달로 쌓이게 한다.
export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const [isFontLoaded, fontError] = useFonts(FONT_ASSETS);
  const settingsManager = useSettingsManager();
  const toastManager = useToastManager();
  const isReady = (() => {
    if (!settingsManager.isLoaded) {
      return false;
    }
    if (isFontLoaded) {
      return true;
    }
    return fontError !== null;
  })();
  const themeName = settingsManager.settings.theme;

  useEffect(() => {
    if (!isReady) {
      return;
    }
    SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SettingsManagerContext value={settingsManager}>
      <ToastManagerContext value={toastManager}>
        <ThemeNameContext value={themeName}>
          <QuickWriteNotificationSync />
          <AutoBackupSync />
          <QuickWriteWidgetSync />
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: THEMES[themeName].colors.bg },
            }}>
            <Stack.Screen name="compose" options={{ presentation: "modal" }} />
          </Stack>
          <Toast message={toastManager.message} />
        </ThemeNameContext>
      </ToastManagerContext>
    </SettingsManagerContext>
  );
}
