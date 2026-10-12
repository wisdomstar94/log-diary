import { use } from "react";

import { THEMES } from "@/constants/theme";
import { ThemeNameContext } from "@/contexts/theme-name-context";

export function useTheme() {
  const themeName = use(ThemeNameContext);

  return THEMES[themeName];
}
