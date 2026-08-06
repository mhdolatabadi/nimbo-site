import { Navigate, useParams } from 'react-router-dom';
import { PHASES, PROJECT, ROADMAP_KEY, ROADMAP_TEXT } from '../content/bootcamp';
import Roadmap from '../components/Roadmap';

function PhaseCard({ phase }) {
  return (
    <article className={`ph-card phase-${phase.id}`}>
      <div className="ph-head">
        <span className="ph-code mono">{phase.code}</span>
        <span className="ph-weeks">{phase.weeks}</span>
      </div>
      <h3 className="ph-title">{phase.label}</h3>
      <p className="ph-req">{phase.requirement}</p>
      <div className="ph-analyses">
        <span className="ph-analyses-title">{phase.analysesTitle}</span>
        <ul>
          {phase.analyses.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        {phase.note && <small>{phase.note}</small>}
      </div>
    </article>
  );
}

export default function RoadmapPage() {
  const { key } = useParams();
  const hero = ROADMAP_TEXT.hero;

  // Wrong key, or the bare old /roadmap address: there is nothing here.
  if (key !== ROADMAP_KEY) return <Navigate to="/phase-0" replace />;

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

      <section className="block" id="brief">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-kicker">{PROJECT.kicker}</span>
            <h2 className="sec-title">{PROJECT.title}</h2>
          </div>
          <div className="brief">
            <p className="brief-intro">{PROJECT.intro}</p>
            <p className="brief-goal">{PROJECT.goal}</p>
          </div>
          <div className="brief-rules">
            <span className="brief-rules-title">{PROJECT.rulesTitle}</span>
            <ul>
              {PROJECT.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="ph-grid">
            {Object.values(PHASES).map((phase) => (
              <PhaseCard key={phase.id} phase={phase} />
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="block" id="roadmap">
        <div className="wrap">
          <Roadmap basePath={`/roadmap/${key}`} />
        </div>
      </section>
    </>
  );
}
