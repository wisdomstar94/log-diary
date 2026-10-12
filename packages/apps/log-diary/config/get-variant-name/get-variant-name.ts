import type { AppVariant } from "../app-variants/index.ts";

const VARIANT_NAME_SUFFIX: Record<AppVariant, string> = {
  local: " Local",
  dev: " Dev",
  prod: "",
};

export function getVariantName(variant: AppVariant, baseName: string) {
  return `${baseName}${VARIANT_NAME_SUFFIX[variant]}`;
}
