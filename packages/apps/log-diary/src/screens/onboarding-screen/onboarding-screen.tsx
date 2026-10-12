import { useRouter } from "expo-router";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useSettingsManagerContext } from "@/contexts/settings-manager-context";
import { requestNotificationPermission } from "@/utils/permissions/request-notification-permission";

import { BackupStep } from "./_components/backup-step";
import { IntroStep } from "./_components/intro-step";
import { NotificationStep } from "./_components/notification-step";

type OnboardingStep = "intro" | "notification" | "backup";

export function OnboardingScreen() {
  const router = useRouter();
  const settingsManager = useSettingsManagerContext();
  const [step, setStep] = useState<OnboardingStep>("intro");

  async function allowNotification() {
    const isGranted = await requestNotificationPermission();
    if (isGranted) {
      settingsManager.changeSetting("persistentNotification", true, {
        from: "온보딩 — 알림 허용",
      });
    }
    setStep("backup");
  }

  function finish(options: { isConnectingDrive: boolean }) {
    settingsManager.changeSetting("onboarded", true, { from: "온보딩 — 완료" });
    router.replace("/");
    if (options.isConnectingDrive) {
      router.push("/settings/backup");
    }
  }

  return (
    <ScreenContainer>
      {step === "intro" && <IntroStep onStart={() => setStep("notification")} />}
      {step === "notification" && (
        <NotificationStep onAllow={allowNotification} onLater={() => setStep("backup")} />
      )}
      {step === "backup" && (
        <BackupStep
          onConnect={() => finish({ isConnectingDrive: true })}
          onSkip={() => finish({ isConnectingDrive: false })}
        />
      )}
    </ScreenContainer>
  );
}
