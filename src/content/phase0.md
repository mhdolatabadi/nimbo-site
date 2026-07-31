=== mission
title: مأموریت صفرم — آماده‌سازی محیط
tool: environment
time: ~۱.۵ ساعت
tag: محیط کارت باید لینوکسی باشه؛ ابزارها را نصب و تست دود بزن.
---
کل ابزارهای این فاز و کل دوره توی دنیای واقعی روی لینوکس اجرا می‌شن. پس قبل از هر چیز باید یه شل لینوکسیِ درست داشته باشی — بقیه‌ی مأموریت‌ها همه روی همین سواره.

- **لینوکس داری؟** همین رو استفاده کن. اگه نه، یه توزیع مثل Ubuntu رو کنار ویندوز `dual-boot` کن یا داخل ماشین مجازی (VirtualBox / VMware) بالا بیار.
- **ویندوز + WSL2:** حتماً از Windows Subsystem for Linux استفاده کن — نه CMD، نه PowerShell، نه Git Bash. یه Ubuntu روی WSL نصب کن و همه‌ی کارها رو داخل همون ترمینال انجام بده. Docker Desktop رو هم نصب کن و تیک «WSL2 integration» رو بزن.

> ⚑ قانون فاز: هر دستوری که این‌جا می‌بینی باید داخل یه شل لینوکسی اجرا شه — لینوکس واقعی یا Ubuntu روی WSL2. روی macOS هم اکثر چیزها یکیه (فقط جای `apt` می‌شه `brew`).

```PowerShell (Admin)
> wsl --install
```

بعد ری‌استارت کن، Ubuntu از منوی استارت باز می‌شه، یوزرنیم/پسورد بساز. حالا این‌ها رو نصب کن: `Git` · `Docker` · `JDK 17` · Editor (ترجیحاً IntelliJ).

> ◎ نسخه‌ی JDK رو با نسخه‌ی پروژه‌ی واقعیِ دوره یکی نگه‌دار (این‌جا فرض ۱۷). اگه دوره نسخه‌ی دیگه‌ای می‌خواد، همه‌جای این فاز رو همون بذار تا بعداً سردرگم نشی.

حالا تست دود را داخل شل لینوکسی‌ت بزن — هر چهار تا باید بدون خطا جواب بدن:

```smoke test
$ docker run hello-world
$ docker compose version
$ git --version
$ java -version
```

## خودت رو ارزیابی کن
- چرا اصرار داریم همه‌چی داخل شل لینوکسی (WSL2) اجرا شه نه PowerShell؟ فردا که اسکریپت نصب می‌نویسی این چه فرقی می‌ذاره؟
- `docker run hello-world` دقیقاً چی‌کار کرد و اون image از کجا اومد؟

