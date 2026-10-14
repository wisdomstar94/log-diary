import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          로그일기
        </Link>
        <nav className="site-header__nav">
          <Link href="/privacy/">개인정보처리방침</Link>
          <Link href="/support/">고객지원</Link>
        </nav>
      </div>
    </header>
  );
}
