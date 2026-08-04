import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import phase0Raw from '../content/phase0.md?raw';
import { parsePhaseMarkdown } from '../lib/markdown';
import { CONFIG, PREVIEW_MODE } from '../config';
import { usePhaseTimeline } from '../hooks/usePhaseTimeline';
import { phase0Status } from '../content/schedule';
import Hero from '../components/Hero';
import Briefing from '../components/Briefing';
import Timeline from '../components/Timeline';

export default function Phase0() {
  const missions = useMemo(() => parsePhaseMarkdown(phase0Raw), []);
  const phase = usePhaseTimeline(missions, CONFIG, PREVIEW_MODE);
  const status = phase0Status(PREVIEW_MODE);

  return (
    <>
      <Hero openCount={phase.openCount} total={phase.total} countdownLabel={phase.countdownLabel} />
      {status === 'completed' && (
        <div className="wrap" style={{ marginTop: -34, marginBottom: 34, position: 'relative', zIndex: 1 }}>
          <div className="callout">
            <span className="ic">✓</span>
            <span>
              فاز صفر تمام شده. برنامه‌ی اصلی از اینجا شروع می‌شود: <Link to="/">نقشه‌ی راهِ ۹ هفته</Link>
            </span>
          </div>
        </div>
      )}
      <div className="divider" />
      <Briefing />
      <div className="divider" />
      <Timeline phase={phase} />
    </>
  );
}