## منابع
- [راهنمای رسمی WSL](https://learn.microsoft.com/windows/wsl/install)

=== mission
title: مأموریت اول — داکِر
tool: docker
time: ~۲ ساعت
tag: تفاوت image و container رو بگیری، ۸۰٪ داکر رو گرفتی.
---
- **image** یه «قالبِ فقط‌خواندنی» و ثابته (مثل کلاس).
- **container** یه نمونه‌ی در حال اجرا از اون قالبه (مثل object).

`Dockerfile` دستورالعمل ساختِ image و لایه‌لایه‌ست؛ داکر لایه‌ها رو cache می‌کنه — برای همین اگه فقط کد عوض شه، لایه‌های نصب وابستگی دوباره ساخته نمی‌شن.

**قدم‌به‌قدم:** یه Dockerfile چندمرحله‌ای (multi-stage) برای اپ جاوا بنویس — یه مرحله برای بیلد با Maven، یه مرحله‌ی سبک فقط برای اجرا تا ایمیج نهایی کوچیک بمونه:

```Dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn -q clean package

FROM eclipse-temurin:17-jre
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

می‌بینی که این‌جا از `mvn` استفاده کردیم؟ نگرانش نباش — میون رو مأموریت چهارم عمیق می‌شیم؛ فعلاً همین‌قدر که بدونی `mvn package` یه jar از پروژه می‌سازه کافیه.

بعد با `compose` یه استک بالا بیار (همون شکل سحابینو: اپ + Kafka + Postgres). داخل کانتینر برو (`docker exec -it <name> bash`)، شبکه رو `docker network inspect` کن، و یه `healthcheck` اضافه کن.

> ◎ **تمرین اصلی:** `docker compose up` که کار کنه؛ و بتونی توضیح بدی چرا multi-stage ایمیج رو کوچیک کرد و چطور layer cache یه rebuild رو سریع کرد.

## خودت رو ارزیابی کن
- چرا multi-stage ایمیج نهایی رو کوچیک کرد؟ چی توی مرحله‌ی build هست که توی ایمیج نهایی نیست؟
- اگه فقط یه خط کد عوض شه، کدوم لایه‌های Dockerfile دوباره ساخته می‌شن و کدوم از cache میان؟
- فرق `docker run` و `docker exec` چیه؟

## منابع
- [«Get started» رسمی داکر](https://docs.docker.com/get-started/)
- [محیط تمرین آنلاین (بدون نصب)](https://labs.play-with-docker.com)

=== mission
title: مأموریت دوم — گریت و گیت
tool: git · gerrit
time: ~۳ ساعت
tag: سنگین‌ترین مأموریت فاز — گیت رو در دلِ گریت یاد می‌گیری.
---
واحدِ کارِ گریت «commit» نیست، «change» است — یه صفحه‌ی بازبینیِ مستقل. اما زیرِ پوست، هر change دقیقاً یه commitِ گیته. پس نمی‌شه گریت رو لمس کرد بدون اینکه گیت زیر دستت روون باشه. برای همین این مأموریت رو دو تیکه می‌ریم: **اول گیتی که گریت لازمش داره، بعد خودِ گریت روی همون.**

## A) گیت — پایه‌ای که گریت روش سواره
سه ناحیه‌ای که فهمیدنشون کلیدِ همه‌چیزه: **Working Directory** (فایل‌هایی که الان ویرایش می‌کنی) ← با `git add` می‌ری به **Staging** ← با `git commit` می‌ری به **History** (یه اسنپ‌شات ثابت با شناسه‌ی یکتا).

```git basics
$ git init myrepo && cd myrepo
$ echo "hello" > a.txt
$ git status            # فایلِ untracked
$ git add a.txt         # بردن به staging
$ git commit -m "first" # ثبت دائمی
$ git log --oneline     # تاریخچه
```

حالا برنچ و ادغام رو حس کن:

```branch & merge
$ git switch -c feature  # برنچ جدید بساز و برو روش
# ... یه تغییر بده و commit کن ...
$ git switch main
$ git merge feature      # ادغام
```

و حالا چهار عملیاتی که **مستقیماً** توی بخش گریت لازمشون داری — این چهارتا رو همین‌جا خوب تمرین کن:

- **amend** — `git commit --amend` آخرین کامیت رو «ویرایش» می‌کنه به‌جای ساختن کامیت جدید. این قلبِ کار با گریته: هر بار کد رو اصلاح می‌کنی، amend می‌زنی تا همون change به‌روز شه.
- **rebase (interactive)** — `git rebase -i` کامیت‌های شلخته‌ت رو تمیز و squash می‌کنه، قبل از اینکه بفرستی‌شون برای review.
- **reset در برابر revert** — reset تاریخچه رو عقب می‌بره (خطرناک، مخصوصاً `--hard`)؛ revert یه کامیت جدید می‌سازه که اثر کامیت قبلی رو خنثی می‌کنه (امن).
- **حل conflict** — عمداً یه تعارض بساز (توی دو برنچ یه خط رو جور دیگه عوض کن و merge کن) و دستی حلش کن.

## B) گریت — روی همون گیت
**۱) بالا آوردن با داکر.** اولین کاربری که لاگین کنه، ادمین می‌شه. برای اینکه پروژه‌ها و هوک‌هات با ری‌استارت نپرن، داده رو روی volume نگه‌دار:

```gerrit
$ docker run -d --name gerrit \
    -p 8080:8080 -p 29418:29418 \
    -v gerrit-git:/var/gerrit/git \
    -v gerrit-index:/var/gerrit/index \
    -v gerrit-cache:/var/gerrit/cache \
    gerritcodereview/gerrit
```

> ▲ بدون این `-v`ها، اگه کانتینر ری‌استارت شه وسطِ کار، پروژه‌ها و هوکِ commit-msg می‌پرن و باید از اول شروع کنی. چند دقیقه صبر کن تا پیام «Gerrit Code Review NNN ready» بیاد، بعد برو `http://localhost:8080`.

**۲) پروژه بساز، کلونش کن، و هوکِ `commit-msg` رو نصب کن.** این هوک همونیه که خودکار `Change-Id` رو ته پیام کامیت می‌ذاره (گریت موقع کلون دستور دقیقش رو نشونت می‌ده):

