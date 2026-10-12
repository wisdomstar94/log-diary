export type ThemeName = "note" | "minimal";

export type ThemeColors = {
  bg: string;
  surface: string;
  ink: string;
  sub: string;
  faint: string;
  line: string;
  accent: string;
  danger: string;
  success: string;
  successBg: string;
  hl: string;
  cardBg: string;
  cardBorder: string | null;
  divider: string | null;
  calRule: string | null;
  todayBg: string;
  todayInk: string;
  todayBorder: string;
};

export type ThemeTokens = {
  name: ThemeName;
  colors: ThemeColors;
  radius: { card: number; button: number; segment: number; fab: number; dialog: number };
  timeFont: "mono" | "sans";
  isBracketTime: boolean;
  card: { paddingTop: number; paddingHorizontal: number; paddingBottom: number };
  listGap: number;
  entryListPadding: { paddingTop: number; paddingHorizontal: number; paddingBottom: number };
};

// 시안의 oklch(0.55 0.13 35) · oklch(0.9 0.06 85) 를 sRGB 로 변환한 값
const NOTE_ACCENT = "#b05139";
const NOTE_HL = "#f0dcb1";

export const THEMES: Record<ThemeName, ThemeTokens> = {
  note: {
    name: "note",
    colors: {
      bg: "#f5f3ef",
      surface: "#fbfaf7",
      ink: "#1d1c1a",
      sub: "#6e6b65",
      faint: "#b3aea5",
      line: "#dcd7ce",
      accent: NOTE_ACCENT,
      danger: NOTE_ACCENT,
      success: "#4f7a3f",
      successBg: "#e2ead6",
      hl: NOTE_HL,
      cardBg: "transparent",
      cardBorder: "#dcd7ce",
      divider: "#cfc9be",
      calRule: "#e6e2da",
      todayBg: "transparent",
      todayInk: NOTE_ACCENT,
      todayBorder: NOTE_ACCENT,
    },
    radius: { card: 4, button: 6, segment: 4, fab: 8, dialog: 6 },
    timeFont: "mono",
    isBracketTime: true,
    card: { paddingTop: 16, paddingHorizontal: 6, paddingBottom: 16 },
    listGap: 0,
    entryListPadding: { paddingTop: 4, paddingHorizontal: 16, paddingBottom: 24 },
  },
  minimal: {
    name: "minimal",
    colors: {
      bg: "#ffffff",
      surface: "#f3f3f2",
      ink: "#111111",
      sub: "#7a7a78",
      faint: "#c4c4c2",
      line: "#e8e8e6",
      accent: "#111111",
      danger: "#c0392b",
      success: "#1e8a4c",
      successBg: "#e3f3e9",
      hl: "#e4e4e2",
      cardBg: "#f3f3f2",
      cardBorder: null,
      divider: null,
      calRule: null,
      todayBg: "#111111",
      todayInk: "#ffffff",
      todayBorder: "#111111",
    },
    radius: { card: 16, button: 14, segment: 11, fab: 29, dialog: 20 },
    timeFont: "sans",
    isBracketTime: false,
    card: { paddingTop: 18, paddingHorizontal: 18, paddingBottom: 16 },
    listGap: 8,
    entryListPadding: { paddingTop: 14, paddingHorizontal: 16, paddingBottom: 24 },
  },
};

export const DEFAULT_THEME_NAME: ThemeName = "note";
