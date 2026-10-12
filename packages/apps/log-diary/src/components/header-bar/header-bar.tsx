import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { HeaderTextButton } from "@/components/header-text-button";
import { ThemedText } from "@/components/themed-text";

export function HeaderBar(props: {
  backLabel: string;
  onBack: () => void;
  title?: string;
  right?: ReactNode;
}) {
  const { backLabel, onBack, title, right } = props;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <HeaderTextButton label={backLabel} onPress={onBack} size={16} />
        {title !== undefined && (
          <ThemedText size={17} weight={600}>
            {title}
          </ThemedText>
        )}
      </View>
      {right}
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
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
});
