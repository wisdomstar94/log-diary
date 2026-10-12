import { ConfirmDialog } from "@/components/confirm-dialog";
import type { BackupFailureKind } from "@/types/backup-failure";

import { useBackupFailureDialog } from "./_hooks/use-backup-failure-dialog";

const FAILURE_BODIES: Record<BackupFailureKind, string> = {
  quota: "구글 드라이브 저장공간이 가득 찼어요.\n공간을 비운 뒤 다시 백업해 주세요.",
  network:
    "네트워크에 연결되어 있지 않거나 연결이 불안정해요.\n연결을 확인한 뒤 다시 백업해 주세요.",
  outdated:
    "다른 기기에서 더 새 버전의 앱으로 백업했어요.\n이 기기의 앱을 업데이트한 뒤 다시 백업해 주세요.",
  unknown: "잠시 후 다시 시도해 주세요.\n기록은 이 기기에 그대로 있어요.",
};

export function BackupFailureDialog() {
  const backupFailureDialog = useBackupFailureDialog();
  const { failureKind } = backupFailureDialog;

  return (
    <ConfirmDialog
      isVisible={backupFailureDialog.isVisible}
      title="백업하지 못했어요"
      body={failureKind === null ? "" : FAILURE_BODIES[failureKind]}
      confirmLabel="지금 바로 백업하기"
      cancelLabel="닫기"
      isDanger={false}
      onConfirm={backupFailureDialog.retryNow}
      onCancel={backupFailureDialog.close}
    />
  );
}
