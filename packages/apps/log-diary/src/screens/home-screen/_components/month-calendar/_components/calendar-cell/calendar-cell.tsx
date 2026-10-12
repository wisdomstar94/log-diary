import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import type { CalendarCell as CalendarCellData } from "@/utils/dates/get-month-calendar-cells";

export function CalendarCell(props: {
  cell: CalendarCellData;
  count: number;
  isToday: boolean;
  onPress: () => void;
}) {
  const { cell, count, isToday, onPress } = props;
  const theme = useTheme();
  const countLabel = (() => {
    if (count === 0) {
      return "";
    }
    if (theme.isBracketTime) {
      return `·${count}`;
    }
    return String(count);
  })();
  const dayColor = (() => {
    if (isToday) {
      return "todayInk" as const;
    }
    if (cell.weekday === 0) {
      return "danger" as const;
    }
    return "ink" as const;
  })();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.cell,
        { opacity: cell.isCurrentMonth ? 1 : 0.35 },
        theme.colors.calRule !== null && {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.calRule,
        },
      ]}>
      <View
        style={[
          styles.dayCircle,
          {
            backgroundColor: isToday ? theme.colors.todayBg : "transparent",
            borderColor: isToday ? theme.colors.todayBorder : "transparent",
          },
        ]}>
        <ThemedText size={15} weight={isToday ? 700 : 500} color={dayColor}>
          {cell.day}
        </ThemedText>
      </View>
      <ThemedText font="time" size={11} weight={600} color="accent" style={styles.count}>
        {countLabel}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: `${100 / 7}%`,
    height: 72,
    alignItems: "center",
    paddingTop: 8,
    gap: 4,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    height: 14,
    lineHeight: 14,
  },
});
