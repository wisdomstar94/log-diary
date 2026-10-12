// src/types/app-variant 와 같은 목록이다. tsconfig 가 나뉘어 있어 src 를 import 하지 않는다.
export const APP_VARIANTS = ["local", "dev", "prod"] as const;

export type AppVariant = (typeof APP_VARIANTS)[number];
