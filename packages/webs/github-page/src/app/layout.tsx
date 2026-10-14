import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "로그일기",
    template: "%s | 로그일기",
  },
  description: "떠오른 생각을 시각과 함께 바로 남기는 타임라인 일기 앱",
};

export const viewport: Viewport = {
  themeColor: "#f5f3ef",
};

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        <main className="page">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
