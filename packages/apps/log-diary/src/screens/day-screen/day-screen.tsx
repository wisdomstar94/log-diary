import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { HeaderBar } from "@/components/header-bar";
import { HeaderTextButton } from "@/components/header-text-button";
import { ScreenContainer } from "@/components/screen-container";
import { ThemedText } from "@/components/themed-text";
import { useToastManagerContext } from "@/contexts/toast-manager-context";
import { deleteEntry } from "@/db/entries/delete-entry";
import { useDayEntries } from "@/hooks/use-day-entries";
import { useTheme } from "@/hooks/use-theme";
import type { Entry } from "@/types/entry";
import { parseDateKey } from "@/utils/dates/parse-date-key";
import { toDateKey } from "@/utils/dates/to-date-key";
import { getBackLabel } from "@/utils/platforms/get-back-label";

import { DayInputBar } from "./_components/day-input-bar";
import { DayTitleBlock } from "./_components/day-title-block";
import { EntryItem } from "./_components/entry-item";

export function DayScreen() {
  const params = useLocalSearchParams<{ date: string }>();
  const date = params.date;
  const router = useRouter();
  const theme = useTheme();
  const toastManager = useToastManagerContext();
  const dayEntries = useDayEntries(date);
  const [deleteTarget, setDeleteTarget] = useState<Entry | null>(null);
  const isToday = date === toDateKey(new Date());

  const isShowEmpty = (() => {
    if (dayEntries.isLoading) {
      return false;
    }
    return dayEntries.entries.length === 0;
  })();

  function goBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/");
  }

  function openCompose(entryId?: string) {
    router.push({ pathname: "/compose", params: { date, ...(entryId && { entryId }) } });
  }

  async function confirmDelete() {
    if (deleteTarget === null) {
      return;
    }
    await deleteEntry(deleteTarget.id);
    setDeleteTarget(null);
    toastManager.showToast("삭제됨", { from: "날짜 상세 — 기록 삭제" });
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <HeaderBar
          backLabel={getBackLabel(`${parseDateKey(date).getMonth() + 1}월`)}
          onBack={goBack}
          right={<HeaderTextButton label="전체 작성" onPress={() => openCompose()} weight={600} />}
        />
        <DayTitleBlock date={date} title={dayEntries.title} count={dayEntries.entries.length} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[theme.entryListPadding, { gap: theme.listGap }]}>
          {dayEntries.entries.map((entry) => (
            <EntryItem
              key={entry.id}
              entry={entry}
              onEdit={() => openCompose(entry.id)}
              onDelete={() => setDeleteTarget(entry)}
            />
          ))}
          {isShowEmpty && (
            <ThemedText size={14} color="sub" lineHeightRatio={1.6} style={styles.empty}>
              {"아직 기록이 없어요.\n아래에 바로 적어 보세요."}
            </ThemedText>
          )}
        </ScrollView>
        <DayInputBar date={date} isToday={isToday} />
      </KeyboardAvoidingView>
      <ConfirmDialog
        isVisible={deleteTarget !== null}
        title="이 기록을 삭제할까요?"
        body={deleteTarget === null ? "" : `[${deleteTarget.time}] ${deleteTarget.content}`}
        confirmLabel="삭제"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    paddingVertical: 60,
    textAlign: "center",
  },
});
