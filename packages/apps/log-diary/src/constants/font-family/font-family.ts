import {
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
} from "@expo-google-fonts/ibm-plex-mono";
import {
  IBMPlexSansKR_400Regular,
  IBMPlexSansKR_500Medium,
  IBMPlexSansKR_600SemiBold,
  IBMPlexSansKR_700Bold,
} from "@expo-google-fonts/ibm-plex-sans-kr";

export type FontKind = "sans" | "mono";
export type FontWeight = 400 | 500 | 600 | 700;

export const FONT_ASSETS = {
  IBMPlexSansKR_400Regular,
  IBMPlexSansKR_500Medium,
  IBMPlexSansKR_600SemiBold,
  IBMPlexSansKR_700Bold,
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
};

type FontFamilyName = keyof typeof FONT_ASSETS;

// 커스텀 폰트는 Android 에서 fontWeight 로 굵기가 바뀌지 않아 굵기마다 family 를 따로 지정한다.
export const FONT_FAMILY: Record<FontKind, Record<FontWeight, FontFamilyName>> = {
  sans: {
    400: "IBMPlexSansKR_400Regular",
    500: "IBMPlexSansKR_500Medium",
    600: "IBMPlexSansKR_600SemiBold",
    700: "IBMPlexSansKR_700Bold",
  },
  mono: {
    400: "IBMPlexMono_400Regular",
    500: "IBMPlexMono_500Medium",
    600: "IBMPlexMono_600SemiBold",
    700: "IBMPlexMono_600SemiBold",
  },
};
