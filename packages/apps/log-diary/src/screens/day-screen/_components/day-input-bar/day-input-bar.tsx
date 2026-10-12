import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { DriveUnlinkedWarning } from "@/components/drive-unlinked-warning";
import { FilledButton } from "@/components/filled-button";
import { ThemedText } from "@/components/themed-text";
import { FONT_FAMILY } from "@/constants/font-family";
import { useToastManagerContext } from "@/contexts/toast-manager-context";
import { insertEntry } from "@/db/entries/insert-entry";
import { useBottomPadding } from "@/hooks/use-bottom-padding";
import { useIsKeyboardVisible } from "@/hooks/use-is-keyboard-visible";
import { useNowTime } from "@/hooks/use-now-time";
import { useTheme } from "@/hooks/use-theme";
import { getNowTime } from "@/utils/dates/get-now-time";

const INPUT_BAR_GAP = 10;

export function DayInputBar(props: { date: string; isToday: boolean }) {
  const { date, isToday } = props;
  const router = useRouter();
  const theme = useTheme();
  const bottomPadding = useBottomPadding();
  const isKeyboardVisible = useIsKeyboardVisible();
  const nowTime = useNowTime();
  const toastManager = useToastManagerContext();
  const [text, setText] = useState("");

  async function save() {
    const content = text.trim();
    if (content === "") {
      return;
    }
    const time = getNowTime();
    await insertEntry({ date, time, content });
    setText("");
    toastManager.showToast(`${time} 기록됨`, { from: "날짜 상세 — 하단 입력줄" });
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: isKeyboardVisible ? INPUT_BAR_GAP : bottomPadding + INPUT_BAR_GAP,
          borderTopColor: theme.colors.line,
          backgroundColor: theme.colors.bg,
        },
      ]}>
      <DriveUnlinkedWarning onPress={() => router.push("/settings/backup")} />
      <View style={styles.row}>
        <ThemedText font="time" size={13} color="sub" style={styles.clock}>
          {nowTime}
        </ThemedText>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={save}
          submitBehavior="submit"
          returnKeyType="send"
          placeholder={isToday ? "지금 생각 바로 기록" : "이 날짜에 기록 추가"}
          placeholderTextColor={theme.colors.faint}
          style={[
            styles.input,
            {
              borderRadius: theme.radius.button,
              borderColor: theme.colors.line,
              backgroundColor: theme.colors.surface,
              color: theme.colors.ink,
            },
          ]}
        />
        <FilledButton label="저장" onPress={save} height={46} fontSize={15} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingTop: INPUT_BAR_GAP,
    paddingHorizontal: 14,
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  clock: {
    paddingLeft: 4,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 46,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontFamily: FONT_FAMILY.sans[400],
    fontSize: 15,
  },
});
