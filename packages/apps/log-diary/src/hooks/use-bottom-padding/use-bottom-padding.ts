import { useSafeAreaInsets } from "react-native-safe-area-context";

const MIN_BOTTOM_PADDING = 22;

/** 화면 하단 고정 영역의 아래 여백. 홈 인디케이터 · 제스처 바 높이보다 작아지지 않게 한다 */
export function useBottomPadding() {
  const insets = useSafeAreaInsets();
  return Math.max(insets.bottom, MIN_BOTTOM_PADDING);
}
