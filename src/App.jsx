import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
// import Home from './pages/Home';
import Phase0 from './pages/Phase0';
import WeekPage from './pages/WeekPage';
// import TalksPage from './pages/TalksPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <TopBar />
      <Routes>
        {/* نقشه‌ی راه و ارائه‌های یکشنبه فعلاً مخفی‌اند؛ برای بازگرداندن، این دو route را جای redirectها بگذار */}
        <Route path="/" element={<Navigate to="/phase-0" replace />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/phase-0" element={<Phase0 />} />
        <Route path="/week/:n" element={<WeekPage />} />
        <Route path="/talks" element={<Navigate to="/phase-0" replace />} />
        {/* <Route path="/talks" element={<TalksPage />} /> */}
        <Route path="*" element={<Navigate to="/phase-0" replace />} />
      </Routes>
      <div className="divider" />
      <Footer />
    </>
  );
}
