import { faDigits } from '../lib/time';
import { ROADMAP_TEXT } from '../content/bootcamp';
import { CheckIcon, LockIcon, SparkIcon } from './icons';

export const PANEL_ID = 'roadmap-panel';

function Glyph({ status, id }) {
  if (status === 'locked') return <LockIcon size={17} />;
  if (status === 'completed') return <CheckIcon size={18} />;
  return <span className="rp-glyph tnum">{faDigits(id)}</span>;
}

function Badge({ state }) {
  if (!state) return null;
  const label = state === 'released' ? ROADMAP_TEXT.challengeBadge : ROADMAP_TEXT.challengeSealedBadge;
  return (
    <>
      <span className={`rp-badge ${state}`} aria-hidden="true">
        {state === 'released' ? <SparkIcon size={11} /> : <span className="rp-badge-seal" />}
      </span>
      <span className="rp-sr">{label}</span>
    </>
  );
}

export default function RoadmapNode({ week, selected, challenge, connector, onSelect }) {
  const locked = week.status === 'locked';
  const classes = ['rp-item', `track-${week.track}`, `status-${week.status}`];
  if (selected) classes.push('selected');
  if (challenge) classes.push(`challenge-${challenge}`);

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
          {/* the Nimbo ring motif, same two arcs the brand mark uses */}
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path className="rp-arc" d="M10 16 A16 16 0 0 1 38 16" fill="none" strokeWidth="2.2" strokeLinecap="round" />
            <path className="rp-arc" d="M10 32 A16 16 0 0 0 38 32" fill="none" strokeWidth="2.2" strokeLinecap="round" />
            <circle className="rp-ring-accent" cx="24" cy="24" r="15" fill="none" strokeWidth="1.8" />
          </svg>
          <span className="rp-mark">
            <Glyph status={week.status} id={week.id} />
          </span>
          <Badge state={challenge} />
        </span>
        <span className="rp-code mono">{week.code}</span>
        <span className="rp-title">{week.title}</span>
        {week.summary && <span className="rp-summary">{week.summary}</span>}
        <span className="rp-state">{ROADMAP_TEXT.statusLabel[week.status]}</span>
      </button>
    </li>
  );
}
