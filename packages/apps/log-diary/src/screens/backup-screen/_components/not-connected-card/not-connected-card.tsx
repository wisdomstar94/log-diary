import { StyleSheet } from "react-native";

import { FilledButton } from "@/components/filled-button";
import { SettingsGroup } from "@/components/settings-group";
import { ThemedText } from "@/components/themed-text";

export function NotConnectedCard(props: { onConnect: () => void; isBusy: boolean }) {
  const { onConnect, isBusy } = props;

  return (
    <SettingsGroup>
      <ThemedText size={17} weight={600} style={styles.title}>
        연결된 계정이 없습니다
      </ThemedText>
      <ThemedText size={14} color="sub" lineHeightRatio={1.6} style={styles.body}>
        Google 계정을 연결하면 기록을 내 드라이브의 앱 전용 폴더에 백업합니다.
      </ThemedText>
      <FilledButton
        label="Google 계정 연결"
        onPress={onConnect}
        isDisabled={isBusy}
        height={50}
        fontSize={15}
        style={styles.button}
      />
    </SettingsGroup>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  body: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 18,
    marginHorizontal: 20,
    marginBottom: 24,
  },
});
