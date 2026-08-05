// Bridges the admin console and src/content/bootcamp.js: turns form state into a real week
// object (used for the live preview) and then into the object literal to paste into the file.
//
// A locked week drops every content field here, so the console cannot produce a week that
// leaks next week's content into the bundle.

const INDENT = '  ';

function quote(value) {
  return `'${String(value).trim().replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\s*\n+\s*/g, ' ')}'`;
}

function rows(text) {
  return String(text ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

function challengesFromDraft(draft) {
  if (draft.challengeMode === 'sealed') return [{ id: `w${draft.id}-c1`, status: 'draft' }];
  if (draft.challengeMode === 'released') {
    return [
      {
        id: `w${draft.id}-c1`,
        title: draft.challengeTitle.trim(),
        status: 'released',
        releasedAt: draft.releasedAt || null,
        deadline: draft.deadline || null,
        body: draft.challengeBody.trim(),
      },
    ];
  }
  return [];
}

export function draftToWeek(draft) {
  const week = {
    id: Number(draft.id),
    code: draft.code.trim(),
    status: draft.status,
    track: draft.track,
    title: draft.title.trim(),
  };
  if (draft.status === 'locked') return week;

  if (draft.summary.trim()) week.summary = draft.summary.trim();
  if (draft.mission.trim()) week.mission = draft.mission.trim();
  const objectives = rows(draft.objectives);
  if (objectives.length > 0) week.objectives = objectives;
  const stack = rows(draft.stack.replace(/[،,]/g, '\n'));
  if (stack.length > 0) week.stack = stack;
  if (draft.deliverable.trim()) week.deliverable = draft.deliverable.trim();
  const resources = rows(draft.resources)
    .map((row) => {
      const [label, url] = row.split('|').map((s) => s?.trim());
      return url ? { label, url } : null;
    })
    .filter(Boolean);
  if (resources.length > 0) week.resources = resources;
  week.challenges = challengesFromDraft(draft);
  return week;
}

function challengeSnippet(challenge, depth) {
  const pad = INDENT.repeat(depth);
  if (challenge.status !== 'released') return `${pad}{ id: ${quote(challenge.id)}, status: 'draft' },`;
  const inner = INDENT.repeat(depth + 1);
  return [
    `${pad}{`,
    `${inner}id: ${quote(challenge.id)},`,
    `${inner}title: ${quote(challenge.title)},`,
    `${inner}status: 'released',`,
    `${inner}releasedAt: ${challenge.releasedAt ? quote(challenge.releasedAt) : 'null'},`,
    `${inner}deadline: ${challenge.deadline ? quote(challenge.deadline) : 'null'},`,
    `${inner}body: ${quote(challenge.body)},`,
    `${pad}},`,
  ].join('\n');
}

export function weekSnippet(week) {
  const p2 = INDENT.repeat(2);
  const p3 = INDENT.repeat(3);

  if (week.status === 'locked') {
    return `${INDENT}{ id: ${week.id}, code: ${quote(week.code)}, status: 'locked', track: ${quote(week.track)}, title: ${quote(week.title)} },`;
  }

  const out = [
    `${INDENT}{`,
    `${p2}id: ${week.id},`,
    `${p2}code: ${quote(week.code)},`,
    `${p2}status: ${quote(week.status)},`,
    `${p2}track: ${quote(week.track)},`,
    `${p2}title: ${quote(week.title)},`,
    week.summary && `${p2}summary: ${quote(week.summary)},`,
    week.mission && `${p2}mission:\n${p3}${quote(week.mission)},`,
    week.objectives && `${p2}objectives: [\n${week.objectives.map((o) => `${p3}${quote(o)},`).join('\n')}\n${p2}],`,
    week.stack && `${p2}stack: [${week.stack.map(quote).join(', ')}],`,
    week.deliverable && `${p2}deliverable:\n${p3}${quote(week.deliverable)},`,
    week.resources &&
      `${p2}resources: [\n${week.resources.map((r) => `${p3}{ label: ${quote(r.label)}, url: ${quote(r.url)} },`).join('\n')}\n${p2}],`,
    week.challenges?.length > 0
      ? `${p2}challenges: [\n${week.challenges.map((c) => challengeSnippet(c, 3)).join('\n')}\n${p2}],`
      : `${p2}challenges: [],`,
    `${INDENT}},`,
  ];

  return out.filter(Boolean).join('\n');
}
