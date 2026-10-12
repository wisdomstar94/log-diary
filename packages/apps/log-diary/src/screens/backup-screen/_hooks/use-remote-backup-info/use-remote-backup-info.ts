import { useEffect, useEffectEvent, useState } from "react";

import { findBackupFile } from "@/drive/find-backup-file";
import type { RemoteBackupInfo } from "@/types/backup-payload";

/** 연결된 계정의 Drive 백업 정보. 새 기기에서도 마지막 백업 시각을 보여 주기 위해 쓴다 */
export function useRemoteBackupInfo(accountEmail: string | null) {
  const [info, setInfo] = useState<RemoteBackupInfo | null>(null);

  async function refresh() {
    try {
      setInfo(await findBackupFile());
    } catch {
      // 조회에 실패하면 기기에 저장된 마지막 백업 시각을 대신 보여 준다.
    }
  }

  const refreshOnConnect = useEffectEvent(() => {
    refresh();
  });

  useEffect(() => {
    if (accountEmail === null) {
      return;
    }
    refreshOnConnect();
  }, [accountEmail]);

  return { info: accountEmail === null ? null : info, refresh };
}
