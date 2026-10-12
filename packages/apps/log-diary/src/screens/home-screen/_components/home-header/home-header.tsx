import { APP_NAME } from "@log-diary/shared-const/app/app-name";
import { StyleSheet, View } from "react-native";
import { HeaderTextButton } from "@/components/header-text-button";
import { ThemedText } from "@/components/themed-text";

export function HomeHeader(props: { onPressSearch: () => void; onPressSettings: () => void }) {
  const { onPressSearch, onPressSettings } = props;

  return (
    <View style={styles.container}>
      <ThemedText size={18} weight={700} style={styles.title}>
        {APP_NAME}
      </ThemedText>
      <View style={styles.actions}>
        <HeaderTextButton label="검색" onPress={onPressSearch} />
        <HeaderTextButton label="설정" onPress={onPressSettings} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    paddingTop: 8,
    paddingLeft: 22,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    letterSpacing: -0.36,
  },
  actions: {
    flexDirection: "row",
    gap: 2,
  },
});
