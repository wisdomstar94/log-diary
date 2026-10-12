import { Pressable, StyleSheet } from "react-native";

import { ThemedText, type ThemedTextProps } from "@/components/themed-text";

export function HeaderTextButton(props: {
  label: string;
  onPress: () => void;
  size?: number;
  weight?: ThemedTextProps["weight"];
  color?: ThemedTextProps["color"];
}) {
  const { label, onPress, size = 15, weight = 400, color = "ink" } = props;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <ThemedText size={size} weight={weight} color={color}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
