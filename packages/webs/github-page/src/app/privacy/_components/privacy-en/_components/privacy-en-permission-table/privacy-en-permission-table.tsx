import { DataTable } from "@/components/data-table";

export function PrivacyEnPermissionTable() {
  return (
    <DataTable
      headers={["Permission", "Purpose", "Required"]}
      rows={[
        [
          "Notifications",
          'Showing the "Quick Write" notification for writing entries from the notification shade',
          "Optional (the App works without it)",
        ],
        [
          "Background execution",
          "Automatic backup and refreshing the Quick Write notification",
          "Optional (only when those features are on)",
        ],
        ["Internet", "Google Drive backup and restore", "Optional (only when backup is used)"],
      ]}
    />
  );
}
