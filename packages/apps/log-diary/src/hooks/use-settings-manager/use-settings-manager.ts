import { useEffect, useState } from "react";

import { DEFAULT_SETTINGS } from "@/constants/default-settings";
import { getSettings } from "@/db/settings/get-settings";
import { updateSetting } from "@/db/settings/update-setting";
import type { Settings } from "@/types/settings";

export function useSettingsManager() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .finally(() => setIsLoaded(true));
  }, []);

  // setSettings 는 이 함수에서만 호출한다.
  function changeSetting<K extends keyof Settings>(
    key: K,
    value: Settings[K],
    options?: { from: string },
  ) {
    if (__DEV__) {
      console.log("changeSetting", key, "from", options?.from);
    }
    setSettings((prev) => ({ ...prev, [key]: value }));
    updateSetting(key, value);
  }

  return { settings, isLoaded, changeSetting };
}
