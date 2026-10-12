import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { WEEKDAY_LABELS } from "@/constants/weekday-labels";
import { useTheme } from "@/hooks/use-theme";
import type { DaySummary } from "@/types/day-summary";
import { getMonthCalendarCells } from "@/utils/dates/get-month-calendar-cells";
import { toDateKey } from "@/utils/dates/to-date-key";

import { CalendarCell } from "./_components/calendar-cell";

export function MonthCalendar(props: {
  year: number;
  month: number;
  days: DaySummary[];
  onPressDay: (dateKey: string) => void;
}) {
  const { year, month, days, onPressDay } = props;
  const theme = useTheme();
  const cells = getMonthCalendarCells(year, month);
  const countByDate = new Map(days.map((day) => [day.date, day.count]));
  const todayKey = toDateKey(new Date());

  return (
    <View style={styles.container}>
      <View style={[styles.weekdays, { borderBottomColor: theme.colors.line }]}>
        {WEEKDAY_LABELS.map((label, index) => (
          <ThemedText
            key={label}
            size={12}
            weight={500}
            color={index === 0 ? "danger" : "sub"}
            style={styles.weekday}>
            {label}
          </ThemedText>
        ))}
      </View>
      <View style={styles.grid}>
        {cells.map((cell) => (
          <CalendarCell
            key={cell.dateKey}
            cell={cell}
            count={countByDate.get(cell.dateKey) ?? 0}
            isToday={cell.dateKey === todayKey}
            onPress={() => onPressDay(cell.dateKey)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  weekdays: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  weekday: {
    width: `${100 / 7}%`,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
