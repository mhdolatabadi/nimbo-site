import { fmtDate } from '../lib/time';
import { ROADMAP_TEXT, TRACKS, releasedChallenges } from '../content/bootcamp';
import { PANEL_ID } from './RoadmapNode';

const TITLE_ID = 'roadmap-panel-title';

function isoDate(iso) {
  return new Date(`${iso}T00:00:00`);
}

function ChallengeCard({ challenge }) {
  const t = ROADMAP_TEXT.panel;
  return (
    <article className="rp-challenge">
      <div className="rp-challenge-head">
        <span className="rp-challenge-kicker">⚡ {t.challengeKicker}</span>
        <span className="rp-challenge-meta">
          {challenge.releasedAt && (
            <span className="tnum">
              {t.releasedAt} {fmtDate(isoDate(challenge.releasedAt))}
            </span>
          )}
          {challenge.deadline && (
            <span className="tnum">
              {t.deadline}: {fmtDate(isoDate(challenge.deadline))}
            </span>
          )}
        </span>
      </div>
      {challenge.title && <h4 className="rp-challenge-title">{challenge.title}</h4>}
      <p className="rp-challenge-applied">{t.challengeApplied}</p>
      {challenge.body && <p className="rp-challenge-body">{challenge.body}</p>}
    </article>
  );
}

export default function MissionPanel({ week, panelRef, onClose }) {
  const t = ROADMAP_TEXT.panel;
  const challenges = releasedChallenges(week);
  const track = TRACKS[week.track];

  return (
    <section
      id={PANEL_ID}
      className={`rp-panel track-${week.track}`}
      ref={panelRef}
      tabIndex={-1}
      aria-labelledby={TITLE_ID}
    >
      {challenges.map((c) => (
        <ChallengeCard key={c.id} challenge={c} />
      ))}

      <header className="rp-panel-head">
        <div className="rp-panel-titles">
          <span className="rp-panel-code mono">
            {week.code}
            {track && <> · {track.label}</>}
          </span>
          <h3 className="rp-panel-title" id={TITLE_ID}>
            {week.title}
          </h3>
        </div>
        <button type="button" className="rp-close" onClick={onClose}>
          {t.close}
        </button>
      </header>

      {week.stack?.length > 0 && (
        <div className="rp-chips">
          {week.stack.map((s) => (
            <span key={s} className="chip tool">
              {s}
            </span>
          ))}
        </div>
      )}

      {week.mission && (
        <div className="rp-block">
          <h4 className="rp-block-title">{t.mission}</h4>
          <p>{week.mission}</p>
        </div>
      )}

      {week.objectives?.length > 0 && (
        <div className="rp-block">
          <h4 className="rp-block-title">{t.objectives}</h4>
          <ul className="rp-objectives">
            {week.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      )}

      {week.deliverable && (
        <div className="rp-deliverable">
          <span className="rp-deliverable-label">{t.deliverable}</span>
          <p>{week.deliverable}</p>
        </div>
      )}

      {week.resources?.length > 0 && (
        <div className="res">
          <div className="res-title mono">{t.resources}</div>
          {week.resources.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer">
              <span className="arrow">↗</span>
              <span>{r.label}</span>
              <span className="u">{r.url.replace(/^https?:\/\//, '')}</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
