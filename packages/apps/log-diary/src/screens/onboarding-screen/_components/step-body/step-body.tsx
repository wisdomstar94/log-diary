import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";

export function StepBody(props: { children: string; size?: number }) {
  const { children, size = 15 } = props;

  return (
    <ThemedText size={size} color="sub" lineHeightRatio={1.6} style={styles.body}>
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 12,
  },
});
