=== mission
title: مأموریت صفرم — آماده‌سازی محیط
tool: environment · linux
time: ~۱.۵ ساعت
tag: قبل از ابزارها، باید بدانی دقیقاً داخل کدام Linux Shell کار می‌کنی.
---
کل ابزارهای این فاز روی لینوکس اجرا می‌شن. پس خروجی این مأموریت فقط «چند برنامه نصب شد» نیست؛ باید یه محیط لینوکسی مشخص، یه مسیر کاری مرتب و چند دستور پایه داشته باشی که زیر دستت روان باشن.

:::widget environment-path

اگه روی Windows هستی، نصب WSL2 رو از PowerShell با دسترسی Administrator شروع کن؛ بعد از نصب، ادامه‌ی مأموریت داخل Ubuntu انجام می‌شه.

```PowerShell — فقط برای نصب WSL
> wsl --install
```

بعد از restart، Ubuntu رو باز کن و username/password بساز. از این‌جا به بعد prompt تو باید شبیه یک Shell لینوکسی باشه، نه `C:\...>`.

## ۱) قبل از نصب ابزارها، با فایل‌سیستم آشنا شو

دستورهای `pwd`، `ls`، `mkdir`، `cd`، `touch`، `cat`، `nano`، `rm` و `sudo` پایه‌ی همه‌ی مأموریت‌های بعدی‌اند. این‌ها رو از حالت فهرست حفظی خارج کن:

:::widget linux-shell-lab

حالا یک workspace واقعی بساز و مسیر را با دست خودت طی کن:

```تمرین فایل‌سیستم
$ mkdir -p ~/nimbo/phase0
$ cd ~/nimbo/phase0
$ pwd
$ touch notes.txt
$ echo "phase zero ready" > notes.txt
$ cat notes.txt
$ ls -la
```

> ▲ `rm` سطل بازیافت نداره و `sudo` سطح دسترسی رو بالا می‌بره. هیچ‌کدوم رو بدون فهمیدن مسیر و دستور اجرا نکن.

## ۲) ابزارهای دوره رو نصب و مسیر اجرای اون‌ها رو تست کن

این ابزارها باید داخل همون محیط لینوکسی در دسترس باشن: `Git`، `Docker`، `Docker Compose`، `JDK 17` و یک Editor یا IDE. روی Windows، Docker Desktop باید WSL2 integration رو برای Ubuntu فعال کرده باشه.

> ◎ نسخه‌ی JDK رو با پروژه‌ی واقعی دوره یکی نگه‌دار. این فاز `17` رو فرض می‌کنه؛ اگه پروژه نسخه‌ی دیگه‌ای داره، همه‌جا همون نسخه رو استفاده کن.

:::widget tool-smoke-test

هر تست رو واقعاً در Shell اجرا کن. فقط دیدن شماره‌ی نسخه کافی نیست؛ خروجی باید نشون بده ابزار از همین محیط قابل دسترسیه و مسیر ساده‌ی اجرای اون سالمه.

## خروجی مأموریت

- یک Shell لینوکسی مشخص داری و می‌تونی توضیح بدی Linux واقعی، WSL2 و VM چه فرقی دارن.
- workspace دوره در `~/nimbo` ساخته شده.
- دستورهای پایه‌ی فایل‌سیستم رو روی فایل آزمایشی اجرا کردی.
- چهار smoke test بدون خطا اجرا شدن و نسخه‌ی Java با پروژه هماهنگه.

## خودت رو ارزیابی کن
- چرا بعد از نصب WSL، دستورهای دوره رو داخل Ubuntu اجرا می‌کنیم نه PowerShell یا Git Bash؟
- فرق `pwd`، `ls` و `cd` چیه؟ هرکدوم درباره‌ی مسیر چه اطلاعات یا تغییری ایجاد می‌کنه؟
- `touch` چه‌کار می‌کنه و `cat` چه‌کار می‌کنه؟
- چرا باید قبل از `rm` و مخصوصاً قبل از `sudo rm` مسیر فعلی رو با `pwd` چک کنی؟
- `docker run hello-world` فقط وجود command داکر رو تست می‌کنه یا ارتباط CLI، engine، registry و container runtime رو هم درگیر می‌کنه؟
- چرا برای اطمینان از نصب JDK، دیدن `javac -version` از `java -version` کامل‌تره؟

