import { StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";

/** 표시 전용. 누르는 영역은 감싸는 행이 맡는다 */
export function ToggleSwitch(props: { isOn: boolean }) {
  const { isOn } = props;
  const theme = useTheme();

  return (
    <View style={[styles.track, { backgroundColor: isOn ? theme.colors.ink : theme.colors.faint }]}>
      <View style={[styles.knob, { left: isOn ? 22 : 2 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 46,
    height: 26,
    borderRadius: 13,
  },
  knob: {
    position: "absolute",
    top: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  },
});
