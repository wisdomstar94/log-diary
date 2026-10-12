import { createContext, use } from "react";

import type { useSettingsManager } from "@/hooks/use-settings-manager";

export type SettingsManager = ReturnType<typeof useSettingsManager>;

export const SettingsManagerContext = createContext<SettingsManager | null>(null);

export function useSettingsManagerContext() {
  const settingsManager = use(SettingsManagerContext);
  if (settingsManager === null) {
    throw new Error("SettingsManagerContext 밖에서 호출했습니다.");
  }
  return settingsManager;
}
