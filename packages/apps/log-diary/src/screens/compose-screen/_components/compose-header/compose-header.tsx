import { StyleSheet, View } from "react-native";

import { HeaderTextButton } from "@/components/header-text-button";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

export function ComposeHeader(props: { title: string; onCancel: () => void; onSave: () => void }) {
  const { title, onCancel, onSave } = props;
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: theme.colors.line }]}>
      <HeaderTextButton label="취소" onPress={onCancel} size={16} color="sub" />
      <ThemedText size={16} weight={600}>
        {title}
      </ThemedText>
      <HeaderTextButton label="저장" onPress={onSave} size={16} weight={700} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    paddingTop: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
});
