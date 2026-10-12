import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useSettingsManagerContext } from "@/contexts/settings-manager-context";

const WARNING_TEXT = "구글 드라이브에 연동되어 있지 않아 이 기록은 추후 유실될 수 있어요.";

/** onPress 를 넘기면 누를 수 있는 경고가 되고 문구 끝에 `연결하기 ›` 가 붙는다 */
export function DriveUnlinkedWarning(props: { onPress?: () => void }) {
  const { onPress } = props;
  const { driveAccountEmail } = useSettingsManagerContext().settings;

  if (driveAccountEmail !== null) {
    return null;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={onPress === undefined}
      hitSlop={6}
      style={({ pressed }) => pressed && styles.pressed}>
      <ThemedText size={12} color="danger" lineHeightRatio={1.5}>
        {WARNING_TEXT}
        {onPress !== undefined && (
          <ThemedText size={12} weight={600} color="danger">
            {" 연결하기 ›"}
          </ThemedText>
        )}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
