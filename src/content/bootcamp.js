// Single source of truth for the bootcamp roadmap. Nothing else holds week content.
//
// WEEK STATUS — the one field you edit as the bootcamp moves
//   'completed' — finished. Solid node, check mark, readable.
//   'active'    — the week being worked on right now. Emphasized node.
//   'upcoming'  — written and readable, but not started yet. Muted node, readable panel.
//   'locked'    — nothing to show. Sealed node, not clickable, and the week object carries
//                 only id, code, status, phase and title, so its content cannot be read out
//                 of the bundle before its time.
//   More than one week may be 'active' at the same time.
//
// TO MOVE THE BOOTCAMP FORWARD
//   Set the finished week's `status` to 'completed' and the new one's to 'active'.
//
// TO RELEASE A CHALLENGE
//   In that week's `challenges`, set `status` to 'released', set `releasedAt` ('YYYY-MM-DD')
//   and `deadline` if there is one, then write the `title` and `body`.
//   A challenge with status 'draft' carries nothing but `id` and `status` — no title, no body.
//   The site shows it as a sealed slot and invents the noise on screen, so nothing about an
//   unreleased challenge can be read out of the bundle. This is how the week-five disruption
//   stays unnamed until the day it lands.
//
// WHO CAN REACH THIS PAGE
//   The roadmap lives at a secret address: /roadmap/<ROADMAP_KEY>. Change the key below to
//   invalidate every link that has been handed out.

// Anyone with this address sees the roadmap; every other address redirects to phase zero.
// There is no password — the link IS the key, so hand it out deliberately.
export const ROADMAP_KEY = 'fddf33c97889';

// The brief every week hangs off: what the data is, and what the platform must become.
export const PROJECT = {
  kicker: 'PROJECT BRIEF',
  title: 'بستری برای داده‌های Netflow',
  intro:
    'داده‌ی این پروژه رکوردهای Netflow است — ارتباطات یک شبکه‌ی اینترنتی با حدود ۵۰ ستون، که بخشی از آن‌ها تهاجم امنیتی‌اند. این رکوردها به‌صورت Avro و پیوسته روی تاپیک کافکای تیم شما ریخته می‌شوند. از کافکا به بعد، همه‌چیز دست شماست.',
  goal:
    'چیزی که باید بسازید: بستری که این جریان را با کمترین تأخیر برمی‌دارد، بدون از دست دادن حتی یک رکورد ذخیره‌اش می‌کند، و جوابِ تحلیل‌ها را از طریق API در اختیار می‌گذارد. تا انتهای برنامه، هر جواب باید از دو مسیر مستقل قابل گرفتن باشد.',
  rulesTitle: 'قواعد ثابت — هر هفته، بدون استثنا',
  rules: [
    'هیچ داده‌ای نباید از دست برود؛ حتی وقتی یک مؤلفه یا یک ماشین می‌میرد.',
    'هر مؤلفه باید با نرخ بالاترِ ورودی کنار بیاید — گسترش افقی، نه بزرگ‌کردن ماشین.',
    'چنجی که تست ندارد سابمیت نمی‌شود، و هر تغییری بازبینی می‌شود.',
    'هر چیزی که با دست نصب شده باید از روی کدبیس هم نصب شود.',
    'کدی که نمی‌توانید خط‌به‌خط توضیحش بدهید، مال شما نیست. «کار می‌کند» کافی نیست.',
  ],
};

