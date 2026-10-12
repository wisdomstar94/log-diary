import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

export function SettingsGroup(props: { label?: string; children: ReactNode }) {
  const { label, children } = props;
  const theme = useTheme();

  return (
    <View>
      {label !== undefined && (
        <ThemedText size={13} color="sub" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <View
        style={[
          {
            borderRadius: theme.radius.card,
            backgroundColor: theme.colors.surface,
          },
          theme.colors.cardBorder !== null && {
            borderWidth: 1,
            borderColor: theme.colors.cardBorder,
          },
        ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 6,
    paddingBottom: 8,
  },
});
