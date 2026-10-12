import { useEffect } from "react";

import { syncQuickWriteWidget } from "@/widgets/sync-quick-write-widget";

export function QuickWriteWidgetSync() {
  useEffect(() => {
    syncQuickWriteWidget().catch(() => {});
  }, []);
  return null;
}
