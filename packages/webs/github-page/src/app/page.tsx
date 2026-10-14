import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

export default function HomePage() {
  return (
    <article className="doc">
      <h1 className="home-title">
        <Image src={logo} alt="로그일기" className="home-logo" priority />
      </h1>
      <p className="lead">
        로그일기는 떠오른 생각을 시각과 함께 바로 남기는 타임라인 일기 앱입니다. 하루의 기록이
        시간순으로 쌓이고, 월별 달력과 검색으로 지난 기록을 다시 찾아볼 수 있습니다.
      </p>
      <ul className="link-cards">
        <li>
          <Link href="/privacy/">
            <strong>개인정보처리방침</strong>
            <span>Privacy Policy</span>
          </Link>
        </li>
        <li>
          <Link href="/support/">
            <strong>고객지원</strong>
            <span>자주 묻는 질문 · 문의하기</span>
          </Link>
        </li>
      </ul>
      <h2>문의</h2>
      <ul>
        <li>
          <strong>이메일</strong> :{" "}
          <a href="mailto:wisdomstar94@gmail.com">wisdomstar94@gmail.com</a>
        </li>
      </ul>
    </article>
  );
}
