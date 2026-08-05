import { ROADMAP_TEXT } from '../content/bootcamp';
import Roadmap from '../components/Roadmap';

export default function RoadmapPage() {
  const hero = ROADMAP_TEXT.hero;

  return (
    <>
      <section className="hero" id="top" style={{ padding: '84px 0 54px' }}>
        <svg className="bigring" viewBox="0 0 400 400" aria-hidden="true">
          <path d="M60 120 A160 160 0 0 1 340 120" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="2" strokeLinecap="round" />
          <path d="M60 280 A160 160 0 0 0 340 280" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(245,166,35,.12)" strokeWidth="1" strokeDasharray="2 10" />
        </svg>
        <div className="wrap inner">
          <span className="eyebrow">
            <span className="dot" /> {hero.eyebrow} · <span className="mono">{hero.eyebrowMono}</span>
          </span>
          <div className="phase-num mono">{hero.code}</div>
          <h1 className="display" style={{ fontSize: 'clamp(2.6rem,7vw,5rem)' }}>
            {hero.title} <b>{hero.titleAccent}</b>
          </h1>
          <p className="tagline">{hero.tagline}</p>
        </div>
      </section>

      <div className="divider" />

      <Roadmap />
    </>
  );
}
