import { DateTimePicker } from "@expo/ui/community/datetime-picker";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { HeaderTextButton } from "@/components/header-text-button";
import { useBottomPadding } from "@/hooks/use-bottom-padding";
import { useTheme } from "@/hooks/use-theme";

export function IosTimeSheet(props: {
  isVisible: boolean;
  initialDate: Date;
  onDone: (date: Date) => void;
  onCancel: () => void;
}) {
  const { isVisible, initialDate, onDone, onCancel } = props;
  const theme = useTheme();
  const bottomPadding = useBottomPadding();
  const [draft, setDraft] = useState<Date | null>(null);

  function close() {
    setDraft(null);
    onCancel();
  }

  function done() {
    onDone(draft ?? initialDate);
    setDraft(null);
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={close}>
      <Pressable style={styles.overlay} onPress={close} />
      <View
        style={[styles.sheet, { backgroundColor: theme.colors.bg, paddingBottom: bottomPadding }]}>
        <View style={[styles.actions, { borderBottomColor: theme.colors.line }]}>
          <HeaderTextButton label="취소" onPress={close} color="sub" />
          <HeaderTextButton label="완료" onPress={done} weight={700} />
        </View>
        <DateTimePicker
          value={draft ?? initialDate}
          mode="time"
          display="spinner"
          locale="ko_KR"
          onValueChange={(_, date) => setDraft(date)}
          style={styles.picker}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(20, 20, 18, 0.36)",
  },
  sheet: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  picker: {
    height: 216,
  },
});
