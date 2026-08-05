import { useEffect, useRef, useState } from 'react';
import { fmtDate } from '../lib/time';
import { ROADMAP_TEXT } from '../content/bootcamp';
import { LockIcon, SparkIcon } from './icons';

const NOISE = '█▓▒░#@%&*/\\<>?!$+=';
const SEALED_WIDTH = [14, 22, 9, 17];

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function noise(length) {
  let out = '';
  for (let i = 0; i < length; i++) out += NOISE[Math.floor(Math.random() * NOISE.length)];
  return out;
}

// Scrambles the title, then locks its characters in one by one. Reduced motion gets the plain title.
function useDecodedText(text) {
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? text : noise(text.length)));

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(text);
      return undefined;
    }
    let settled = 0;
    const id = setInterval(() => {
      settled += 1;
      setShown(text.slice(0, settled) + noise(Math.max(0, text.length - settled)));
      if (settled >= text.length) clearInterval(id);
    }, 34);
    return () => clearInterval(id);
  }, [text]);

  return shown;
}

function SealedVault() {
  const t = ROADMAP_TEXT.vault;
  const [lines, setLines] = useState(() => SEALED_WIDTH.map((w) => noise(w)));
  const timer = useRef(null);

  // The seal keeps shifting so it reads as something withheld rather than a blank slot.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    timer.current = setInterval(() => setLines(SEALED_WIDTH.map((w) => noise(w))), 520);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <article className="rp-vault sealed" aria-label={t.sealedLabel}>
      <div className="rp-vault-seal" aria-hidden="true">
        {lines.map((line, i) => (
          <span key={i} className="rp-vault-noise" style={{ '--noise-delay': `${i * 0.16}s` }}>
            {line}
          </span>
        ))}
      </div>
      <div className="rp-vault-lock">
        <LockIcon size={20} />
        <div>
          <strong>{t.sealedTitle}</strong>
          <p>{t.sealedNote}</p>
        </div>
      </div>
    </article>
  );
}

function ReleasedVault({ challenge }) {
  const t = ROADMAP_TEXT.vault;
  const title = useDecodedText(challenge.title ?? '');

  return (
    <article className="rp-vault released">
      <div className="rp-vault-head">
        <span className="rp-vault-kicker">
          <SparkIcon size={14} />
          {t.releasedKicker}
        </span>
        <span className="rp-vault-meta">
          {challenge.releasedAt && (
            <span className="tnum">
              {t.releasedAt} {fmtDate(new Date(`${challenge.releasedAt}T00:00:00`))}
            </span>
          )}
          {challenge.deadline && (
            <span className="tnum">
              {t.deadline}: {fmtDate(new Date(`${challenge.deadline}T00:00:00`))}
            </span>
          )}
        </span>
      </div>
      {challenge.title && <h4 className="rp-vault-title">{title}</h4>}
      <p className="rp-vault-applied">{t.applied}</p>
      {challenge.body && <p className="rp-vault-body">{challenge.body}</p>}
    </article>
  );
}

export default function ChallengeVault({ challenges }) {
  const list = challenges ?? [];
  if (list.length === 0) return null;

  return list.map((c) =>
    c.status === 'released' ? <ReleasedVault key={c.id} challenge={c} /> : <SealedVault key={c.id} />,
  );
}
