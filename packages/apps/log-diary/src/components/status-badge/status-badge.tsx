import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

type Tone = "success";

export function StatusBadge(props: { label: string; tone: Tone }) {
  const { label, tone } = props;
  const theme = useTheme();
  const toneColors = {
    success: { text: theme.colors.success, bg: theme.colors.successBg },
  }[tone];

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: toneColors.bg, borderRadius: theme.radius.segment },
      ]}>
      <ThemedText size={11} weight={500} style={{ color: toneColors.text }}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
