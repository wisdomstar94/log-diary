import type { ReactNode } from "react";
import { View, type ViewStyle } from "react-native";

import { useTheme } from "@/hooks/use-theme";

export function StepCard(props: { children: ReactNode; style?: ViewStyle }) {
  const { children, style } = props;
  const theme = useTheme();

  return (
    <View
      style={[
        { borderRadius: theme.radius.card, backgroundColor: theme.colors.surface },
        theme.colors.cardBorder !== null && {
          borderWidth: 1,
          borderColor: theme.colors.cardBorder,
        },
        style,
      ]}>
      {children}
    </View>
  );
}
