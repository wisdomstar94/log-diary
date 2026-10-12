import type { Attachment } from "@/types/entry";

import { isRecord } from "../is-record";

const STRING_KEYS = ["id", "entryId", "mimeType"];
const NULLABLE_NUMBER_KEYS = ["width", "height", "byteSize"];

export function isValidAttachment(value: unknown): value is Attachment {
  if (!isRecord(value)) {
    return false;
  }
  if (!STRING_KEYS.every((key) => typeof value[key] === "string")) {
    return false;
  }
  if (value.kind !== "image") {
    return false;
  }
  if (!NULLABLE_NUMBER_KEYS.every((key) => value[key] === null || typeof value[key] === "number")) {
    return false;
  }
  if (typeof value.sortOrder !== "number") {
    return false;
  }
  if (typeof value.createdAt !== "number") {
    return false;
  }
  if (value.remoteFileId === null) {
    return true;
  }
  return typeof value.remoteFileId === "string";
}
