// Single source of truth for the bootcamp roadmap. Nothing else holds week content.
//
// WEEK STATUS — the one field you edit as the bootcamp moves
//   'completed' — finished. Solid node, check mark, readable.
//   'active'    — the week being worked on right now. Emphasized node.
//   'upcoming'  — written and readable, but not started yet. Muted node, readable panel.
//   'locked'    — nothing to show. Sealed node, not clickable, and the week object carries
//                 only id, code, status, track and title, so its content cannot be read out
//                 of the bundle before its time.
//   More than one week may be 'active' at the same time.
//
// TO MOVE THE BOOTCAMP FORWARD
//   Set the finished week's `status` to 'completed' and the new one's to 'active'.
//   To open a sealed week, change 'locked' to 'upcoming' and add its content fields.
//
// TO RELEASE A TUESDAY CHALLENGE
//   In that week's `challenges`, set `status` to 'released', set `releasedAt` ('YYYY-MM-DD')
//   and `deadline` if there is one, then write the `title` and `body`.
//   A challenge with status 'draft' carries nothing but `id` and `status` — no title, no body.
//   The site shows it as a sealed slot and invents the noise on screen, so nothing about an
//   unreleased challenge can be read out of the bundle.
//
// WHO CAN REACH THIS PAGE
//   The roadmap lives at a secret address: /roadmap/<ROADMAP_KEY>. Change the key below to
//   invalidate every link that has been handed out. See the note on ROADMAP_KEY.

// Anyone with this address sees the roadmap; every other address redirects to phase zero.
// There is no password — the link IS the key, so hand it out deliberately. Changing this
// string breaks all previously shared links, which is how you revoke access.
export const ROADMAP_KEY = 'fddf33c97889';

export const TRACKS = {
  build: { id: 'build', label: 'ساخت' },
  serve: { id: 'serve', label: 'سرویس‌دهی' },
  automate: { id: 'automate', label: 'اتوماسیون' },
  prove: { id: 'prove', label: 'اثبات' },
};

