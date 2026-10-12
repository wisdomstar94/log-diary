import { SegmentedControl } from "@/components/segmented-control";
import { SettingsGroup } from "@/components/settings-group";
import { SettingsRow } from "@/components/settings-row";
import type { ThemeName } from "@/constants/theme";
import { useSettingsManagerContext } from "@/contexts/settings-manager-context";
import type { StartMode } from "@/types/settings";

const START_MODE_OPTIONS: { value: StartMode; label: string }[] = [
  { value: "month", label: "월별" },
  { value: "list", label: "일별" },
];

const THEME_OPTIONS: { value: ThemeName; label: string }[] = [
  { value: "note", label: "노트" },
  { value: "minimal", label: "미니멀" },
];

export function ViewSettingsGroup() {
  const settingsManager = useSettingsManagerContext();
  const { settings } = settingsManager;

  return (
    <SettingsGroup label="보기">
      <SettingsRow
        title="시작 화면"
        accessory={{
          type: "custom",
          node: (
            <SegmentedControl
              options={START_MODE_OPTIONS}
              value={settings.startMode}
              onChange={(value) =>
                settingsManager.changeSetting("startMode", value, { from: "설정 — 시작 화면" })
              }
              size="sm"
              background="bg"
            />
          ),
        }}
      />
      <SettingsRow
        title="테마"
        hasTopBorder
        accessory={{
          type: "custom",
          node: (
            <SegmentedControl
              options={THEME_OPTIONS}
              value={settings.theme}
              onChange={(value) =>
                settingsManager.changeSetting("theme", value, { from: "설정 — 테마" })
              }
              size="sm"
              background="bg"
            />
          ),
        }}
      />
    </SettingsGroup>
  );
}
