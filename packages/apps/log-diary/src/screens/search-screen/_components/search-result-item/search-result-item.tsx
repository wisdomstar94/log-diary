import { StyleSheet, Text, View } from "react-native";

import { ListCard } from "@/components/list-card";
import { ThemedText } from "@/components/themed-text";
import { FONT_FAMILY } from "@/constants/font-family";
import { useTheme } from "@/hooks/use-theme";
import type { Entry } from "@/types/entry";
import { formatShortDate } from "@/utils/dates/format-short-date";
import { splitByMatch } from "@/utils/strings/split-by-match";

export function SearchResultItem(props: { entry: Entry; query: string; onPress: () => void }) {
  const { entry, query, onPress } = props;
  const theme = useTheme();
  const parts = splitByMatch(entry.content, query);

  return (
    <ListCard onPress={onPress}>
      <View style={styles.meta}>
        <ThemedText font="time" size={13} color="sub">
          {formatShortDate(entry.date)}
        </ThemedText>
        <ThemedText font="time" size={13} weight={600} color="accent">
          {entry.time}
        </ThemedText>
      </View>
      <ThemedText size={15} lineHeightRatio={1.6} style={styles.content}>
        {parts.pre}
        <Text
          style={{
            fontFamily: FONT_FAMILY.sans[600],
            backgroundColor: theme.colors.hl,
          }}>
          {parts.hit}
        </Text>
        {parts.post}
      </ThemedText>
    </ListCard>
  );
}

const styles = StyleSheet.create({
  meta: {
    flexDirection: "row",
    gap: 8,
  },
  content: {
    marginTop: 4,
  },
});