## منابع
- [راهنمای رسمی نصب WSL](https://learn.microsoft.com/windows/wsl/install)
- [آموزش خط فرمان Ubuntu](https://ubuntu.com/tutorials/command-line-for-beginners)
- [راهنمای رسمی نصب Docker Engine](https://docs.docker.com/engine/install/)

=== mission
title: مأموریت اول — داکِر
tool: docker
time: ~۲ ساعت
tag: Image، Container، Layer، Network و Volume رو به‌عنوان یک سیستم ببین.
---
Docker فقط یه دستور برای «بالا آوردن برنامه» نیست. باید بفهمی از روی Dockerfile چطور image ساخته می‌شه، container چه چیزی به اون اضافه می‌کنه، cache کجا زمان build رو نجات می‌ده و Compose چطور چند سرویس رو به یک stack تبدیل می‌کنه.

:::widget docker-mental-model

- **image** قالبی فقط‌خواندنی و لایه‌ایه که می‌تونی بارها از روش container بسازی.
- **container** یک نمونه‌ی اجرایی با process و writable layer خودشه.
- حذف container الزاماً image رو حذف نمی‌کنه؛ همون image می‌تونه نمونه‌ی تازه بسازه.

## ۱) Dockerfile چندمرحله‌ای بساز

برای پروژه‌ی Java، ابزار build نباید وارد image نهایی بشه. `pom.xml` رو قبل از source کپی کن تا وقتی فقط کد عوض می‌شه، لایه‌ی dependencyها از cache بیاد:

```Dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -B dependency:go-offline
COPY src ./src
RUN mvn -q -B package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
```

:::widget docker-layer-explorer

حالا image رو بساز و lifecycle یک container رو واقعاً اجرا کن:

```build & run
$ docker build -t nimbo-app:1 .
$ docker image ls
$ docker run -d --name nimbo-app -p 8080:8080 nimbo-app:1
$ docker ps
$ docker logs -f nimbo-app
$ docker exec -it nimbo-app sh
$ docker stop nimbo-app
$ docker rm nimbo-app
```

> ◎ `docker run` یک container تازه می‌سازه و process اصلیش رو اجرا می‌کنه؛ `docker exec` داخل یک container در حال اجرا، process تازه‌ای مثل `sh` باز می‌کنه.

## ۲) با Compose یک stack بساز

استک تمرین شامل `app + Kafka + Postgres` باشه. تنظیمات سرویس‌ها رو در `compose.yaml` نگه‌دار و برای داده‌های stateful از volume استفاده کن.

:::widget docker-compose-map

مسیر بررسی stack:

```compose workflow
$ docker compose up -d --build
$ docker compose ps
$ docker compose logs -f app
$ docker compose exec app sh
$ docker network ls
$ docker network inspect <project>_default
$ docker volume ls
$ docker compose down
```

داخل container اپ بررسی کن که سرویس‌ها با hostnameهای Compose پیدا می‌شن؛ مثلاً `postgres:5432` و `kafka:9092`. برای Postgres و Kafka volume پایدار بذار و حداقل برای سرویس‌هایی که startup زمان‌بر دارن healthcheck تعریف کن.

> ▲ `docker compose down` containerها و network پیش‌فرض رو حذف می‌کنه، اما named volumeها رو نگه می‌داره. `docker compose down -v` داده‌ی volumeها رو هم پاک می‌کنه.

## تمرین اصلی

1. image پروژه رو دو بار build کن؛ بار دوم فقط یک خط source رو تغییر بده و logهای `CACHED` و rebuild رو مقایسه کن.
2. container اپ رو run، stop و remove کن و بعد ثابت کن image هنوز وجود داره.
3. stack سه‌سرویسی رو با Compose بالا بیار و وضعیت health هر سرویس رو در `docker compose ps` ببین.
4. داخل container اپ برو و اتصال شبکه‌ای به Postgres و Kafka رو با hostname سرویس‌ها بررسی کن.
5. stack رو recreate کن و مطمئن شو داده‌ی volume باقی مونده.

## خودت رو ارزیابی کن
- فرق image و container فقط «کلاس و object» است یا از نظر read-only layer، writable layer و process هم می‌تونی توضیحش بدی؟
- چرا مرحله‌ی build شامل Maven و source است، ولی image نهایی فقط JRE و jar را نگه می‌دارد؟
- اگر فقط فایل source عوض شود، چرا لایه‌ی `dependency:go-offline` می‌تواند از cache بیاید؟
- اگر `pom.xml` عوض شود، کدام لایه‌ها باید دوباره ساخته شوند و چرا؟
- فرق `docker build`، `docker run` و `docker exec` چیست؟
- Compose network چه مشکلی را حل می‌کند و چرا داخل app به‌جای `localhost` از hostname سرویس استفاده می‌کنی؟
- volume چه تفاوتی با writable layer خود container دارد؟
- running بودن container با healthy بودن سرویس چه فرقی دارد؟

## منابع
- [Get started رسمی Docker](https://docs.docker.com/get-started/)
- [راهنمای Dockerfile و build cache](https://docs.docker.com/build/cache/)
- [راهنمای رسمی Docker Compose](https://docs.docker.com/compose/)
- [محیط تمرین آنلاین Play with Docker](https://labs.play-with-docker.com)

=== mission
title: مأموریت دوم — گریت و گیت
tool: git · gerrit
time: ~۳ ساعت
tag: سنگین‌ترین مأموریت فاز — گیت رو در دلِ گریت یاد می‌گیری.
---
واحدِ کارِ گریت فقط `commit` نیست، **change** است — یه صفحه‌ی مستقل برای بازبینی، گفت‌وگو و نسخه‌های مختلفِ یک تغییر. اما زیرِ پوست هر change، کامیت‌های گیته. پس اول گیتی رو تمرین می‌کنی که برای فهمیدن گریت لازمه؛ بعد workflow گریت رو توی دو ویدئو دنبال می‌کنی.

## A) گیت — پایه‌ای که گریت روش سواره

:::widget git-file-flow

حالا همین مسیر رو واقعاً اجرا کن. بعد از هر دستور `git status` بزن و قبل از دیدن خروجی، حدس بزن فایل کجاست و چه وضعیتی داره.

```git basics
$ git init myrepo && cd myrepo
$ echo "hello" > a.txt
$ git status            # untracked در Working Directory
$ git add a.txt         # نسخه‌ی فعلی وارد Staging می‌شه
$ git commit -m "first" # snapshot وارد History می‌شه
$ git log --oneline
```

:::widget git-repo-map

برای دیدن اتصال‌های مخزن و branchهای محلی از این دو دستور استفاده کن:

```local & remote
$ git remote -v
$ git branch -vv
```

حالا branch و merge رو حس کن. `git switch` برای ساختن و جابه‌جایی بین branchها خواناتر از `git checkout` قدیمیه.

```branch & merge
$ git switch -c feature
# ... یه تغییر بده و commit کن ...
$ git switch main
$ git merge feature
```

:::widget git-operations

این چهارتا رو فقط نخون؛ برای هرکدوم یه آزمایش کوچک بساز. مخصوصاً conflict رو عمداً ایجاد کن تا علامت‌های `<<<<<<<` و `>>>>>>>` رو با دست حل کنی.

```تمرین عملیات
$ git commit --amend --no-edit
$ git rebase -i HEAD~3
$ git reset --soft HEAD~1
$ git revert <commit-id>
```

> ◎ در حد آشنایی، GitHub Flow و GitLab Flow رو هم ببین: هر دو معمولاً تغییر رو روی branch جدا می‌سازن و بعد وارد review/merge می‌کنن. توی Gerrit محورِ review مستقیماً **Change** و نسخه‌های مختلف همون تغییره.

## B) گریت — workflow رو در ویدئو ببین
لازم نیست Gerrit رو نصب یا با Docker بالا بیاری. این بار به‌جای ساختن سرور، workflow واقعی رو در دو ویدئو می‌بینی و مراحلش رو به Git بخش قبل وصل می‌کنی.

:::widget gerrit-videos

قبل از تماشا، مدل Change و Patch Set رو با این مقایسه روشن کن:

:::widget gerrit-model

هنگام دیدن ویدئوها، هر مرحله رو روی این مسیر پیدا کن. روی کارت‌ها بزن تا ببینی در Git چه اتفاقی می‌افته و Gerrit چه چیزی نشون می‌ده.

:::widget gerrit-workflow

به این نکته‌ها دقت کن:

- push مخصوص review معمولاً به شکل `git push origin HEAD:refs/for/master` انجام می‌شه. `refs/for/master` یعنی «برای بازبینی روی master بفرست»، نه «مستقیم روی branch واقعی master بنویس».
- موقع اصلاح، `git commit --amend` بزن و به `Change-Id` دست نزن. commit hash عوض می‌شه، ولی Gerrit با Change-Id ثابت می‌فهمه باید Patch Set جدید بسازه.
- توی UI دنبال reviewer، inline comment، reply، وضعیت Resolved، مقایسه‌ی Patch Setها و Relation Chain بگرد.
- Submit مرحله‌ایه که Change تأییدشده رو وارد branch مقصد می‌کنه؛ push اولیه فقط اون رو وارد صف review می‌کنه.

> ◎ **تمرین اصلی:** بعد از دو ویدئو، workflow رو با زبان خودت بازنویسی کن و کنار هر مرحله بنویس در Git چه اتفاقی افتاده و در Gerrit چه چیزی دیده شده.

> ◎ **تمرین امتیازی:** رابطه‌ی دو commit پشت‌سرهم رو با دو Change وابسته مقایسه کن. Relation Chain در Gerrit در اصل همون تاریخچه‌ی خطی Git رو نمایش می‌ده.

## خودت رو ارزیابی کن
- tracked چرا یک ناحیه مثل Staging نیست؟ یک فایل tracked در چه وضعیت‌هایی می‌تونه باشه؟
- فرقِ local، remote و origin چیه؟ چرا origin فقط یه alias است؟
- `git add` دقیقاً کدام نسخه از فایل را برای commit بعدی آماده می‌کند؟
- `git switch` چه فرقی با `git checkout` داره؟
- چرا `git commit --amend` commit hash رو عوض می‌کنه؟
- فرقِ «یک Change با ۳ Patch Set» و «۳ Change جدا» چیه؟ کدوم رو amend می‌سازه و کدوم رو commit جدید؟
- اگه `Change-Id` رو از پیام commit پاک یا عوض کنی، چرا Gerrit ممکنه اصلاح رو ادامه‌ی Change قبلی ندونه؟
- چرا `refs/for/master` نه `refs/heads/master`؟
- فرق `+1` و `+2` چیه و Submit دقیقاً چه زمانی انجام می‌شه؟

## منابع
- [ویدئوی Gerrit — بخش اول](https://www.youtube.com/watch?v=icmCXVJfC_k)
- [ویدئوی Gerrit — بخش دوم](https://www.youtube.com/watch?v=OL7TldzyXtY)
- [راهنمای کاربر گریت](https://gerrit-review.googlesource.com/Documentation/intro-user.html)
- [بازی تعاملی branch/merge/rebase](https://learngitbranching.js.org)
- [کتاب Pro Git (فارسی) — فصل‌های ۲ و ۳](https://git-scm.com/book/fa/v2)

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