export const PHASES = {
  p1: {
    id: 'p1',
    code: 'PHASE 1',
    label: 'جریان و اولین جواب‌ها',
    weeks: 'هفته‌ی ۱ تا ۳',
    requirement:
      'داده از لحظه‌ی رسیدن تا اولین جواب باید یک مسیر کامل داشته باشد، و آن مسیر باید از روی کدبیس روی یک محیط تازه دوباره ساخته شود. تحلیل‌های این فاز سبک‌اند؛ سنگینی‌شان جای دیگری است.',
    analysesTitle: 'تحلیل‌های این فاز',
    analyses: [
      'بیشترین ترافیک ورودی و خروجی یک IP در یک بازه',
      'فهرست ارتباطات یک IP در یک بازه',
      'IPهایی با بیشترین مصرف پهنای باند',
      'پروتکل‌های پرکاربرد شبکه',
    ],
    note: 'بازه حداکثر یک هفته، ریزدانگی در حد ساعت.',
  },
  p2: {
    id: 'p2',
    code: 'PHASE 2',
    label: 'دو مسیر و یک سرویس',
    weeks: 'هفته‌ی ۴ تا ۵',
    requirement:
      'هر دو مسیر باید از بیرون پاسخ بدهند و روی بستری بایستند که به یک ماشین گره نخورده. از این‌جا به بعد، جوابِ یک سؤال باید هم‌زمان از دو جا قابل گرفتن باشد.',
    analysesTitle: 'چه چیزی سخت‌تر می‌شود',
    analyses: [
      'همان تحلیل‌ها، این‌بار زیر درخواست‌های موازی',
      'ریزدانگی دقیقه‌ای برای بازه‌های کوتاه',
      'پاسخ بلادرنگ در کنار پاسخ تجمیعی',
    ],
  },
  p3: {
    id: 'p3',
    code: 'PHASE 3',
    label: 'تاب‌آوری، اتوماسیون و اثبات',
    weeks: 'هفته‌ی ۶ تا ۹',
    requirement:
      'سیستم باید بدون شما از صفر ساخته شود، زیر بار بیشتر سر پا بماند، و جواب‌هایش قابل دفاع باشد — از جمله آن‌جا که دو مسیر دو عدد متفاوت می‌دهند.',
    analysesTitle: 'چه چیزی سخت‌تر می‌شود',
    analyses: [
      'گزارش‌هایی که جوابشان یک کوئری ساده نیست',
      'رفتار مشکوک در ترافیک: اسکن، انفجار ناگهانی، ارتباط غیرعادی',
      'اختلاف دو مسیر: چرا، از کِی، و کدام درست است',
    ],
  },
};

export const ROADMAP_TEXT = {
  hero: {
    eyebrow: 'نقشه‌ی راه',
    eyebrowMono: 'BOOTCAMP ROADMAP',
    code: 'NETFLOW PLATFORM · 9 WEEKS',
    title: 'نقشه‌ی',
    titleAccent: 'راه',
    tagline: 'نُه هفته روی یک پروژه‌ی واحد. هر هفته یک تکه‌ی تازه از معماری را زنده می‌کند و روی هفته‌ی قبل سوار می‌شود.',
  },
  kicker: 'ROADMAP',
  title: 'نُه هفته‌ی بوت‌کمپ',
  note: 'روی هر هفته بزن تا مأموریت و شکلِ معماری در پایان آن هفته را ببینی.',
  legendTitle: 'فازها',
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
    deliverable: 'تحویلیِ هفته',
    resources: 'منابع',
    architecture: 'معماری در پایان این هفته',
    milestone: 'رویداد این هفته',
    close: 'بستن',
  },
};

