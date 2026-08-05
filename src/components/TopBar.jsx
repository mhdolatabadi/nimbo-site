import { NavLink } from 'react-router-dom';
import { ROADMAP_TEXT } from '../content/bootcamp';

// نقشه‌ی راه و ارائه‌های یکشنبه فعلاً مخفی‌اند؛ برای بازگرداندن، این دو خط را از کامنت خارج کن.
const LINKS = [
  // { to: '/', label: 'نقشه‌ی راه', end: true },
  { to: '/phase-0', label: 'فاز صفر' },
  { to: '/roadmap', label: ROADMAP_TEXT.navLabel },
  // { to: '/talks', label: 'ارائه‌های یکشنبه' },
];

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="wrap">
        <NavLink to="/" className="brand">
          <svg className="nimbo-ring" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M8 12 A16 16 0 0 1 32 12" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M8 28 A16 16 0 0 0 32 28" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="20" cy="20" r="4.4" fill="none" stroke="#f5a623" strokeWidth="2.4" />
          </svg>
          <div>
            <div className="lockup">Nimbo</div>
            <div className="sub">مسیر آموزشی</div>
          </div>
        </NavLink>
        <nav className="mainnav">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
