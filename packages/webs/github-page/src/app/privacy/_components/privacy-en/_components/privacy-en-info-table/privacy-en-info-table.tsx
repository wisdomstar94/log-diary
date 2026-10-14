import { DataTable } from "@/components/data-table";

export function PrivacyEnInfoTable() {
  return (
    <DataTable
      headers={["Type", "Data", "Purpose", "Where it is stored"]}
      rows={[
        [
          "Required (using the App)",
          "Diary text · entry date · entry time · day title",
          "Writing, viewing, and searching entries",
          "Your device's local storage",
        ],
        [
          "Required (using the App)",
          "App settings (theme · start screen · notifications · backup)",
          "Keeping your preferences",
          "Your device's local storage",
        ],
        [
          "Optional (Drive backup)",
          "Google account email address",
          "Showing the connected account in Settings",
          "Your device's local storage",
        ],
        [
          "Optional (Drive backup)",
          "Backup file of your diary data",
          "Restoring after reinstalling or changing devices",
          "The hidden app-data folder in your own Google Drive",
        ],
      ]}
    />
  );
}
