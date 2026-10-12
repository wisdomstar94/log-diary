import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

export type SegmentOption<T extends string> = { value: T; label: string };

export function SegmentedControl<T extends string>(props: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "md" | "sm";
  background?: "surface" | "bg";
}) {
  const { options, value, onChange, size = "md", background = "surface" } = props;
  const theme = useTheme();
  const isSmall = size === "sm";
  const hasBorder = (() => {
    if (background !== "surface") {
      return false;
    }
    return theme.colors.cardBorder !== null;
  })();

  return (
    <View
      style={[
        styles.container,
        { borderRadius: theme.radius.button, backgroundColor: theme.colors[background] },
        hasBorder && { borderWidth: 1, borderColor: theme.colors.cardBorder ?? undefined },
      ]}>
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.item,
              {
                height: isSmall ? 32 : 34,
                paddingHorizontal: isSmall ? 12 : 14,
                borderRadius: theme.radius.segment,
                backgroundColor: isSelected ? theme.colors.ink : "transparent",
              },
            ]}>
            <ThemedText size={13} weight={600} color={isSelected ? "bg" : "sub"}>
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 3,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
});
