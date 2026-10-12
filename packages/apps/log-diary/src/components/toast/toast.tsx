import { StyleSheet, Text, View } from "react-native";

import { FONT_FAMILY } from "@/constants/font-family";
import { useTheme } from "@/hooks/use-theme";

export function Toast(props: { message: string | null }) {
  const { message } = props;
  const theme = useTheme();
  if (message === null) {
    return null;
  }

  return (
    <View pointerEvents="none" style={styles.wrapper}>
      <View style={[styles.toast, { borderRadius: theme.radius.button }]}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 120,
    alignItems: "center",
  },
  toast: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "#1a1a1a",
  },
  text: {
    fontFamily: FONT_FAMILY.sans[400],
    fontSize: 14,
    color: "#ffffff",
  },
});
