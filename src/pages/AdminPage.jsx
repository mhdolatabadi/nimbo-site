import { useMemo, useState } from 'react';
import { ADMIN_TEXT } from '../content/admin';
import { TRACKS, weeks as publishedWeeks } from '../content/bootcamp';
import { checkCredentials } from '../lib/adminAuth';
import { useAdminSession } from '../hooks/useAdminSession';
import { draftToWeek, weekSnippet } from '../lib/bootcampSnippet';
import { faDigits } from '../lib/time';
import Roadmap from '../components/Roadmap';
import { LockIcon } from '../components/icons';

const EMPTY = {
  summary: '',
  mission: '',
  objectives: '',
  stack: '',
  deliverable: '',
  resources: '',
  challengeMode: 'none',
  challengeTitle: '',
  releasedAt: '',
  deadline: '',
  challengeBody: '',
};

// Fills the form from whatever the data file already says about a week, so the console edits
// the real thing rather than starting blank every time.
function draftFromWeek(week) {
  const challenge = (week.challenges ?? [])[0] ?? null;
  return {
    ...EMPTY,
    id: week.id,
    code: week.code,
    status: week.status,
    track: week.track,
    title: week.title,
    summary: week.summary ?? '',
    mission: week.mission ?? '',
    objectives: (week.objectives ?? []).join('\n'),
    stack: (week.stack ?? []).join('، '),
    deliverable: week.deliverable ?? '',
    resources: (week.resources ?? []).map((r) => `${r.label} | ${r.url}`).join('\n'),
    challengeMode: challenge ? (challenge.status === 'released' ? 'released' : 'sealed') : 'none',
    challengeTitle: challenge?.title ?? '',
    releasedAt: challenge?.releasedAt ?? '',
    deadline: challenge?.deadline ?? '',
    challengeBody: challenge?.body ?? '',
  };
}

function LoginForm({ onOpen }) {
  const t = ADMIN_TEXT.login;
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const valid = await checkCredentials(user, password);
    setError(!valid);
    if (valid) onOpen(true);
  }

  return (
    <form className="adm-login" onSubmit={submit}>
      <div className="adm-login-head">
        <LockIcon size={20} />
        <h2>{t.title}</h2>
      </div>
      <p className="adm-note">{t.note}</p>
      <label>
        <span>{t.user}</span>
        <input value={user} onChange={(e) => setUser(e.target.value)} autoComplete="username" />
      </label>
      <label>
        <span>{t.password}</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      </label>
      {error && <p className="adm-error">{t.error}</p>}
      <button type="submit" className="adm-primary">
        {t.submit}
      </button>
      <p className="adm-warn">{t.insecure}</p>
    </form>
  );
}

