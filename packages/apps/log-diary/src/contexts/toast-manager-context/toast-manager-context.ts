import { createContext, use } from "react";

import type { useToastManager } from "@/hooks/use-toast-manager";

export type ToastManager = ReturnType<typeof useToastManager>;

export const ToastManagerContext = createContext<ToastManager | null>(null);

export function useToastManagerContext() {
  const toastManager = use(ToastManagerContext);
  if (toastManager === null) {
    throw new Error("ToastManagerContext 밖에서 호출했습니다.");
  }
  return toastManager;
}
