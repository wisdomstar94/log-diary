import type { Entry } from "@/types/entry";

import { isValidEntry } from "../is-valid-entry";
import { isValidEntryLocation } from "../is-valid-entry-location";

export function isValidEntryV3(value: unknown): value is Entry {
  if (!isValidEntry(value)) {
    return false;
  }
  const { location } = value as { location?: unknown };
  if (location === null) {
    return true;
  }
  return isValidEntryLocation(location);
}