// All user-facing wording of the roadmap section lives here, not in the components.
export const ROADMAP_TEXT = {
  hero: {
    eyebrow: 'نقشه‌ی راه',
    eyebrowMono: 'BOOTCAMP ROADMAP',
    code: 'PHASE 01 → 09 · MISSION PATH',
    title: 'نقشه‌ی',
    titleAccent: 'راه',
    tagline: 'نُه هفته، نُه مأموریت. هر هفته یک تکه‌ی تازه از معماری را می‌سازد و روی هفته‌ی قبل سوار می‌شود.',
  },
  kicker: 'ROADMAP',
  title: 'نُه هفته‌ی بوت‌کمپ',
  note: 'روی هر هفته بزن تا مأموریت و شکلِ معماری در پایان آن هفته را ببینی.',
  legendTitle: 'مسیرها',
  statusLabel: {
    locked: 'قفل',
    upcoming: 'پیشِ رو',
    active: 'هفته‌ی جاری',
    completed: 'تمام‌شده',
  },
  upcomingRibbon: 'این هفته هنوز شروع نشده — این نقشه‌ی کار است، نه مأموریت فعال.',
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
    architecture: 'معماری در پایان این هفته',
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
  {
    id: 2,
    code: 'W2',
    status: 'upcoming',
    track: 'build',
    title: 'پردازش و اولین خط CI/CD',
    summary: 'داده‌ی خام معنا پیدا می‌کند و خط تحویل، خودکار می‌شود.',
    mission:
      'داده‌ای که هفته‌ی قبل خام روی HDFS نشست باید معنا پیدا کند: لایه‌ای می‌خواهیم که همان فایل‌های Parquet را بخواند و از دلشان خروجی تمیز و قابل‌استفاده بسازد. هم‌زمان، اولین خط واقعی CI/CD باید سر پا باشد — هر پوش تست‌ها را اجرا کند و فقط اگر سبز بود، نسخه‌ی جدید جای قبلی بنشیند. دسته‌ای یا جریانی بودنِ پردازش، ابزارش، و اینکه شکستِ تست دقیقاً چه چیزی را متوقف کند، تصمیم خودتان است.',
    stack: ['Spark', 'HDFS', 'Parquet', 'Jenkins', 'Docker'],
    deliverable:
      'خروجیِ پردازش‌شده روی HDFS که از داده‌ی خام هفته‌ی اول ساخته می‌شود، به‌علاوه‌ی خطی که با یک پوش، تست و استقرار را بدون دخالت دست انجام می‌دهد.',
    challenges: [{ id: 'w2-c1', status: 'draft' }],
  },
  {
    id: 3,
    code: 'W3',
    status: 'upcoming',
    track: 'build',
    title: 'کیفیت کد و کانفیگ متمرکز',
    summary: 'کد باید از دروازه رد شود و پیکربندی از یک جا بیاید.',
    mission:
      'تا این‌جا سرویس‌ها کار می‌کنند؛ حالا باید قابل نگه‌داری باشند. کدِ نامرغوب نباید اجازه‌ی ورود به برنچ اصلی داشته باشد، و پیکربندی سرویس‌ها نباید کنار ایمیج‌ها پخش باشد — باید بتوانید یک مقدار را در یک جا عوض کنید و بدون بیلد دوباره اثرش را ببینید. اینکه دروازه‌ی کیفیت چه چیزی را بسنجد و آستانه‌اش کجا باشد، و پیکربندی از کجا بیاید، انتخاب خودتان است و باید بتوانید از آن دفاع کنید.',
    stack: ['SonarQube', 'Git', 'Jenkins', 'Docker'],
    deliverable:
      'دروازه‌ای که مرجِ کدِ زیرِ استاندارد را می‌بندد، و سرویس‌هایی که پیکربندی‌شان را از یک منبع متمرکز می‌گیرند — بدون اینکه رمزی داخل ایمیج بماند.',
    challenges: [{ id: 'w3-c1', status: 'draft' }],
  },
  {
    id: 4,
    code: 'W4',
    status: 'upcoming',
    track: 'serve',
    title: 'سرویس بیرونی و مانیتورینگ',
    summary: 'داده از پایپ‌لاین بیرون می‌آید و حال سیستم دیده می‌شود.',
    mission:
      'تا حالا داده وارد شده و پردازش شده، ولی هیچ‌کس از بیرون به آن دسترسی ندارد. سرویسی می‌خواهیم که نتیجه‌ی پردازش را به مصرف‌کننده‌ی بیرونی بدهد، و در کنارش پایشی که وضعیت سیستم را نشان دهد — نه فقط زنده بودن، بلکه اینکه چقدر داده می‌آید، چقدر عقب است، و کجا کند می‌شود. اینکه چه چیزی را متریک بگیرید و چه چیزی ارزش هشدار دادن دارد، بخشی از همین مأموریت است.',
    stack: ['Prometheus', 'Grafana', 'Nginx', 'Docker'],
    deliverable:
      'یک سرویس بیرونی که داده‌ی پردازش‌شده را سرو می‌کند، و داشبوردی که وضعیت پایپ‌لاین را نشان می‌دهد و وقتی چیزی خراب شد، قبل از کاربر خبردار می‌شوید.',
    challenges: [{ id: 'w4-c1', status: 'draft' }],
  },
  {
    id: 5,
    code: 'W5',
    status: 'upcoming',
    track: 'serve',
    title: 'استقرار روی کوبرنتیز',
    summary: 'استک از یک ماشین به کلاستر مهاجرت می‌کند.',
    mission:
      'همان استکی که تا حالا با docker-compose بالا می‌آمد باید روی کوبرنتیز بایستد و همان رفتار را داشته باشد. سرویس‌ها باید خودشان برگردند، نسخه‌ی جدید بدون قطعی جای قبلی بنشیند، و دیتای ماندگار سرِ جایش بماند. اینکه چه چیزی Deployment باشد و چه چیزی StatefulSet، و پیکربندی و رمزها چطور به پاد برسند، تصمیم خودتان است.',
    stack: ['Kubernetes', 'Helm', 'Docker', 'Jenkins'],
    deliverable:
      'کل استک روی کلاستر، با استقرارِ بدون قطعی از همان خط CI/CD — و بازگشتِ خودکار سرویس‌ها وقتی یک پاد را عمداً می‌کشید.',
    challenges: [{ id: 'w5-c1', status: 'draft' }],
  },
  {
    id: 6,
    code: 'W6',
    status: 'upcoming',
    track: 'automate',
    title: 'اتوماسیون لایه‌ی داده',
    summary: 'کافکا و HDFS دیگر دستی بالا نمی‌آیند.',
    mission:
      'لایه‌ی داده تا این‌جا با دست سر پا شده است. حالا باید از صفر و بدون دخالت انسان ساخته شود: روی یک ماشین خام، با یک فرمان، کافکا و HDFS با همان پیکربندی و همان کاربران و همان دسترسی‌ها بالا بیایند. اجرای دوباره‌ی همان فرمان نباید چیزی را خراب کند. اینکه با چه ابزاری و با چه ساختاری این را بسازید، انتخاب خودتان است.',
    stack: ['Ansible', 'Kafka', 'HDFS', 'Docker'],
    deliverable:
      'لایه‌ی دادهٔ کاملاً خودکار: از ماشین خالی تا کافکا و HDFS آماده، تکرارپذیر و بدون هیچ مرحله‌ی دستی.',
    challenges: [{ id: 'w6-c1', status: 'draft' }],
  },
  {
    id: 7,
    code: 'W7',
    status: 'upcoming',
    track: 'automate',
    title: 'اتوماسیون پردازش و ذخیره',
    summary: 'کل پایپ‌لاین با یک فرمان از نو ساخته می‌شود.',
    mission:
      'همان کاری که هفته‌ی قبل برای لایه‌ی داده کردید، حالا برای پردازش و ذخیره‌سازی و سرویس‌ها هم باید انجام شود. هدف این است که کل سیستم — از صفر تا جریان زنده‌ی داده — با یک مسیر خودکار ساخته شود و هیچ دانشی فقط توی سر یک نفر نماند. باید بتوانید یک محیط تازه بسازید و نشان دهید همان چیزی است که در محیط اصلی اجرا می‌شود.',
    stack: ['Ansible', 'Helm', 'Kubernetes', 'Spark', 'Jenkins'],
    deliverable:
      'کل پایپ‌لاین از ماشین خام تا داده‌ی سرو‌شده، ساخته‌شده با یک مسیر خودکار — و یک محیط دوم که ثابت می‌کند این مسیر واقعاً تکرارپذیر است.',
    challenges: [{ id: 'w7-c1', status: 'draft' }],
  },
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

// A week is readable when it carries content; only 'locked' weeks are sealed shut.
export function isReadable(week) {
  return week.status !== 'locked';
}