```commit-msg hook
$ gitdir=$(git rev-parse --git-dir)
$ curl -Lo $gitdir/hooks/commit-msg \
    http://localhost:8080/tools/hooks/commit-msg
$ chmod +x $gitdir/hooks/commit-msg
```

**۳) تغییر بده، commit کن، و با push مخصوص گریت بفرست:**

```push for review
$ git push origin HEAD:refs/for/master
```

چرا `refs/for/master` و نه `refs/heads/master`؟ چون داری می‌گی «این رو برای بازبینی روی برنچ master بفرست»، نه «مستقیم روی master بنشون». این قلبِ مدل گریته.

**۴) توی UI:** یه reviewer اضافه کن، روی خطوط کد inline comment بذار، reply کن و بعضی‌ها رو Resolved علامت بزن.

**۵) اینجا گیت به دادت می‌رسه:** کد رو اصلاح کن، `git commit --amend` بزن (به `Change-Id` دست نزن!)، دوباره push کن ← ببین **Patch Set 2** ساخته می‌شه، نه یه change جدید. توی UI می‌تونی Patch Set 1 و 2 رو با هم diff (interdiff) کنی.

**۶)** به‌عنوان ادمین بهش `+2` بده و Submit کن؛ ببین merge می‌شه.

> ◎ **تمرین اصلی:** یه change رو کامل از comment تا amend تا +2 و submit رد کن. **امتیازی:** دو change وابسته روی هم بساز (relation chain) و ببین گریت زنجیره‌ی وابستگی‌شون رو چطور نشون می‌ده — این دقیقاً همون تاریخچه‌ی خطیِ گیته که توی بخش A ساختی.

## خودت رو ارزیابی کن
- اگه وسط کار `Change-Id` رو دستی از پیام کامیت پاک کنی و push کنی، گریت چی‌کار می‌کنه و چرا؟
- فرقِ «یک change با ۳ patch set» و «۳ change جدا» چیه؟ کدوم رو `git commit --amend` می‌سازه و کدوم رو `git commit` جدید؟
- چرا `refs/for/master` نه `refs/heads/master`؟ اگه اشتباهی دومی رو بزنی چه اتفاقی می‌افته؟