export const weeks = [
  {
    id: 1,
    code: 'W1',
    status: 'active',
    phase: 'p1',
    title: 'از کافکا تا پارکت روی HDFS',
    summary: 'اولین قطعه‌ی واقعی پروژه — یک نویسنده‌ی پارکت که کل مسیر استقرارش هم خودکار باشد.',
    mission:
      'سرویسی می‌خواهیم که پیام‌های یک تاپیک کافکا را بخواند و آن‌ها را به‌صورت فایل‌های Parquet روی HDFS بنویسد. این اولین قطعه‌ی واقعی پایپ‌لاین است و هفته‌های بعد روی همین سوار می‌شوند. کار وقتی تمام است که همه‌چیز کانتینری باشد، کل استک روی یک ماشین تمیز با docker-compose بالا بیاید، و جنکینز بدون دخالت دست نسخه‌ی جدید را اعمال کند. اینکه با چه کتابخانه، چه معماری و چه سیاستی برای نوشتن فایل به این نتیجه برسید، تصمیم خودتان است و باید بتوانید از آن دفاع کنید.',
    stack: ['Kafka', 'Avro', 'HDFS', 'Parquet', 'Docker', 'Jenkins'],
    deliverable:
      'جریان زنده‌ی داده از کافکا تا Parquet روی HDFS — کاملاً کانتینری، بالاآمدنی روی یک ماشین تمیز، و به‌روزشونده با یک پوش به برنچ اصلی. هر تصمیم فنی باید قابل دفاع باشد.',
    challenges: [{ id: 'w1-c1', status: 'draft' }],
  },
  {
    id: 2,
    code: 'W2',
    status: 'upcoming',
    phase: 'p1',
    title: 'مسیر دوم و بلوغ ابزار',
    summary: 'یک صف، دو مقصد — و ابزار ساخت که دیگر اسباب‌بازی نیست.',
    mission:
      'از همان تاپیکی که هفته‌ی قبل پر شد، نویسنده‌ی دومی می‌خواهیم که رکوردها را با کمترین تأخیر داخل StarRocks بنشاند؛ StarRocks یک انبار تحلیلی ستونی است که برای پاسخ سریع روی حجم بالا ساخته شده و مسیر بلادرنگِ شما از این‌جا رد می‌شود. هم‌زمان مسیر دوم هم باید راه بیفتد: خواندن همان فایل‌های Parquet با Spark و ساختن جدول‌های تجمیعی در PostgreSQL — چیزی که ما مکعب‌ساز صدایش می‌کنیم. تا پایان هفته انتظار داریم مسیر بلادرنگ جواب بدهد و مکعب‌ساز شروع شده باشد.\nدر کنارش ابزار ساخت باید بزرگ شود: ساختن ایمیج با docker build دستی و کپی‌کردن jar دیگر جواب نمی‌دهد — Jib ایمیج را از دل خودِ بیلد می‌سازد. کیفیت کد هم از تعارف در می‌آید: SonarQube باید داخل پایپ‌لاین بنشیند و جلوی کدِ زیرِ استاندارد را بگیرد.',
    stack: ['StarRocks', 'Spark', 'PostgreSQL', 'Kafka', 'Jib', 'SonarQube'],
    deliverable:
      'رکوردهایی که هم‌زمان در StarRocks قابل پرس‌وجو هستند و در Parquet برای پردازش دسته‌ای می‌مانند؛ ایمیج‌هایی که از خودِ بیلد بیرون می‌آیند؛ و پایپ‌لاینی که کدِ بی‌کیفیت را رد می‌کند.',
    challenges: [{ id: 'w2-c1', status: 'draft' }],
  },
  {
    id: 3,
    code: 'W3',
    status: 'upcoming',
    phase: 'p1',
    title: 'تمام‌کردن، و ایستادن جلوی سؤال',
    summary: 'دو مسیر باید کامل شوند — و بعد باید از تصمیم‌هایتان دفاع کنید.',
    mission:
      'این هفته جایی است که تصمیم‌های هفته‌ی قبل هزینه‌شان را نشان می‌دهند. هر دو مسیر باید تا انتها کامل شوند: مکعب‌ساز باید جدول‌های تجمیعی را در PostgreSQL بنشاند، و هر چهار تحلیل فاز اول باید از روی داده‌ی واقعی جواب بدهند. بازبینی کد در Gerrit باید عادت باشد نه تشریفات، و پوشش تست باید معنادار باشد نه عددی که پایپ‌لاین را سبز کند.',
    stack: ['Spark', 'PostgreSQL', 'StarRocks', 'Gerrit', 'SonarQube'],
    deliverable:
      'هر چهار تحلیل فاز اول، از داده‌ی واقعی، از مسیری که خودتان ساخته‌اید — و ارائه‌ای که جلوی سؤال دوام بیاورد.',
    milestone: {
      title: 'جلسه‌ی بازبینی TPM — پایان هفته',
      body: 'TPMها می‌آیند، درباره‌ی مؤلفه‌ها و محدودیت‌هایی که رعایت کرده‌اید سؤال می‌کنند، و شما پروژه را ارائه می‌دهید. چیزی که آن‌جا می‌شنوید، ورودی هفته‌ی بعد است.',
    },
    challenges: [{ id: 'w3-c1', status: 'draft' }],
  },
  {
    id: 4,
    code: 'W4',
    status: 'upcoming',
    phase: 'p2',
    title: 'بدهی، و دو دهانه‌ی خروجی',
    summary: 'آنچه در بازبینی شنیدید باید در کد بنشیند — و جواب‌ها باید از بیرون قابل گرفتن باشند.',
    mission:
      'اول بدهی: هر چیزی که در جلسه‌ی بازبینی بالا آمد — محدودیتی که رعایت نشده، منطقی که بی‌دلیل پیچیده است، کدی که نمی‌توانید خط‌به‌خط توضیحش بدهید — باید همین هفته بسته شود.\nبعد سرویس: روی هر دو مسیر REST API می‌خواهیم؛ یکی روی StarRocks برای پاسخ بلادرنگ و یکی روی PostgreSQL برای تحلیل‌های تجمیعی. مرزها را طوری بکشید که سه نفر بتوانند هم‌زمان و بدون پا گذاشتن روی هم کار کنند — این خودش یک تصمیم معماری است، نه یک هماهنگی شفاهی.',
    stack: ['REST API', 'StarRocks', 'PostgreSQL', 'Jenkins'],
    deliverable:
      'APIهایی که هر چهار تحلیل را از هر دو مسیر پاسخ می‌دهند، با زمان پاسخِ قابل قبول زیر درخواست موازی.',
    challenges: [{ id: 'w4-c1', status: 'draft' }],
  },
  {
    id: 5,
    code: 'W5',
    status: 'upcoming',
    phase: 'p2',
    title: 'بستر مشترک',
    summary: 'استک باید از یک ماشین بلند شود و روی کلاستر بایستد.',
    mission:
      'تا این‌جا همه‌چیز روی docker-compose و ماشین خودتان بالا می‌آمد. حالا باید روی Kubernetes بایستد: هر مؤلفه یک Helm Chart، پیکربندی در ConfigMap و رمزها در Secret — نه داخل ایمیج. سرویس‌ها باید خودشان برگردند، نسخه‌ی جدید بدون قطعی جای قبلی بنشیند، و داده‌ی ماندگار سرِ جایش بماند. اینکه چه چیزی Deployment باشد و چه چیزی StatefulSet، و اصلاً کدام مؤلفه داخل کلاستر برود، تصمیم شماست و باید بتوانید توضیحش بدهید.',
    stack: ['Kubernetes', 'Helm', 'Docker', 'Jenkins'],
    deliverable:
      'هر مؤلفه با یک Helm Chart روی کلاستر، با استقرار از همان خط CI/CD — و بازگشت خودکار وقتی یک پاد را عمداً می‌کشید.',
    challenges: [{ id: 'w5-c1', status: 'draft' }],
  },
  {
    id: 6,
    code: 'W6',
    status: 'upcoming',
    phase: 'p3',
    title: 'بالا آمدن بدون دست',
    summary: 'لایه‌ی داده باید از ماشین خام، خودش بالا بیاید.',
    mission:
      'هیچ‌کدام از زیرساخت‌هایتان نباید با دست نصب شده باشد. روی یک ماشین خام، Kafka و HDFS و StarRocks باید با Ansible Playbook بالا بیایند — با همان پیکربندی، همان کاربران، همان دسترسی‌ها. اجرای دوباره‌ی همان Playbook نباید چیزی را خراب کند؛ این یعنی idempotency، و سخت‌ترین بخش کار همین است. از ماژول‌های خودِ Ansible استفاده کنید، نه shell پشت shell.',
    stack: ['Ansible', 'Kafka', 'HDFS', 'StarRocks'],
    deliverable: 'از ماشین خالی تا لایه‌ی دادهٔ آماده با یک اجرا — و اجرای دومی که هیچ چیزی را عوض نمی‌کند.',
    challenges: [{ id: 'w6-c1', status: 'draft' }],
  },
  {
    id: 7,
    code: 'W7',
    status: 'upcoming',
    phase: 'p3',
    title: 'باقی سیستم، و بدهی جاوا',
    summary: 'همان کار برای پردازش و سرویس‌ها — و کدی که باید تمیز شود.',
    mission:
      'همان کاری که برای لایه‌ی داده کردید حالا برای بقیه هم باید انجام شود: دریافت‌کننده، نویسنده‌ها، مکعب‌ساز و APIها باید از روی کدبیس، خودکار روی محیط بنشینند. در کنارش این هفته وقت پرداختن به بدهی جاواست: منطق‌هایی که بی‌دلیل پیچیده شده‌اند، خطاهایی که مدیریت نشده‌اند، و لاگی که وقتِ حادثه به درد نمی‌خورد. این بازه ممکن است از یک هفته بیشتر طول بکشد.',
    stack: ['Ansible', 'Helm', 'Spark', 'Kubernetes'],
    deliverable:
      'کل سیستم — از دریافت‌کننده تا API — با یک مسیر خودکار روی یک محیط تازه، و کدی که بشود جلوی یک غریبه بازش کرد.',
    challenges: [{ id: 'w7-c1', status: 'draft' }],
  },
  {
    id: 8,
    code: 'W8',
    status: 'upcoming',
    phase: 'p3',
    title: 'گزارش‌هایی که جوابشان یک کوئری نیست',
    summary: 'بخشی از این ترافیک تهاجم است؛ باید پیدایش کنید.',
    mission:
      'تا این‌جا از داده سؤال‌های ساده پرسیده‌اید. حالا سراغ گزارش‌هایی می‌رویم که با یک SELECT در نمی‌آیند: رفتارهایی مثل یک IP که در زمان کوتاه سراغ پورت‌های زیادی می‌رود، ارتباطی که ناگهان چند برابر می‌شود، یا الگویی که با بقیه‌ی شبکه جور نیست. برای هر گزارش باید تصمیم بگیرید از کدام مسیر بیاید — بلادرنگ یا تجمیعی — و چرا؛ و هزینه‌اش را بدانید. صورت دقیق گزارش‌ها همان هفته اعلام می‌شود.',
    stack: ['StarRocks', 'Spark', 'PostgreSQL'],
    deliverable: 'گزارش‌های هیوریستیک روی داده‌ی واقعی، با توضیحِ اینکه چرا از این مسیر و با این هزینه.',
    challenges: [{ id: 'w8-c1', status: 'draft' }],
  },
  {
    id: 9,
    code: 'W9',
    status: 'upcoming',
    phase: 'p3',
    title: 'یک سؤال، دو جواب — و دفاع آخر',
    summary: 'چرا دو مسیر به یک عدد نمی‌رسند، و چطور ثابتش می‌کنید.',
    mission:
      'همان سؤال را از هر دو مسیر بپرسید. جواب‌ها یکی نخواهند بود. این هفته باید بفهمید چرا، از چه لحظه‌ای به هم می‌رسند، کدام‌یک را باید به کاربر نشان داد، و چطور این را به کسی که به شما اعتماد کرده ثابت می‌کنید.',
    stack: ['StarRocks', 'PostgreSQL', 'Spark'],
    deliverable: 'توضیحِ قابل دفاعِ اختلاف دو مسیر روی داده‌ی واقعی، و ارائه‌ی نهایی.',
    milestone: {
      title: 'ارائه‌ی نهایی به TPMها',
      body: 'هرچه در نُه هفته ساخته‌اید را ارائه می‌دهید و از هر تصمیمی که گرفته‌اید دفاع می‌کنید.',
    },
    challenges: [{ id: 'w9-c1', status: 'draft' }],
  },
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
