import type { Metadata } from "next";
import Link from "next/link";
import { SupportFaq } from "./_components/support-faq";

export const metadata: Metadata = {
  title: "고객지원",
};

export default function SupportPage() {
  return (
    <article className="doc">
      <h1>로그일기 고객지원</h1>

      <h2>로그일기 소개</h2>
      <p>
        로그일기는 떠오른 생각을 시각과 함께 바로 남기는 타임라인 일기 앱입니다. 하루의 기록이
        시간순으로 쌓이고, 월별 달력과 검색으로 지난 기록을 다시 찾아볼 수 있습니다.
      </p>

      <h2>문의하기</h2>
      <p>사용 중 불편한 점, 오류, 제안이 있으면 아래 이메일로 연락해 주세요.</p>
      <ul>
        <li>
          <strong>이메일</strong> :{" "}
          <a href="mailto:wisdomstar94@gmail.com">wisdomstar94@gmail.com</a>
        </li>
      </ul>
      <p>오류를 알려 주실 때 아래 정보를 함께 적어 주시면 더 빠르게 확인할 수 있습니다.</p>
      <ul>
        <li>사용 중인 기기 (예: iPhone 16 Pro, iPad Pro 13)</li>
        <li>OS 버전 (예: iOS 18.5)</li>
        <li>앱 버전 (앱 설정 화면 맨 아래에서 확인)</li>
        <li>어떤 화면에서 무엇을 했을 때 문제가 생겼는지</li>
        <li>가능하면 화면 캡처</li>
      </ul>

      <h2>자주 묻는 질문</h2>
      <SupportFaq />

      <h2>개인정보 처리 요약</h2>
      <ul>
        <li>로그일기는 회원가입이 없고, 개발자가 운영하는 서버로 기록을 전송하지 않습니다.</li>
        <li>분석·광고 도구를 사용하지 않습니다.</li>
        <li>
          Google 계정 연결은 백업을 위해서만 쓰이며, Google 드라이브의 앱 전용 폴더(drive.appdata
          권한)에만 접근합니다.
        </li>
        <li>Google 계정 연결은 설정에서 언제든 해제할 수 있습니다.</li>
      </ul>
      <p>
        자세한 내용은 <Link href="/privacy/">개인정보처리방침</Link>을 확인해 주세요.
      </p>
    </article>
  );
}
