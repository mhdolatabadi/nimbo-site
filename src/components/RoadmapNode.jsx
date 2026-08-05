import { faDigits } from '../lib/time';
import { ROADMAP_TEXT } from '../content/bootcamp';

export const PANEL_ID = 'roadmap-panel';

function Glyph({ status, id }) {
  if (status === 'locked') return <span className="rp-glyph">🔒</span>;
  if (status === 'completed') return <span className="rp-glyph">✓</span>;
  return <span className="rp-glyph tnum">{faDigits(id)}</span>;
}

export default function RoadmapNode({ week, selected, hasChallenge, connector, onSelect }) {
  const locked = week.status === 'locked';
  const classes = ['rp-item', `track-${week.track}`, `status-${week.status}`];
  if (selected) classes.push('selected');

  return (
    <li className={classes.join(' ')}>
      {connector && (
        <span
          className="rp-connector"
          aria-hidden="true"
          style={{ '--seg-from': `var(--track-${connector.from})`, '--seg-to': `var(--track-${connector.to})` }}
        />
      )}
      <button
        type="button"
        className="rp-node"
        aria-disabled={locked ? 'true' : undefined}
        tabIndex={locked ? -1 : 0}
        aria-expanded={locked ? undefined : selected}
        aria-controls={locked ? undefined : PANEL_ID}
        onClick={locked ? undefined : () => onSelect(week)}
      >
        <span className="rp-ring">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M10 16 A16 16 0 0 1 38 16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M10 32 A16 16 0 0 0 38 32" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            <circle className="rp-ring-accent" cx="24" cy="24" r="15" fill="none" strokeWidth="2" />
          </svg>
          <Glyph status={week.status} id={week.id} />
          {hasChallenge && (
            <span className="rp-badge" aria-hidden="true">
              ⚡
            </span>
          )}
        </span>
        <span className="rp-code mono">{week.code}</span>
        <span className="rp-title">{week.title}</span>
        {week.summary && <span className="rp-summary">{week.summary}</span>}
        <span className="rp-state">{ROADMAP_TEXT.statusLabel[week.status]}</span>
        {hasChallenge && <span className="rp-sr">{ROADMAP_TEXT.challengeBadge}</span>}
      </button>
    </li>
  );
}
