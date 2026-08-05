import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROADMAP_TEXT, TRACKS, weeks as publishedWeeks, challengeState } from '../content/bootcamp';
import RoadmapNode from './RoadmapNode';
import MissionPanel from './MissionPanel';

const SLUG_PATTERN = /^week-(\d+)$/;
const ROADMAP_PATH = '/roadmap';

// A locked week has no addressable content, so its deep link falls back to the default state.
function weekFromSlug(slug, weeks) {
  const match = SLUG_PATTERN.exec(slug ?? '');
  if (!match) return null;
  const week = weeks.find((w) => w.id === Number(match[1]));
  return week && week.status !== 'locked' ? week : null;
}

// On the roadmap page the open week lives in the URL so it can be shared; inside the admin
// console's preview it is local state, because that view is not a place you link to.
function useSelectedWeek(weeks, routed) {
  const { weekSlug } = useParams();
  const navigate = useNavigate();
  const [localId, setLocalId] = useState(null);

  if (routed) {
    const selected = weekFromSlug(weekSlug, weeks);
    return [
      selected,
      (week) => navigate(week && week.id !== selected?.id ? `${ROADMAP_PATH}/week-${week.id}` : ROADMAP_PATH),
    ];
  }
  const selected = weeks.find((w) => w.id === localId && w.status !== 'locked') ?? null;
  return [selected, (week) => setLocalId(week && week.id !== localId ? week.id : null)];
}

export default function Roadmap({ weeks = publishedWeeks, routed = true, heading = true }) {
  const [selected, select] = useSelectedWeek(weeks, routed);
  const panelRef = useRef(null);
  const selectedId = selected?.id ?? null;

  useEffect(() => {
    const panel = panelRef.current;
    if (selectedId === null || !panel) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    panel.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
  }, [selectedId]);

  return (
    <>
      {heading && (
        <>
          <div className="sec-head">
            <span className="sec-kicker">{ROADMAP_TEXT.kicker}</span>
            <h2 className="sec-title">{ROADMAP_TEXT.title}</h2>
          </div>
          <p className="sec-note" style={{ marginBottom: 26 }}>
            {ROADMAP_TEXT.note}
          </p>
        </>
      )}

      <div className="rp-legend">
        <span className="rp-legend-title">{ROADMAP_TEXT.legendTitle}</span>
        {Object.values(TRACKS).map((track) => (
          <span key={track.id} className={`rp-legend-item track-${track.id}`}>
            <i aria-hidden="true" />
            {track.label}
          </span>
        ))}
      </div>

      <ol className="rp-list">
        {weeks.map((week, index) => {
          const next = weeks[index + 1];
          return (
            <RoadmapNode
              key={week.id}
              week={week}
              selected={week.id === selectedId}
              challenge={challengeState(week)}
              connector={next ? { from: week.track, to: next.track } : null}
              onSelect={select}
            />
          );
        })}
      </ol>

      {selected && <MissionPanel week={selected} panelRef={panelRef} onClose={() => select(selected)} />}
    </>
  );
}
