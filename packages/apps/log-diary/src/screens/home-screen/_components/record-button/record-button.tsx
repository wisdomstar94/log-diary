import { Platform, Pressable, StyleSheet, View } from "react-native";

import { FilledButton } from "@/components/filled-button";
import { ThemedText } from "@/components/themed-text";
import { useBottomPadding } from "@/hooks/use-bottom-padding";
import { useTheme } from "@/hooks/use-theme";

/** Android 는 `+ 기록` 플로팅 버튼, iOS 는 하단 고정 `지금 기록하기` 버튼 */
export function RecordButton(props: { onPress: () => void }) {
  const { onPress } = props;
  const theme = useTheme();
  const bottomPadding = useBottomPadding();

  if (Platform.OS === "android") {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.fab,
          {
            bottom: bottomPadding + 14,
            borderRadius: theme.radius.fab,
            backgroundColor: theme.colors.ink,
          },
          pressed && styles.pressed,
        ]}>
        <ThemedText size={22} color="bg" style={styles.plus}>
          +
        </ThemedText>
        <ThemedText size={15} weight={600} color="bg">
          기록
        </ThemedText>
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.bottomBar,
        {
          paddingBottom: bottomPadding,
          backgroundColor: theme.colors.bg,
          borderTopColor: theme.colors.line,
        },
      ]}>
      <FilledButton label="지금 기록하기" onPress={onPress} height={52} />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    height: 58,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.18)",
  },
  plus: {
    lineHeight: 24,
  },
  pressed: {
    opacity: 0.8,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
});
