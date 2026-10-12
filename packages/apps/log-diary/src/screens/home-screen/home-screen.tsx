import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { ThemedText } from "@/components/themed-text";
import { useSettingsManagerContext } from "@/contexts/settings-manager-context";
import { useMonthSummary } from "@/hooks/use-month-summary";
import type { StartMode } from "@/types/settings";
import { toDateKey } from "@/utils/dates/to-date-key";
import { toMonthKey } from "@/utils/dates/to-month-key";

import { DayList } from "./_components/day-list";
import { HomeHeader } from "./_components/home-header";
import { MonthCalendar } from "./_components/month-calendar";
import { MonthNavigator } from "./_components/month-navigator";
import { RecordButton } from "./_components/record-button";

export function HomeScreen() {
  const router = useRouter();
  const settingsManager = useSettingsManagerContext();
  const startMode = settingsManager.settings.startMode;
  const [mode, setMode] = useState<StartMode>(startMode);
  const [prevStartMode, setPrevStartMode] = useState(startMode);
  // 설정에서 시작 화면을 바꾸면 이미 떠 있는 메인 화면의 보기도 따라 바꾼다.
  if (prevStartMode !== startMode) {
    setPrevStartMode(startMode);
    setMode(startMode);
  }
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const monthSummary = useMonthSummary(toMonthKey(visibleMonth.year, visibleMonth.month));
  const summaryLabel =
    monthSummary.days.length === 0
      ? "기록 없음"
      : `${monthSummary.days.length}일 · ${monthSummary.entryCount}개의 기록`;

  if (!settingsManager.settings.onboarded) {
    return <Redirect href="/onboarding" />;
  }

  function moveMonth(offset: number) {
    setVisibleMonth((prev) => {
      const date = new Date(prev.year, prev.month + offset, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }

  function openDay(dateKey: string) {
    router.push({ pathname: "/days/[date]", params: { date: dateKey } });
  }

  function openCompose() {
    router.push({ pathname: "/compose", params: { date: toDateKey(new Date()) } });
  }

  return (
    <ScreenContainer>
      <HomeHeader
        onPressSearch={() => router.push("/search")}
        onPressSettings={() => router.push("/settings")}
      />
      <MonthNavigator
        year={visibleMonth.year}
        month={visibleMonth.month}
        mode={mode}
        onPrev={() => moveMonth(-1)}
        onNext={() => moveMonth(1)}
        onChangeMode={setMode}
      />
      <ThemedText size={13} color="sub" style={styles.summary}>
        {summaryLabel}
      </ThemedText>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {mode === "month" && (
          <MonthCalendar
            year={visibleMonth.year}
            month={visibleMonth.month}
            days={monthSummary.days}
            onPressDay={openDay}
          />
        )}
        {mode === "list" && <DayList days={monthSummary.days} onPressDay={openDay} />}
      </ScrollView>
      <RecordButton onPress={openCompose} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  summary: {
    paddingTop: 4,
    paddingHorizontal: 22,
    paddingBottom: 10,
  },
  scrollContent: {
    paddingBottom: 110,
  },
});
