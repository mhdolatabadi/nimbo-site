import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
// import Home from './pages/Home';
import Phase0 from './pages/Phase0';
import WeekPage from './pages/WeekPage';
import RoadmapPage from './pages/RoadmapPage';
// import TalksPage from './pages/TalksPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  // Only the leading segment counts: selecting a week inside the roadmap changes the
  // path without leaving the page, and should not throw the reader back to the top.
  const page = pathname.split('/')[1] ?? '';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
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
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/roadmap/:weekSlug" element={<RoadmapPage />} />
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
