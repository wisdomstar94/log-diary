import type { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ToggleSwitch } from "@/components/toggle-switch";
import { useTheme } from "@/hooks/use-theme";

type Accessory =
  | { type: "chevron" }
  | { type: "toggle"; isOn: boolean }
  | { type: "custom"; node: ReactNode };

export function SettingsRow(props: {
  title: string;
  titleAccessory?: ReactNode;
  description?: string;
  accessory?: Accessory;
  onPress?: () => void;
  hasTopBorder?: boolean;
  isDanger?: boolean;
  isDescriptionDanger?: boolean;
}) {
  const {
    title,
    titleAccessory,
    description,
    accessory,
    onPress,
    hasTopBorder = false,
    isDanger = false,
    isDescriptionDanger = false,
  } = props;
  const theme = useTheme();
  const isCustom = accessory?.type === "custom";

  return (
    <Pressable
      onPress={onPress}
      disabled={onPress === undefined}
      style={({ pressed }) => [
        styles.row,
        { paddingVertical: isCustom ? 10 : 14 },
        hasTopBorder && { borderTopWidth: 1, borderTopColor: theme.colors.line },
        pressed && styles.pressed,
      ]}>
      <View style={styles.texts}>
        <View style={styles.titleLine}>
          <ThemedText size={15} color={isDanger ? "danger" : "ink"}>
            {title}
          </ThemedText>
          {titleAccessory}
        </View>
        {description !== undefined && (
          <ThemedText
            size={12}
            color={isDescriptionDanger ? "danger" : "sub"}
            style={styles.description}>
            {description}
          </ThemedText>
        )}
      </View>
      {accessory?.type === "chevron" && <ThemedText color="sub">›</ThemedText>}
      {accessory?.type === "toggle" && <ToggleSwitch isOn={accessory.isOn} />}
      {accessory?.type === "custom" && accessory.node}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 16,
  },
  texts: {
    flexShrink: 1,
  },
  titleLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  description: {
    marginTop: 2,
  },
  pressed: {
    opacity: 0.6,
  },
});
