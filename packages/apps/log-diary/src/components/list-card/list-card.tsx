import type { ReactNode } from "react";
import { Pressable, StyleSheet, View, type ViewStyle } from "react-native";

import { CardDivider } from "@/components/card-divider";
import { useTheme } from "@/hooks/use-theme";

/** 노트 테마는 투명 배경 + 점선 구분선, 미니멀 테마는 회색 카드 */
export function ListCard(props: { children: ReactNode; onPress?: () => void; style?: ViewStyle }) {
  const { children, onPress, style } = props;
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={onPress === undefined}
      style={({ pressed }) => [
        {
          borderRadius: theme.radius.card,
          backgroundColor: theme.colors.cardBg,
        },
        pressed && styles.pressed,
      ]}>
      <View style={[theme.card, style]}>{children}</View>
      <CardDivider />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.6,
  },
});
