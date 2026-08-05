// Single source of truth for the bootcamp roadmap. Nothing else holds week content.
//
// HOW TO UNLOCK THE NEXT WEEK
//   1. In `weeks`, set the current week's `status` to 'completed'.
//   2. Set the next week's `status` to 'active'.
//   3. Add that week's content fields: summary, mission, objectives, stack,
//      deliverable, and optionally resources and challenges.
//   A locked week must carry nothing but id, code, status, track and title —
//   anything written on a locked week ships to the browser before its time.
//
// HOW TO RELEASE A TUESDAY CHALLENGE
//   1. In that week's `challenges`, set the challenge's `status` to 'released'.
//   2. Set `releasedAt` to the release date ('YYYY-MM-DD'), and `deadline` if there is one.
//   3. Write the challenge's `title` and `body`.
//   A challenge with status 'draft' carries nothing but `id` and `status` — no title, no
//   body. The site shows it as a sealed slot and invents the noise on screen, so nothing
//   about an unreleased challenge can be read out of the bundle.
//
// The admin console at /admin writes all of this for you: it produces the exact snippet
// to paste here. Editing this file by hand does the same job.
//
// More than one week may be 'active' at the same time.

export const TRACKS = {
  build: { id: 'build', label: 'ساخت' },
  serve: { id: 'serve', label: 'سرویس‌دهی' },
  automate: { id: 'automate', label: 'اتوماسیون' },
  prove: { id: 'prove', label: 'اثبات' },
};

// All user-facing wording of the roadmap section lives here, not in the components.
export const ROADMAP_TEXT = {
  navLabel: 'نقشه‌ی راه بوت‌کمپ',
  hero: {
    eyebrow: 'نقشه‌ی راه',
    eyebrowMono: 'BOOTCAMP ROADMAP',
    code: 'PHASE 01 → 09 · MISSION PATH',
    title: 'نقشه‌ی',
    titleAccent: 'راه',
    tagline: 'نُه هفته، نُه مأموریت. هر هفته وقتی باز می‌شود که وقتش برسد؛ تا آن لحظه محتوایش وجود ندارد.',
  },
  kicker: 'ROADMAP',
  title: 'نُه هفته‌ی بوت‌کمپ',
  note: 'روی هر هفته‌ی باز بزن تا مأموریتش را ببینی. هفته‌های قفل هنوز اعلام نشده‌اند.',
  legendTitle: 'مسیرها',
  statusLabel: {
    locked: 'قفل',
    active: 'باز',
    completed: 'تمام‌شده',
  },
  challengeBadge: 'چالش این هفته منتشر شده',
  challengeSealedBadge: 'چالش این هفته هنوز مهروموم است',
  vault: {
    sealedLabel: 'چالش مهروموم‌شده',
    sealedTitle: 'یک چیزی این‌جا هست',
    sealedNote: 'چالش این هفته هنوز باز نشده. وقتی باز شود، خودش را نشان می‌دهد.',
    releasedKicker: 'چالش باز شد',
    releasedAt: 'منتشر شده در',
    deadline: 'مهلت',
    applied: 'این تغییر همین حالا روی پروژه‌ی شما اعمال شده است؛ حل کردنش با شماست.',
  },
  panel: {
    mission: 'مأموریت',
    objectives: 'چه چیزی سنجیده می‌شود',
    deliverable: 'تحویلیِ هفته',
    resources: 'منابع',
    close: 'بستن',
  },
};

export const weeks = [
  {
    id: 1,
    code: 'W1',
    status: 'active',
    track: 'build',
    title: 'از کافکا تا پارکت روی HDFS',
    summary: 'اولین قطعه‌ی واقعی پروژه — یک نویسنده‌ی پارکت که کل مسیر استقرارش هم خودکار باشد.',
    mission:
      'سرویسی می‌خواهیم که پیام‌های یک تاپیک کافکا را بخواند و آن‌ها را به‌صورت فایل‌های Parquet روی HDFS بنویسد. این اولین قطعه‌ی واقعی پایپ‌لاین است و هفته‌های بعد روی همین سوار می‌شوند. کار وقتی تمام است که همه‌چیز کانتینری باشد، کل استک روی یک ماشین تمیز با docker-compose بالا بیاید، و جنکینز بدون دخالت دست نسخه‌ی جدید را اعمال کند. اینکه با چه کتابخانه، چه معماری و چه سیاستی برای نوشتن فایل به این نتیجه برسید، تصمیم خودتان است و باید بتوانید از آن دفاع کنید.',
    stack: ['Kafka', 'HDFS', 'Parquet', 'Docker', 'Docker Compose', 'Jenkins'],
    deliverable:
      'جریان زنده‌ی داده از کافکا تا Parquet روی HDFS — کاملاً کانتینری، بالاآمدنی روی یک ماشین تمیز، و به‌روزشونده با یک پوش به برنچ اصلی. هر تصمیم فنی باید قابل دفاع باشد.',
    challenges: [{ id: 'w1-c1', status: 'draft' }],
  },
  { id: 2, code: 'W2', status: 'locked', track: 'build', title: 'پردازش و اولین خط CI/CD' },
  { id: 3, code: 'W3', status: 'locked', track: 'build', title: 'کیفیت کد و کانفیگ متمرکز' },
  { id: 4, code: 'W4', status: 'locked', track: 'serve', title: 'سرویس بیرونی و مانیتورینگ' },
  { id: 5, code: 'W5', status: 'locked', track: 'serve', title: 'استقرار روی کوبرنتیز' },
  { id: 6, code: 'W6', status: 'locked', track: 'automate', title: 'اتوماسیون لایه‌ی داده' },
  { id: 7, code: 'W7', status: 'locked', track: 'automate', title: 'اتوماسیون پردازش و ذخیره' },
  { id: 8, code: 'W8', status: 'locked', track: 'prove', title: 'هفته‌ی فشار و پایداری' },
  { id: 9, code: 'W9', status: 'locked', track: 'prove', title: 'بازسازی از صفر و دفاع' },
];

export function weekChallenges(week) {
  return week.challenges ?? [];
}

// 'released' wins over 'sealed' so a week that already dropped its challenge reads as open.
export function challengeState(week) {
  const list = weekChallenges(week);
  if (list.some((c) => c.status === 'released')) return 'released';
  return list.length > 0 ? 'sealed' : null;
}
