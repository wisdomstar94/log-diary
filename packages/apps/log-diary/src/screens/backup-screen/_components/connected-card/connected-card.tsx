import { StyleSheet, View } from "react-native";

import { FilledButton } from "@/components/filled-button";
import { SettingsGroup } from "@/components/settings-group";
import { ThemedText } from "@/components/themed-text";

export function ConnectedCard(props: {
  email: string;
  lastBackupLabel: string;
  /** 최근 실패 사유. 실패가 없으면 null */
  failureLabel: string | null;
  onBackup: () => void;
  isBusy: boolean;
}) {
  const { email, lastBackupLabel, failureLabel, onBackup, isBusy } = props;

  return (
    <SettingsGroup>
      <View style={styles.container}>
        <ThemedText size={12} color="sub">
          연결된 계정
        </ThemedText>
        <ThemedText size={16} weight={600} style={styles.value}>
          {email}
        </ThemedText>
        <ThemedText size={12} color="sub" style={styles.secondLabel}>
          마지막 백업
        </ThemedText>
        <ThemedText font="time" size={15} style={styles.value}>
          {lastBackupLabel}
        </ThemedText>
        {failureLabel !== null && (
          <>
            <ThemedText size={12} color="sub" style={styles.secondLabel}>
              최근 백업 실패
            </ThemedText>
            <ThemedText size={15} color="danger" style={styles.value}>
              {failureLabel}
            </ThemedText>
          </>
        )}
        <FilledButton
          label={isBusy ? "처리 중…" : "지금 백업"}
          onPress={onBackup}
          isDisabled={isBusy}
          height={50}
          fontSize={15}
          style={styles.button}
        />
      </View>
    </SettingsGroup>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  value: {
    marginTop: 4,
  },
  secondLabel: {
    marginTop: 14,
  },
  button: {
    marginTop: 18,
  },
});
