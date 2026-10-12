import { Modal, Pressable, StyleSheet, View } from "react-native";

import { HeaderTextButton } from "@/components/header-text-button";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

export function ConfirmDialog(props: {
  isVisible: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel?: string;
  /** 지우기처럼 되돌릴 수 없는 동작이면 true. 확인 버튼을 위험 색으로 칠한다 */
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const {
    isVisible,
    title,
    body,
    confirmLabel,
    cancelLabel = "취소",
    isDanger = true,
    onConfirm,
    onCancel,
  } = props;
  const theme = useTheme();

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable
          style={[
            styles.dialog,
            { borderRadius: theme.radius.dialog, backgroundColor: theme.colors.bg },
          ]}>
          <ThemedText size={17} weight={600}>
            {title}
          </ThemedText>
          <ThemedText size={14} color="sub" lineHeightRatio={1.55} style={styles.body}>
            {body}
          </ThemedText>
          <View style={styles.actions}>
            <HeaderTextButton label={cancelLabel} onPress={onCancel} color="sub" />
            <HeaderTextButton
              label={confirmLabel}
              onPress={onConfirm}
              color={isDanger ? "danger" : "ink"}
              weight={700}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "rgba(20, 20, 18, 0.36)",
  },
  dialog: {
    width: "100%",
    paddingTop: 22,
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  body: {
    marginTop: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 6,
    marginTop: 16,
  },
});
