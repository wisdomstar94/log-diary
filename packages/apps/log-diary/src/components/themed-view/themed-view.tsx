import { View, type ViewProps } from "react-native";

import { useTheme } from "@/hooks/use-theme";

export type ThemedViewProps = ViewProps & {
  background?: "bg" | "surface";
};

export function ThemedView(props: ThemedViewProps) {
  const { background = "bg", style, ...rest } = props;
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme.colors[background] }, style]} {...rest} />;
}
