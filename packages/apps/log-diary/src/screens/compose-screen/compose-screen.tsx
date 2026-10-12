import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DriveUnlinkedWarning } from "@/components/drive-unlinked-warning";
import { ThemedText } from "@/components/themed-text";
import { Toast } from "@/components/toast";
import { FONT_FAMILY } from "@/constants/font-family";
import { useToastManagerContext } from "@/contexts/toast-manager-context";
import { insertEntry } from "@/db/entries/insert-entry";
import { updateEntry } from "@/db/entries/update-entry";
import { useBottomPadding } from "@/hooks/use-bottom-padding";
import { useIsKeyboardVisible } from "@/hooks/use-is-keyboard-visible";
import { useTheme } from "@/hooks/use-theme";
import { useToastManager } from "@/hooks/use-toast-manager";
import { formatLongDate } from "@/utils/dates/format-long-date";
import { toDateKey } from "@/utils/dates/to-date-key";

import { ComposeHeader } from "./_components/compose-header";
import { TimeField } from "./_components/time-field";
import { useComposeForm } from "./_hooks/use-compose-form";

const FOOTER_KEYBOARD_GAP = 10;

export function ComposeScreen() {
  const params = useLocalSearchParams<{ date?: string; entryId?: string; quick?: string }>();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const bottomPadding = useBottomPadding();
  const isKeyboardVisible = useIsKeyboardVisible();
  const globalToastManager = useToastManagerContext();
  // iOS 모달은 루트 토스트를 가리므로 모달 안에서 띄울 토스트를 따로 둔다.
  const localToastManager = useToastManager();
  const date = params.date ?? toDateKey(new Date());
  const entryId = params.entryId;
  const composeForm = useComposeForm(entryId);
  const windowDimensions = useWindowDimensions();
  // iOS 시트 모달은 위쪽이 비어 있어, 그 높이만큼 키보드 회피 계산을 보정한다.
  const [sheetTopGap, setSheetTopGap] = useState(0);
  const title = (() => {
    if (entryId !== undefined) {
      return "기록 수정";
    }
    if (params.quick === "1") {
      return "빠른 기록";
    }
    return "새 기록";
  })();

  function close() {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/");
  }

  async function save() {
    const content = composeForm.text.trim();
    if (content === "") {
      localToastManager.showToast("내용을 입력해 주세요", { from: "작성 화면 저장 — 빈 내용" });
      return;
    }
    if (entryId !== undefined) {
      await updateEntry({ id: entryId, time: composeForm.time, content });
      globalToastManager.showToast("수정됨", { from: "작성 화면 저장 — 수정" });
    } else {
      await insertEntry({ date, time: composeForm.time, content });
      globalToastManager.showToast(`${composeForm.time} 기록됨`, {
        from: "작성 화면 저장 — 새 기록",
      });
    }
    close();
  }

  return (
    <View
      onLayout={(event) =>
        setSheetTopGap(windowDimensions.height - event.nativeEvent.layout.height)
      }
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.bg,
          paddingTop: Platform.OS === "ios" ? 0 : insets.top,
        },
      ]}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? sheetTopGap : 0}
        style={styles.container}>
        <ComposeHeader title={title} onCancel={close} onSave={save} />
        <View style={styles.meta}>
          <ThemedText size={14} color="sub">
            {formatLongDate(date)}
          </ThemedText>
          <TimeField
            time={composeForm.time}
            onChange={(time) => composeForm.changeTime(time, { from: "시각 선택" })}
          />
        </View>
        <TextInput
          value={composeForm.text}
          onChangeText={(text) => composeForm.changeText(text, { from: "본문 입력" })}
          autoFocus
          multiline
          placeholder="지금 무슨 일이 있었나요?"
          placeholderTextColor={theme.colors.faint}
          textAlignVertical="top"
          style={[styles.input, { color: theme.colors.ink }]}
        />
        <View
          style={[
            styles.footer,
            {
              paddingBottom: isKeyboardVisible ? FOOTER_KEYBOARD_GAP : bottomPadding,
              borderTopColor: theme.colors.line,
            },
          ]}>
          <DriveUnlinkedWarning />
          <ThemedText size={12} color="sub">
            시각은 작성 시점으로 자동 입력됩니다. 필요하면 위에서 바꿀 수 있어요.
          </ThemedText>
        </View>
      </KeyboardAvoidingView>
      <Toast message={localToastManager.message} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingHorizontal: 22,
    paddingBottom: 6,
  },
  input: {
    flex: 1,
    marginHorizontal: 22,
    paddingVertical: 8,
    fontFamily: FONT_FAMILY.sans[400],
    fontSize: 18,
    lineHeight: 31,
  },
  footer: {
    gap: 6,
    paddingTop: 10,
    paddingHorizontal: 22,
    borderTopWidth: 1,
  },
});
