import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";

export function StepTitle(props: { children: string; size?: number }) {
  const { children, size = 26 } = props;

  return (
    <ThemedText
      size={size}
      weight={700}
      lineHeightRatio={size === 26 ? 1.35 : 1.25}
      style={[styles.title, { letterSpacing: size * -0.02 }]}>
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 12,
  },
});
