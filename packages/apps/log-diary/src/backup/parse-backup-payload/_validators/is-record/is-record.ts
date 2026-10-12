export function isRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object") {
    return false;
  }
  return value !== null;
}
