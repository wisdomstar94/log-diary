import { StyleSheet, View } from "react-native";

import { ListCard } from "@/components/list-card";
import { ThemedText } from "@/components/themed-text";
import type { DaySummary } from "@/types/day-summary";
import { formatDateWithWeekday } from "@/utils/dates/format-date-with-weekday";

export function DayListRow(props: { day: DaySummary; onPress: () => void }) {
  const { day, onPress } = props;
  const hasTitle = (day.title ?? "") !== "";

  return (
    <ListCard onPress={onPress} style={styles.card}>
      <View style={styles.firstLine}>
        <ThemedText font="time" size={14} weight={600}>
          {formatDateWithWeekday(day.date)}
        </ThemedText>
        <ThemedText size={12} color="sub" numberOfLines={1}>
          {`총 ${day.count}개의 기록`}
        </ThemedText>
      </View>
      <ThemedText size={15} weight={500} color={hasTitle ? "ink" : "sub"}>
        {hasTitle ? day.title : "제목 없음"}
      </ThemedText>
      <ThemedText size={13} color="sub" numberOfLines={1}>
        {day.lastContent}
      </ThemedText>
    </ListCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 5,
  },
  firstLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 12,
  },
});
