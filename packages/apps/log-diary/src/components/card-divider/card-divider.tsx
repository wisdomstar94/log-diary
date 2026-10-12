import { StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";

/** 노트 테마 목록 카드 아래의 점선. 미니멀 테마는 그리지 않는다 */
export function CardDivider() {
  const theme = useTheme();
  if (theme.colors.divider === null) {
    return null;
  }

  // RN 은 한쪽 변만 점선으로 그리지 못해, 사방 점선 상자의 윗변만 1px 높이로 잘라 보여 준다.
  return (
    <View style={styles.clip}>
      <View style={[styles.dashedBox, { borderColor: theme.colors.divider }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  clip: {
    height: 1,
    overflow: "hidden",
  },
  dashedBox: {
    height: 2,
    borderWidth: 1,
    borderStyle: "dashed",
  },
});
