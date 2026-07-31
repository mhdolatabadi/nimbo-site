export default function TopBar() {
  return (
    <header className="topbar">
      <div className="wrap">
        <div className="brand">
          <svg className="nimbo-ring" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M8 12 A16 16 0 0 1 32 12" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M8 28 A16 16 0 0 0 32 28" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="20" cy="20" r="4.4" fill="none" stroke="#f5a623" strokeWidth="2.4" />
          </svg>
          <div>
            <div className="lockup">Nimbo</div>
            <div className="sub">مسیر آموزشی · فاز صفر</div>
          </div>
        </div>
        <nav className="mainnav">
          <a href="#top" className="active" aria-current="page">فاز صفر</a>
          <a href="#briefing">بریفینگ</a>
          <a href="#timeline">مأموریت‌ها</a>
        </nav>
      </div>
    </header>
  );
}
