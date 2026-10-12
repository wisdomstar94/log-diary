import type { Settings } from "@/types/settings";

export const DEFAULT_SETTINGS: Settings = {
  onboarded: false,
  persistentNotification: false,
  startMode: "month",
  theme: "note",
  autoBackup: true,
  lastBackupAt: null,
  driveAccountEmail: null,
  isBackupImportPending: false,
  backupOnChange: true,
  hasUnsyncedChanges: false,
  lastBackupFailure: null,
};
