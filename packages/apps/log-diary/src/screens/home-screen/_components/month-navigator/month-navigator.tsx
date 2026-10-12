import { Pressable, StyleSheet, View } from "react-native";

import { SegmentedControl } from "@/components/segmented-control";
import { ThemedText } from "@/components/themed-text";
import type { StartMode } from "@/types/settings";
import { padTwo } from "@/utils/dates/pad-two";

const MODE_OPTIONS: { value: StartMode; label: string }[] = [
  { value: "month", label: "월별" },
  { value: "list", label: "일별" },
];

export function MonthNavigator(props: {
  year: number;
  month: number;
  mode: StartMode;
  onPrev: () => void;
  onNext: () => void;
  onChangeMode: (mode: StartMode) => void;
}) {
  const { year, month, mode, onPrev, onNext, onChangeMode } = props;

  return (
    <View style={styles.container}>
      <View style={styles.navigator}>
        <ArrowButton label="<<" onPress={onPrev} />
        <ThemedText size={20} weight={600} style={styles.label}>
          {`${year}년 ${padTwo(month + 1)}월`}
        </ThemedText>
        <ArrowButton label=">>" onPress={onNext} />
      </View>
      <SegmentedControl options={MODE_OPTIONS} value={mode} onChange={onChangeMode} />
    </View>
  );
}

function ArrowButton(props: { label: string; onPress: () => void }) {
  const { label, onPress } = props;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.arrow, pressed && styles.pressed]}>
      <ThemedText font="mono" size={16} color="sub">
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navigator: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    minWidth: 118,
    textAlign: "center",
    letterSpacing: -0.2,
  },
  arrow: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
