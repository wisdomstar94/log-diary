export const APP_VARIANTS = ["local", "dev", "prod"] as const;

export type AppVariant = (typeof APP_VARIANTS)[number];
