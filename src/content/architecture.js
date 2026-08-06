// The target architecture, laid out once and drawn at every week.
//
// `week` is the week that builds the block. The map paints anything from earlier weeks as
// already standing, the current week's blocks as new, and later weeks as ghosts — so each
// week you see exactly which piece of the system just came alive.
//
// Coordinates are viewBox units (900 × 650). To add a block, place it in the free space of
// its zone and give it the week that builds it; nothing else needs to change.

export const ARCH_TEXT = {
  flowZone: 'جریان داده',
  platformZone: 'بستر، تحویل و خودکارسازی',
  legend: {
    built: 'ساخته‌شده',
    fresh: 'همین هفته',
    future: 'هفته‌های بعد',
  },
};

const SPINE_X = 640;
const SPINE_W = 230;
const BOX_H = 66;

// Right zone: the data path, flowing top to bottom.
const spine = [
  { id: 'source', label: 'منبع داده', sub: 'Producer', week: 1 },
  { id: 'kafka', label: 'صف پیام', sub: 'Kafka', week: 1 },
  { id: 'writer', label: 'سرویس نویسنده', sub: 'Consumer', week: 1 },
  { id: 'storage', label: 'ذخیره‌ی خام', sub: 'HDFS · Parquet', week: 1 },
  { id: 'process', label: 'پردازش', sub: 'Spark', week: 2 },
  { id: 'curated', label: 'دادهٔ آماده', sub: 'Curated', week: 2 },
  { id: 'api', label: 'سرویس بیرونی', sub: 'API', week: 4 },
];

export const ARCH_NODES = [
  ...spine.map((node, i) => ({ ...node, x: SPINE_X, y: 44 + i * 86, w: SPINE_W, h: BOX_H, zone: 'flow' })),
  // Left zone: everything that carries, ships and rebuilds the data path.
  { id: 'containers', label: 'کانتینرها', sub: 'Docker · Compose', week: 1, x: 330, y: 90, w: 260, h: 80, zone: 'platform' },
  { id: 'cicd', label: 'خط تحویل', sub: 'Jenkins', week: 1, x: 40, y: 90, w: 260, h: 80, zone: 'platform' },
  { id: 'quality', label: 'دروازهٔ کیفیت', sub: 'SonarQube', week: 3, x: 330, y: 230, w: 260, h: 80, zone: 'platform' },
  { id: 'config', label: 'پیکربندی متمرکز', sub: 'Config', week: 3, x: 40, y: 230, w: 260, h: 80, zone: 'platform' },
  { id: 'monitoring', label: 'پایش', sub: 'Prometheus · Grafana', week: 4, x: 330, y: 370, w: 260, h: 80, zone: 'platform' },
  { id: 'cluster', label: 'کلاستر', sub: 'Kubernetes · Helm', week: 5, x: 40, y: 370, w: 260, h: 80, zone: 'platform' },
  { id: 'dataAuto', label: 'اتوماسیون لایهٔ داده', sub: 'Ansible', week: 6, x: 330, y: 510, w: 260, h: 80, zone: 'platform' },
  { id: 'appAuto', label: 'اتوماسیون پردازش', sub: 'Ansible · Helm', week: 7, x: 40, y: 510, w: 260, h: 80, zone: 'platform' },
];

// Each link belongs to the block it feeds, so it appears the week that block is built.
export const ARCH_EDGES = spine.slice(1).map((node, i) => ({ from: spine[i].id, to: node.id, week: node.week }));

export const ARCH_VIEWBOX = { width: 900, height: 650 };
