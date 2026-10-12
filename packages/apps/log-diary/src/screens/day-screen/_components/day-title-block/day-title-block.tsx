import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { FONT_FAMILY } from "@/constants/font-family";
import { upsertDayTitle } from "@/db/day-titles/upsert-day-title";
import { useTheme } from "@/hooks/use-theme";
import { formatLongDate } from "@/utils/dates/format-long-date";

export function DayTitleBlock(props: { date: string; title: string; count: number }) {
  const { date, title, count } = props;
  const theme = useTheme();
  const [draft, setDraft] = useState<string | null>(null);
  const isEditing = draft !== null;
  const hasTitle = title !== "";

  async function save() {
    if (draft === null) {
      return;
    }
    await upsertDayTitle(date, draft);
    setDraft(null);
  }

  return (
    <View style={[styles.container, { borderBottomColor: theme.colors.line }]}>
      <ThemedText size={22} weight={700} style={styles.date}>
        {formatLongDate(date)}
      </ThemedText>
      {isEditing ? (
        <TextInput
          value={draft}
          onChangeText={setDraft}
          onBlur={save}
          onSubmitEditing={save}
          autoFocus
          returnKeyType="done"
          placeholder="이 날의 제목"
          placeholderTextColor={theme.colors.faint}
          style={[styles.input, { borderBottomColor: theme.colors.ink, color: theme.colors.ink }]}
        />
      ) : (
        <Pressable onPress={() => setDraft(title)} style={styles.titleRow}>
          <ThemedText size={16} color={hasTitle ? "ink" : "faint"}>
            {hasTitle ? title : "제목 없음"}
          </ThemedText>
          <View
            style={[
              styles.editChip,
              { borderColor: theme.colors.line, borderRadius: theme.radius.segment },
            ]}>
            <ThemedText size={12} color="sub">
              제목 편집
            </ThemedText>
          </View>
        </Pressable>
      )}
      {count > 0 && (
        <ThemedText size={13} color="sub">
          {`총 ${count}개의 기록`}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 6,
    paddingHorizontal: 22,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  date: {
    letterSpacing: -0.44,
  },
  input: {
    marginTop: 8,
    height: 40,
    borderBottomWidth: 1.5,
    padding: 0,
    fontFamily: FONT_FAMILY.sans[400],
    fontSize: 16,
  },
  titleRow: {
    marginTop: 8,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  editChip: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
