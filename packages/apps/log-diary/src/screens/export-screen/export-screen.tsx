import { APP_NAME } from "@log-diary/shared-const/app/app-name";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Share, StyleSheet, View } from "react-native";
import { FilledButton } from "@/components/filled-button";
import { HeaderBar } from "@/components/header-bar";
import { ScreenContainer } from "@/components/screen-container";
import { SegmentedControl } from "@/components/segmented-control";
import { ThemedText } from "@/components/themed-text";
import { useToastManagerContext } from "@/contexts/toast-manager-context";
import { useBottomPadding } from "@/hooks/use-bottom-padding";
import { useTheme } from "@/hooks/use-theme";
import { toMonthKey } from "@/utils/dates/to-month-key";
import { saveTextFile } from "@/utils/exports/save-text-file";
import { getBackLabel } from "@/utils/platforms/get-back-label";

import { useExportData } from "./_hooks/use-export-data";

type ExportRange = "month" | "all";

const RANGE_OPTIONS: { value: ExportRange; label: string }[] = [
  { value: "month", label: "이번 달" },
  { value: "all", label: "전체" },
];

export function ExportScreen() {
  const router = useRouter();
  const theme = useTheme();
  const bottomPadding = useBottomPadding();
  const toastManager = useToastManagerContext();
  const [range, setRange] = useState<ExportRange>("month");
  const [now] = useState(() => new Date());
  const monthKey = toMonthKey(now.getFullYear(), now.getMonth());
  const exportData = useExportData(range === "month" ? monthKey : "");
  const fileName = range === "month" ? `${APP_NAME}_${monthKey}.txt` : `${APP_NAME}_전체.txt`;
  const metaLabel =
    range === "month"
      ? `${now.getFullYear()}년 ${now.getMonth() + 1}월 · ${exportData.count}개`
      : `전체 · ${exportData.count}개`;

  function isExportable() {
    if (exportData.count > 0) {
      return true;
    }
    toastManager.showToast("내보낼 기록이 없습니다", { from: "내보내기 — 빈 범위" });
    return false;
  }

  async function share() {
    if (!isExportable()) {
      return;
    }
    await Share.share({ message: exportData.text, title: fileName });
  }

  async function save() {
    if (!isExportable()) {
      return;
    }
    try {
      const isSaved = await saveTextFile(fileName, exportData.text);
      if (isSaved) {
        toastManager.showToast(`${fileName} 저장됨`, { from: "내보내기 — .txt 저장" });
      }
    } catch {
      // 폴더 선택을 취소한 경우라 따로 알리지 않는다.
    }
  }

  return (
    <ScreenContainer>
      <HeaderBar
        backLabel={getBackLabel("설정")}
        onBack={() => router.back()}
        title="텍스트로 내보내기"
      />
      <View style={styles.toolbar}>
        <SegmentedControl options={RANGE_OPTIONS} value={range} onChange={setRange} />
        <ThemedText size={13} color="sub">
          {metaLabel}
        </ThemedText>
      </View>
      <ScrollView
        style={[
          styles.preview,
          {
            borderRadius: theme.radius.card,
            backgroundColor: theme.colors.surface,
          },
          theme.colors.cardBorder !== null && {
            borderWidth: 1,
            borderColor: theme.colors.cardBorder,
          },
        ]}
        contentContainerStyle={styles.previewContent}>
        <ThemedText font="mono" size={13} lineHeightRatio={1.65}>
          {exportData.text}
        </ThemedText>
      </ScrollView>
      <View style={[styles.actions, { paddingBottom: bottomPadding }]}>
        <FilledButton
          label="공유"
          onPress={share}
          variant="outline"
          height={50}
          fontSize={15}
          style={styles.action}
        />
        <FilledButton
          label=".txt 저장"
          onPress={save}
          height={50}
          fontSize={15}
          style={styles.action}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 6,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  preview: {
    flex: 1,
    marginHorizontal: 16,
  },
  previewContent: {
    padding: 16,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 14,
    paddingHorizontal: 16,
  },
  action: {
    flex: 1,
  },
});
