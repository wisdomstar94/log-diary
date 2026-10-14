import type { Metadata } from "next";
import { PrivacyEn } from "./_components/privacy-en";
import { PrivacyKo } from "./_components/privacy-ko";

export const metadata: Metadata = {
  title: "개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <article className="doc">
      <h1>로그일기 개인정보처리방침</h1>
      <ul>
        <li>
          <strong>시행일 (Effective date)</strong> : 2026-10-12
        </li>
        <li>
          <strong>앱 (App)</strong> : 로그일기 (Log Diary) — com.wisdomstar94.logdiary
        </li>
        <li>
          <strong>운영자 (Developer)</strong> : wisdomstar94
        </li>
        <li>
          <strong>문의 (Contact)</strong> :{" "}
          <a href="mailto:wisdomstar94@gmail.com">wisdomstar94@gmail.com</a>
        </li>
      </ul>
      <nav className="lang-nav">
        <a href="#ko">한국어</a>
        <a href="#en">English</a>
      </nav>
      <PrivacyKo />
      <hr />
      <PrivacyEn />
    </article>
  );
}
