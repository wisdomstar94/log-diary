import { Platform } from "react-native";

export function sampleUtil(value: string) {
  return `${Platform.OS}:${value.trim()}`;
}
