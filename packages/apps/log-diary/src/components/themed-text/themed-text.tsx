import { Text, type TextProps } from "react-native";

import { FONT_FAMILY, type FontKind, type FontWeight } from "@/constants/font-family";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

type ColorKey = keyof Pick<
  ThemeColors,
  "ink" | "sub" | "faint" | "accent" | "danger" | "bg" | "todayInk"
>;

export type ThemedTextProps = TextProps & {
  size?: number;
  weight?: FontWeight;
  /** `time` 은 테마에 따라 mono(노트) · sans(미니멀) 로 바뀐다 */
  font?: FontKind | "time";
  color?: ColorKey;
  lineHeightRatio?: number;
};

export function ThemedText(props: ThemedTextProps) {
  const {
    size = 15,
    weight = 400,
    font = "sans",
    color = "ink",
    lineHeightRatio,
    style,
    ...rest
  } = props;
  const theme = useTheme();
  const fontKind = font === "time" ? theme.timeFont : font;

  return (
    <Text
      style={[
        {
          fontFamily: FONT_FAMILY[fontKind][weight],
          fontSize: size,
          color: theme.colors[color],
        },
        lineHeightRatio !== undefined && { lineHeight: Math.round(size * lineHeightRatio) },
        style,
      ]}
      {...rest}
    />
  );
}