function Field({ label, value, onChange, rows = 3 }) {
  return (
    <label className="adm-field">
      <span>{label}</span>
      {rows === 1 ? (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function Console({ onClose }) {
  const t = ADMIN_TEXT.console;
  const [draft, setDraft] = useState(() => draftFromWeek(publishedWeeks[0]));
  const [copied, setCopied] = useState(false);

  const set = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }));

  const week = useMemo(() => draftToWeek(draft), [draft]);
  const snippet = useMemo(() => weekSnippet(week), [week]);
  const previewWeeks = useMemo(
    () => publishedWeeks.map((w) => (w.id === week.id ? week : w)),
    [week],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="adm-console">
      <div className="adm-bar">
        <label className="adm-inline">
          <span>{t.weekPicker}</span>
          <select
            value={draft.id}
            onChange={(e) => setDraft(draftFromWeek(publishedWeeks.find((w) => w.id === Number(e.target.value))))}
          >
            {publishedWeeks.map((w) => (
              <option key={w.id} value={w.id}>
                {w.code} — {w.title}
              </option>
            ))}
          </select>
        </label>
        <label className="adm-inline">
          <span>{t.statusLabel}</span>
          <select value={draft.status} onChange={(e) => set('status')(e.target.value)}>
            {Object.entries(t.status).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="adm-inline">
          <span>track</span>
          <select value={draft.track} onChange={(e) => set('track')(e.target.value)}>
            {Object.values(TRACKS).map((track) => (
              <option key={track.id} value={track.id}>
                {track.label}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="adm-ghost" onClick={() => onClose(false)}>
          {t.logout}
        </button>
      </div>

      <div className="adm-grid">
        <div className="adm-form">
          <Field label={t.fields.title} value={draft.title} onChange={set('title')} rows={1} />
          {draft.status === 'locked' ? (
            <p className="adm-note">{t.lockedNote}</p>
          ) : (
            <>
              <Field label={t.fields.summary} value={draft.summary} onChange={set('summary')} rows={2} />
              <Field label={t.fields.mission} value={draft.mission} onChange={set('mission')} rows={6} />
              <Field label={t.fields.objectives} value={draft.objectives} onChange={set('objectives')} rows={5} />
              <Field label={t.fields.stack} value={draft.stack} onChange={set('stack')} rows={1} />
              <Field label={t.fields.deliverable} value={draft.deliverable} onChange={set('deliverable')} rows={4} />
              <Field label={t.fields.resources} value={draft.resources} onChange={set('resources')} rows={3} />

              <fieldset className="adm-fieldset">
                <legend>{t.challenge.legend}</legend>
                <div className="adm-modes">
                  {Object.entries(t.challenge.modes).map(([value, label]) => (
                    <label key={value} className={draft.challengeMode === value ? 'active' : ''}>
                      <input
                        type="radio"
                        name="challenge-mode"
                        value={value}
                        checked={draft.challengeMode === value}
                        onChange={() => set('challengeMode')(value)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
                {draft.challengeMode === 'released' && (
                  <>
                    <Field label={t.challenge.title} value={draft.challengeTitle} onChange={set('challengeTitle')} rows={1} />
                    <div className="adm-dates">
                      <label className="adm-field">
                        <span>{t.challenge.releasedAt}</span>
                        <input type="date" value={draft.releasedAt} onChange={(e) => set('releasedAt')(e.target.value)} />
                      </label>
                      <label className="adm-field">
                        <span>{t.challenge.deadline}</span>
                        <input type="date" value={draft.deadline} onChange={(e) => set('deadline')(e.target.value)} />
                      </label>
                    </div>
                    <Field label={t.challenge.body} value={draft.challengeBody} onChange={set('challengeBody')} rows={5} />
                  </>
                )}
              </fieldset>
            </>
          )}
        </div>

        <div className="adm-output">
          <div className="adm-output-head">
            <h3>{t.outputTitle}</h3>
            <button type="button" className="adm-primary small" onClick={copy}>
              {copied ? t.copied : t.copy}
            </button>
          </div>
          <p className="adm-note">{t.outputNote}</p>
          <pre className="adm-code">
            <code>{snippet}</code>
          </pre>
          <p className="adm-warn">{t.reminder}</p>
        </div>
      </div>

      <div className="adm-preview">
        <div className="sec-head">
          <span className="sec-kicker">PREVIEW</span>
          <h3 className="sec-title" style={{ fontSize: '1.4rem' }}>
            {t.previewTitle} — {ADMIN_TEXT.console.weekPicker} {faDigits(draft.id)}
          </h3>
        </div>
        <p className="sec-note" style={{ marginBottom: 22 }}>
          {t.previewNote}
        </p>
        <Roadmap weeks={previewWeeks} routed={false} heading={false} />
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [open, setOpen] = useAdminSession();
  const hero = ADMIN_TEXT.hero;

  return (
    <>
      <section className="hero" id="top" style={{ padding: '76px 0 46px' }}>
        <div className="wrap inner">
          <span className="eyebrow">
            <span className="dot" /> {hero.eyebrow} · <span className="mono">{hero.eyebrowMono}</span>
          </span>
          <h1 className="display" style={{ fontSize: 'clamp(2.2rem,6vw,4rem)' }}>
            {hero.title} <b>{hero.titleAccent}</b>
          </h1>
          <p className="tagline">{hero.tagline}</p>
        </div>
      </section>

      <div className="divider" />

      <section className="block">
        <div className="wrap">{open ? <Console onClose={setOpen} /> : <LoginForm onOpen={setOpen} />}</div>
      </section>
    </>
  );
}
