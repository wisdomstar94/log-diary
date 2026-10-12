import Constants from "expo-constants";

import { APP_VARIANTS, type AppVariant } from "@/types/app-variant";

function readAppVariant(): AppVariant {
  const value = Constants.expoConfig?.extra?.appVariant;
  const variant = APP_VARIANTS.find((item) => item === value);
  if (variant === undefined) {
    throw new Error(
      `extra.appVariant 가 올바르지 않습니다. (받은 값 : ${String(value)}) app.config.ts 를 거쳐 APP_VARIANT 를 지정해 실행했는지 확인해 주세요.`,
    );
  }
  return variant;
}

export const APP_VARIANT = readAppVariant();
