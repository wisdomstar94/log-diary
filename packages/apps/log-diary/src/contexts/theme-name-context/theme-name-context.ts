import { createContext } from "react";

import { DEFAULT_THEME_NAME, type ThemeName } from "@/constants/theme";

export const ThemeNameContext = createContext<ThemeName>(DEFAULT_THEME_NAME);
