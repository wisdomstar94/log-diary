import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

// iOS 는 KeyboardAvoidingView 가 Will 이벤트로 움직이므로 같은 시점에 맞춘다. 안드로이드는 Did 이벤트만 온다.
const SHOW_EVENT = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
const HIDE_EVENT = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

export function useIsKeyboardVisible() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(() => Keyboard.isVisible());

  useEffect(() => {
    const showSubscription = Keyboard.addListener(SHOW_EVENT, () => setIsKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener(HIDE_EVENT, () => setIsKeyboardVisible(false));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardVisible;
}
