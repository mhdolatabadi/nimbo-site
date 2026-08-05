// Wording for the admin console. Kept out of bootcamp.js on purpose: that file is week
// content, this file is operator UI.

export const ADMIN_TEXT = {
  navLabel: 'کنسول ادمین',
  hero: {
    eyebrow: 'کنسول',
    eyebrowMono: 'ADMIN CONSOLE',
    title: 'کنسول',
    titleAccent: 'ادمین',
    tagline: 'باز کردن هفته‌ی بعد و ریلیز چالش هفتگی. خروجی این‌جا ساخته می‌شود و با یک کامیت منتشر می‌شود.',
  },
  login: {
    title: 'ورود',
    note: 'این صفحه در منو نیست و فقط با آدرس مستقیم باز می‌شود.',
    user: 'نام کاربری',
    password: 'رمز',
    submit: 'ورود',
    error: 'نام کاربری یا رمز درست نیست.',
    insecure:
      'این قفل جلوی کنجکاوی بچه‌ها را می‌گیرد، نه بیشتر: سایت استاتیک است و رمز داخل باندل قابل پیدا شدن است. امنیت واقعی این است که محتوای منتشرنشده اصلاً در ریپو نیست تا وقتی خودت کامیتش کنی.',
  },
  console: {
    logout: 'خروج',
    weekPicker: 'هفته',
    statusLabel: 'وضعیت هفته',
    status: { locked: 'قفل', active: 'باز', completed: 'تمام‌شده' },
    lockedNote: 'هفته‌ی قفل هیچ محتوایی نمی‌گیرد؛ فیلدها وقتی وضعیت را «باز» کنی ظاهر می‌شوند.',
    fields: {
      title: 'عنوان هفته',
      summary: 'خلاصه (یک خط، روی نود تایم‌لاین)',
      mission: 'مأموریت',
      objectives: 'سنجه‌ها — هر خط یک مورد',
      stack: 'استک — با ویرگول جدا کن',
      deliverable: 'تحویلی هفته',
      resources: 'منابع — هر خط به شکل «عنوان | نشانی»',
    },
    challenge: {
      legend: 'چالش هفتگی',
      modes: {
        none: 'چالشی ندارد',
        sealed: 'مهروموم (روی تایم‌لاین دیده می‌شود، محتوایش نه)',
        released: 'منتشر شود',
      },
      title: 'عنوان چالش',
      releasedAt: 'تاریخ انتشار',
      deadline: 'مهلت (اختیاری)',
      body: 'متن چالش',
    },
    previewTitle: 'پیش‌نمایش زنده',
    previewNote: 'این دقیقاً همان چیزی است که بعد از کامیت دیده می‌شود.',
    outputTitle: 'خروجی برای bootcamp.js',
    outputNote: 'این تکه را در src/content/bootcamp.js جای‌گزین همان هفته در آرایه‌ی weeks کن، بعد کامیت و پوش.',
    copy: 'کپی',
    copied: 'کپی شد',
    reminder: 'یادت باشد: تا وقتی کامیت نکنی، هیچ‌کس این تغییر را نمی‌بیند.',
  },
};
