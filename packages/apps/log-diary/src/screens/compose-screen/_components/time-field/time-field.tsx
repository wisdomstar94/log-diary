import { DateTimePicker } from "@expo/ui/community/datetime-picker";
import { useState } from "react";
import { Platform, Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { getNowTime } from "@/utils/dates/get-now-time";

import { IosTimeSheet } from "./_components/ios-time-sheet";

function toDate(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
}

export function TimeField(props: { time: string; onChange: (time: string) => void }) {
  const { time, onChange } = props;
  const theme = useTheme();
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const isShowAndroidPicker = (() => {
    if (!isPickerOpen) {
      return false;
    }
    return Platform.OS === "android";
  })();

  function select(date: Date) {
    onChange(getNowTime(date));
    setIsPickerOpen(false);
  }

  return (
    <>
      <Pressable
        onPress={() => setIsPickerOpen(true)}
        style={[
          styles.field,
          {
            borderColor: theme.colors.line,
            borderRadius: theme.radius.segment,
            backgroundColor: theme.colors.surface,
          },
        ]}>
        <ThemedText font="time" size={15} weight={600} color="accent">
          {time}
        </ThemedText>
      </Pressable>
      {isShowAndroidPicker && (
        <DateTimePicker
          value={toDate(time)}
          mode="time"
          is24Hour
          onValueChange={(_, date) => select(date)}
          onDismiss={() => setIsPickerOpen(false)}
        />
      )}
      {Platform.OS === "ios" && (
        <IosTimeSheet
          isVisible={isPickerOpen}
          initialDate={toDate(time)}
          onDone={select}
          onCancel={() => setIsPickerOpen(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    height: 36,
    paddingHorizontal: 8,
    borderWidth: 1,
    justifyContent: "center",
  },
});
