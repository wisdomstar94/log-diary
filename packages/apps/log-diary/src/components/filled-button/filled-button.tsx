import { Pressable, StyleSheet, type ViewStyle } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

/** filled : 검정 채움 · outline : 검정 테두리 · ghost : 배경 없는 보조 버튼 */
export function FilledButton(props: {
  label: string;
  onPress: () => void;
  variant?: "filled" | "outline" | "ghost";
  height?: number;
  fontSize?: number;
  isDisabled?: boolean;
  style?: ViewStyle;
}) {
  const {
    label,
    onPress,
    variant = "filled",
    height = 54,
    fontSize = 16,
    isDisabled = false,
    style,
  } = props;
  const theme = useTheme();
  const variantStyle = {
    filled: { backgroundColor: theme.colors.ink },
    outline: { borderWidth: 1, borderColor: theme.colors.ink },
    ghost: {},
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        { height, borderRadius: theme.radius.button },
        variantStyle,
        pressed && styles.dimmed,
        isDisabled && styles.dimmed,
        style,
      ]}>
      <ThemedText
        size={fontSize}
        weight={variant === "ghost" ? 400 : 600}
        color={{ filled: "bg" as const, outline: "ink" as const, ghost: "sub" as const }[variant]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  dimmed: {
    opacity: 0.6,
  },
});
