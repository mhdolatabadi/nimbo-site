import { useMemo } from 'react';
import phase0Raw from './content/phase0.md?raw';
import { parsePhaseMarkdown } from './lib/markdown';
import { CONFIG, PREVIEW_MODE } from './config';
import { usePhaseTimeline } from './hooks/usePhaseTimeline';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Briefing from './components/Briefing';
import Timeline from './components/Timeline';
import Footer from './components/Footer';

export default function App() {
  const missions = useMemo(() => parsePhaseMarkdown(phase0Raw), []);
  const phase = usePhaseTimeline(missions, CONFIG, PREVIEW_MODE);

  return (
    <>
      <TopBar />
      <Hero openCount={phase.openCount} total={phase.total} countdownLabel={phase.countdownLabel} />
      <div className="divider" />
      <Briefing />
      <div className="divider" />
      <Timeline phase={phase} />
      <div className="divider" />
      <Footer />
    </>
  );
}