## منابع
- [راهنمای کاربر گریت (همین workflow)](https://gerrit-review.googlesource.com/Documentation/intro-user.html)
- [بازی تعاملی branch/merge/rebase](https://learngitbranching.js.org)
- [کتاب Pro Git (فارسی) — فصل‌های ۲ و ۳](https://git-scm.com/book/fa/v2)
- [ایمیج رسمی گریت روی داکر](https://hub.docker.com/r/gerritcodereview/gerrit)

=== mission
title: مأموریت سوم — بَش
tool: bash
time: ~۱.۵ ساعت
tag: شل فقط «خط فرمان» نیست؛ یه زبونِ برنامه‌نویسیه.
---
ایده‌ی مرکزیش: هر دستور یه جریان متن تولید می‌کنه، و تو با `|` (pipe) خروجی یکی رو می‌دی خوراکِ بعدی. سر دوره کلی اسکریپتِ نصب زیرساخت می‌نویسید، پس این عضله باید گرم باشه.

یه فایل بساز و اولش این خط (shebang) رو بذار، یعنی «این فایل رو با bash اجرا کن»:

```test.sh
#!/usr/bin/env bash
set -euo pipefail   # خط طلا: با اولین خطا متوقف شو، متغیر تعریف‌نشده = خطا

DIR="$1"            # اولین آرگومانی که موقع صدا زدن اسکریپت می‌دی
echo "Processing Directory $DIR"

for f in "$DIR"/*.log; do
  errors=$(grep -c "ERROR" "$f")   # خروجی دستور رو می‌ریزه توی متغیر
  echo "$f -> $errors خطا"
done
```

```run
$ chmod +x ./test.sh   # قابل اجرا کن
$ ./test.sh /var/log
```

این‌جا `grep -c` تعداد خطوط شامل ERROR رو می‌شمره. با `awk` می‌تونی حرفه‌ای‌ترش کنی.

> ◎ **تمرین اصلی:** یه اسکریپت `logwatch.sh` بنویس که پوشه‌ی لاگ رو بگیره و تعداد ERROR/WARN/INFO رو خلاصه چاپ کنه. (آشنا نیست؟ این همون File Ingester سحابینوئه، این بار در bash!) **امتیازی:** حالت `--watch` که هر چند ثانیه پوشه رو نگاه کنه و فایل جدید رو پردازش کنه.

## خودت رو ارزیابی کن
- `set -euo pipefail` هر تیکه‌ش چی‌کار می‌کنه و چرا بهش می‌گن «خط طلا»؟
- `grep -c` چی برمی‌گردونه؟ اگه بخوای خودِ خطوطِ ERROR رو ببینی نه تعدادشون، چی عوض می‌شه؟

## منابع
- [The Missing Semester (MIT) — درس‌های ۱ و ۲](https://missing.csail.mit.edu)
- [explainshell — هر دستوری رو تیکه‌تیکه توضیح می‌ده](https://explainshell.com)
- [shellcheck — اشکالات اسکریپتت رو می‌گیره](https://www.shellcheck.net)

=== mission
title: مأموریت چهارم — مِیوِن
tool: maven
time: ~۱ ساعت
tag: ابزار بیلد و مدیریت وابستگیِ جاوا.
---
Maven دو کار اصلی می‌کنه: (۱) کتابخونه‌هایی که کدت لازم داره رو خودکار از یه مخزن دانلود می‌کنه (سر دوره این مخزن Nexus داخلیه)، و (۲) پروژه رو طی یه چرخه‌ی حیات استاندارد می‌سازه. همه‌چی توی `pom.xml` تعریف می‌شه.

فازهای مهمِ چرخه‌ی حیات رو حفظ نکن، حسشون کن — هر کدوم قبلی‌ها رو هم اجرا می‌کنه: validate ← compile ← test ← package ← verify ← install.

```maven
$ mvn compile          # فقط کامپایل
$ mvn test             # کامپایل + اجرای تست‌ها
$ mvn package          # توی /target یه jar می‌سازه
$ mvn dependency:tree  # درخت وابستگی‌ها — خیلی آموزنده‌ست
```

مفاهیمی که باید بفهمی: تفاوتِ `package` و `install` (اولی jar می‌سازه، دومی همون رو توی مخزن محلیِ خودت هم می‌ذاره تا پروژه‌های دیگه‌ات ببیننش)، `scope` وابستگی‌ها (compile / provided / test)، و اینکه یه پلاگین (مثل shade) چطور یه **fat jar** (jar شاملِ همه‌ی وابستگی‌ها) می‌سازه که با `java -jar` مستقیم اجرا شه.

> ◎ **تمرین اصلی:** روی همون پروژه‌ی جاوا یه dependency اضافه کن، یه fat jar بساز، و `mvn dependency:tree` رو بخون و بفهم هر کتابخونه از کجا اومده. (یادت باشه همین `mvn package` بود که مأموریت داکر توی Dockerfile ازش استفاده کرد.)

## خودت رو ارزیابی کن
- فرقِ عملیِ `mvn package` و `mvn install` کجا خودش رو نشون می‌ده؟ کِی واقعاً به install نیاز داری؟
- یه dependency با `scope=test` چرا توی jar نهایی نمیاد؟
- fat jar با jar معمولی چه فرقی داره که با `java -jar` مستقیم بالا میاد؟

## منابع
- [Maven in 5 Minutes (رسمی)](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
- [راهنمای شروع رسمی](https://maven.apache.org/guides/getting-started/)

=== mission
title: مأموریت پنجم — جِنکینز
tool: jenkins
time: ~۲.۵ ساعت
tag: سرورِ CI که همه‌ی ابزارهای قبلی رو به هم گره می‌زنه.
---
**CI یعنی چی؟** به‌جای اینکه دستی build و test کنی، یه سرور این کار رو با هر تغییرِ کد خودکار انجام می‌ده و اگه چیزی خراب شد، فوری خبر می‌ده. هدفِ نهاییِ این مأموریت اینه: هر push به گریت، خودکار build و تست شه — یعنی گریتِ مأموریت قبل رو به جنکینز وصل کنیم.

کارِ جنکینز رو با یه فایل به اسم `Jenkinsfile` توی ریپوت تعریف می‌کنی (بهش می‌گن pipeline-as-code).

## ۱) بالا آوردن

```jenkins
$ docker run -d --name jenkins \
    -p 8090:8080 -p 50000:50000 \
    -v jenkins_home:/var/jenkins_home \
    jenkins/jenkins:lts
```

پورتِ جنکینز رو `8090` گذاشتیم تا با گریتِ روی `8080` تداخل نکنه. پسوردِ ادمینِ اولیه رو از لاگ‌ها بردار، بعد پلاگین‌های پیشنهادی رو نصب کن:

```initial admin password
$ docker logs jenkins 2>&1 | grep -A2 password
```

## ۲) کالبدشناسیِ pipeline
ساختارِ declarative خیلی خواناست. یه job از نوع Pipeline بساز و این Jenkinsfile رو بهش بده:

```Jenkinsfile
pipeline {
  agent any                 // کجا اجرا شه
  stages {                  // مراحلِ کار
    stage('Build') { steps { sh 'mvn -q clean package -DskipTests' } }
    stage('Test')  { steps { sh 'mvn test' } }
  }
  post {                    // بعد از اتمام، مهم‌ترین بخش
    always  {
      junit 'target/surefire-reports/*.xml'       // گزارش تست‌ها
      archiveArtifacts artifacts: 'target/*.jar'   // نگه‌داشتن خروجی
    }
    success { echo 'سبز شد' }
    failure { echo 'یه چیزی خراب شد' }
  }
}
```

- `agent` می‌گه روی چه ماشین/محیطی اجرا شه.
- `stages` مراحلِ پشت‌سرهمِ کارن؛ هر stage چند step داره.
- `post` بعد از تموم شدن اجرا می‌شه: `always` همیشه (برای publish گزارش)، `success`/`failure` فقط در آن حالت.

بعد گسترشش بده: از `when` برای اجرای شرطیِ یه stage و از `parallel` برای موازی‌کردن استفاده کن.

> ▲ گاتچا: اگه توی pipeline بخوای `sh 'docker build ...'` بزنی، داخل کانتینرِ جنکینز به‌طور پیش‌فرض داکر نیست. باید سوکتِ داکر میزبان رو مانت کنی: `-v /var/run/docker.sock:/var/run/docker.sock`.

## ۳) وصل‌کردن به گریت — حلقه بسته می‌شه
این تیکه‌ی طلاییِ فازه: پلاگینِ **Gerrit Trigger** رو نصب کن و به گریتِ مأموریت قبل وصلش کن (روی پورتِ SSH یعنی `29418`، با یه یوزر). ترتیبش:

1. توی Manage Jenkins یه Gerrit server اضافه کن (آدرس، پورت 29418، یوزر و کلید).
2. روی job، تریگر رو بذار روی رویدادِ `patchset-created` برای `refs/for/**`.
3. تنظیم کن که بعد از build نتیجه رو به‌صورت رأیِ **Verified (+1/-1)** روی همون change برگردونه.

حالا هر بار به گریت push کنی ← جنکینز خودکار build و test می‌کنه ← رأی Verified می‌ذاره روی change. حالا دو ابزارِ اصلیِ دوره با هم حرف می‌زنن.

> ◎ **تمرین اصلی:** یه pipeline که اپ جاوا رو build و test کنه و گزارش تست رو نشون بده. **امتیازی:** حلقه‌ی گریت←جنکینز←رأی Verified رو کامل راه بنداز.

## خودت رو ارزیابی کن
- فرقِ `always`، `success` و `failure` توی بلوکِ `post` چیه؟ گزارشِ تست رو کدوم باید publish کنه و چرا؟
- چرا `sh 'docker build'` داخل کانتینرِ جنکینز به‌طور پیش‌فرض کار نمی‌کنه؟
- توی حلقه‌ی گریت←جنکینز، رأیِ **Verified** از کجا میاد و فرقش با رأیِ **Code-Review (+2)** چیه؟

## منابع
- [«اولین Pipeline» رسمی جنکینز](https://www.jenkins.io/doc/pipeline/tour/hello-world/)
- [کتاب Pipeline رسمی](https://www.jenkins.io/doc/book/pipeline/)
- [پلاگین Gerrit Trigger](https://plugins.jenkins.io/gerrit-trigger/)
