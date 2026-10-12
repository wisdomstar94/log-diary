import { APP_NAME_EN } from "@log-diary/shared-const/app/app-name";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderBar } from "@/components/header-bar";
import { ScreenContainer } from "@/components/screen-container";
import { ThemedText } from "@/components/themed-text";
import { useSettingsManagerContext } from "@/contexts/settings-manager-context";
import { useTotalEntryCount } from "@/hooks/use-total-entry-count";
import { getBackLabel } from "@/utils/platforms/get-back-label";

import { DataSettingsGroup } from "./_components/data-settings-group";
import { QuickWriteSettingsGroup } from "./_components/quick-write-settings-group";
import { ViewSettingsGroup } from "./_components/view-settings-group";

export function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const totalEntryCount = useTotalEntryCount();
  const { driveAccountEmail } = useSettingsManagerContext().settings;
  const storageNote =
    driveAccountEmail === null
      ? "모든 기록은 이 기기에만 저장됩니다."
      : "기록은 이 기기에 저장되고 Google 드라이브에 백업됩니다.";
  const version = Constants.expoConfig?.version ?? "";

  return (
    <ScreenContainer>
      <HeaderBar backLabel={getBackLabel("뒤로")} onBack={() => router.back()} title="설정" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 40 + insets.bottom }]}>
        <QuickWriteSettingsGroup />
        <ViewSettingsGroup />
        <View>
          <DataSettingsGroup />
          <ThemedText size={12} color="sub" lineHeightRatio={1.5} style={styles.note}>
            {`${storageNote} 총 ${totalEntryCount}개의 기록.`}
          </ThemedText>
        </View>
        <ThemedText font="mono" size={12} color="faint" style={styles.version}>
          {`${APP_NAME_EN} · v${version}`}
        </ThemedText>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
    gap: 22,
  },
  note: {
    paddingTop: 10,
    paddingHorizontal: 6,
  },
  version: {
    textAlign: "center",
  },
});
