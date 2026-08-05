import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROADMAP_TEXT, TRACKS, weeks, releasedChallenges } from '../content/bootcamp';
import RoadmapNode from './RoadmapNode';
import MissionPanel from './MissionPanel';

const SLUG_PATTERN = /^week-(\d+)$/;
const ROADMAP_PATH = '/roadmap';

// A locked week has no addressable content, so its deep link falls back to the default state.
function weekFromSlug(slug) {
  const match = SLUG_PATTERN.exec(slug ?? '');
  if (!match) return null;
  const week = weeks.find((w) => w.id === Number(match[1]));
  return week && week.status !== 'locked' ? week : null;
}

export default function Roadmap() {
  const { weekSlug } = useParams();
  const navigate = useNavigate();
  const panelRef = useRef(null);

  const selected = weekFromSlug(weekSlug);
  const selectedId = selected?.id ?? null;

  useEffect(() => {
    const panel = panelRef.current;
    if (selectedId === null || !panel) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    panel.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
  }, [selectedId]);

  function handleSelect(week) {
    navigate(week.id === selectedId ? ROADMAP_PATH : `${ROADMAP_PATH}/week-${week.id}`);
  }

  return (
    <section className="block" id="roadmap">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-kicker">{ROADMAP_TEXT.kicker}</span>
          <h2 className="sec-title">{ROADMAP_TEXT.title}</h2>
        </div>
        <p className="sec-note" style={{ marginBottom: 26 }}>
          {ROADMAP_TEXT.note}
        </p>

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
                hasChallenge={releasedChallenges(week).length > 0}
                connector={next ? { from: week.track, to: next.track } : null}
                onSelect={handleSelect}
              />
            );
          })}
        </ol>

        {selected && <MissionPanel week={selected} panelRef={panelRef} onClose={() => navigate(ROADMAP_PATH)} />}
      </div>
    </section>
  );
}
