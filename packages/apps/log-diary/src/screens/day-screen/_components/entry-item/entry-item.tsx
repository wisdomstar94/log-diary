import { StyleSheet, View } from "react-native";

import { HeaderTextButton } from "@/components/header-text-button";
import { ListCard } from "@/components/list-card";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import type { Entry } from "@/types/entry";
import { formatTimeLabel } from "@/utils/dates/format-time-label";

export function EntryItem(props: { entry: Entry; onEdit: () => void; onDelete: () => void }) {
  const { entry, onEdit, onDelete } = props;
  const theme = useTheme();

  return (
    <ListCard>
      <View style={styles.head}>
        <ThemedText font="time" size={14} weight={600} color="accent">
          {formatTimeLabel(entry.time, theme.isBracketTime)}
        </ThemedText>
        <View style={styles.actions}>
          <SmallButton label="수정" onPress={onEdit} />
          <SmallButton label="삭제" onPress={onDelete} />
        </View>
      </View>
      <ThemedText size={16} lineHeightRatio={1.6}>
        {entry.content}
      </ThemedText>
    </ListCard>
  );
}

function SmallButton(props: { label: string; onPress: () => void }) {
  const { label, onPress } = props;

  return (
    <View style={styles.smallButton}>
      <HeaderTextButton label={label} onPress={onPress} size={13} color="sub" />
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -8,
    marginBottom: 2,
  },
  actions: {
    flexDirection: "row",
    marginRight: -10,
  },
  smallButton: {
    height: 40,
    marginHorizontal: -2,
    justifyContent: "center",
  },
});
