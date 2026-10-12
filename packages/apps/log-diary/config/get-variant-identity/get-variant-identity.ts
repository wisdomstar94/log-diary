import type { AppVariant } from "../app-variants/index.ts";

const VARIANT_SUFFIX: Record<AppVariant, { name: string; identifier: string }> = {
  local: { name: " Local", identifier: ".local" },
  dev: { name: " Dev", identifier: ".dev" },
  prod: { name: "", identifier: "" },
};

export function getVariantIdentity(
  variant: AppVariant,
  base: { name: string; bundleIdentifier: string; androidPackage: string },
) {
  const suffix = VARIANT_SUFFIX[variant];
  return {
    name: `${base.name}${suffix.name}`,
    bundleIdentifier: `${base.bundleIdentifier}${suffix.identifier}`,
    androidPackage: `${base.androidPackage}${suffix.identifier}`,
  };
}
