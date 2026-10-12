import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { FilledButton } from "@/components/filled-button";
import { ThemedText } from "@/components/themed-text";
import { useBottomPadding } from "@/hooks/use-bottom-padding";

/** 온보딩 단계 공통 틀 : 상단 작은 라벨 · 본문 · 하단 주 버튼(+ 보조 버튼) */
export function StepLayout(props: {
  label: string;
  children: ReactNode;
  footerTop?: ReactNode;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}) {
  const { label, children, footerTop, primaryLabel, onPrimary, secondaryLabel, onSecondary } =
    props;
  const bottomPadding = useBottomPadding();

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding + 6 }]}>
      <ThemedText font="mono" size={13} color="sub" style={styles.label}>
        {label}
      </ThemedText>
      {children}
      <View style={styles.spacer} />
      {footerTop}
      <FilledButton label={primaryLabel} onPress={onPrimary} />
      {secondaryLabel !== undefined && onSecondary !== undefined && (
        <FilledButton
          label={secondaryLabel}
          onPress={onSecondary}
          variant="ghost"
          height={48}
          fontSize={15}
          style={styles.secondary}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 28,
  },
  label: {
    letterSpacing: 0.52,
  },
  spacer: {
    flex: 1,
  },
  secondary: {
    marginTop: 6,
  },
});
