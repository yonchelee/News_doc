/* SVG 일관성 생성기 — 80개 제품 모두 동일한 비주얼 컨테이너로 정규화
 * 출력: dashboard/img/<slug>.svg (제품마다 한 개)
 * data.js의 imageUrl 필드 갱신 (Wikipedia URL → 로컬 SVG 경로)
 */
const fs = require("fs");
const path = require("path");

const DASHBOARD = process.argv[2] || "dashboard";
const OUT_IMG = path.join(DASHBOARD, "img");
fs.mkdirSync(OUT_IMG, { recursive: true });

// ---- data.js 모듈로 평가 ----
const code = fs.readFileSync(path.join(DASHBOARD, "data.js"), "utf8");
const tmp = "/tmp/_gen_svg_eval_" + Date.now() + ".js";
fs.writeFileSync(tmp, code + ";module.exports = { CATEGORIES, MANUFACTURERS, PRODUCTS };");
const { CATEGORIES, MANUFACTURERS, PRODUCTS } = require(tmp);
fs.unlinkSync(tmp);

// ---- 제조사 브랜드 색상 ----
const BRAND = {
  apple:     { bg: "#f5f5f7", accent: "#1d1d1f", ink: "#1d1d1f" },
  samsung:   { bg: "#f0f3fa", accent: "#1428a0", ink: "#0a1647" },
  xiaomi:    { bg: "#fff4e6", accent: "#ff6900", ink: "#5a2400" },
  google:    { bg: "#e8f0fe", accent: "#4285f4", ink: "#0b3070" },
  huawei:    { bg: "#fdebed", accent: "#c8102e", ink: "#5a0814" },
  oppo_vivo: { bg: "#e6f7ee", accent: "#00a854", ink: "#003d20" },
  meta:      { bg: "#e7f0ff", accent: "#0866ff", ink: "#0a2e85" },
  motorola:  { bg: "#eef2ff", accent: "#5c92fa", ink: "#1f3d8a" },
  sony:      { bg: "#f0f0f3", accent: "#000000", ink: "#0a0a14" },
  asus:      { bg: "#e8f1fa", accent: "#00539f", ink: "#001f4a" }
};

// ---- 카테고리별 line-art SVG 아이콘 (path data) ----
// 모두 viewBox 0 0 200 200 기준, 중앙 정렬
const ICON = {
  smartphone: `
    <rect x="70" y="40" width="60" height="120" rx="10" ry="10" fill="none" stroke="currentColor" stroke-width="3"/>
    <line x1="92" y1="148" x2="108" y2="148" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <rect x="78" y="48" width="44" height="78" rx="2" fill="currentColor" opacity="0.06"/>
    <rect x="92" y="48" width="16" height="4" rx="2" fill="currentColor" opacity="0.4"/>
  `,
  foldable: `
    <rect x="40" y="50" width="55" height="100" rx="8" fill="none" stroke="currentColor" stroke-width="3"/>
    <rect x="105" y="50" width="55" height="100" rx="8" fill="none" stroke="currentColor" stroke-width="3"/>
    <rect x="48" y="58" width="39" height="84" rx="2" fill="currentColor" opacity="0.06"/>
    <rect x="113" y="58" width="39" height="84" rx="2" fill="currentColor" opacity="0.06"/>
  `,
  tablet: `
    <rect x="35" y="55" width="130" height="90" rx="8" fill="none" stroke="currentColor" stroke-width="3"/>
    <rect x="43" y="63" width="114" height="74" rx="2" fill="currentColor" opacity="0.06"/>
    <line x1="92" y1="142" x2="108" y2="142" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  `,
  wearable: `
    <rect x="68" y="68" width="64" height="64" rx="14" fill="none" stroke="currentColor" stroke-width="3"/>
    <rect x="78" y="78" width="44" height="44" rx="6" fill="currentColor" opacity="0.06"/>
    <line x1="80" y1="40" x2="120" y2="40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <line x1="80" y1="160" x2="120" y2="160" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M 80 40 L 75 65 L 80 68" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 120 40 L 125 65 L 120 68" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 80 160 L 75 135 L 80 132" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 120 160 L 125 135 L 120 132" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
  `,
  xr: `
    <path d="M 30 80 Q 30 65 45 65 L 155 65 Q 170 65 170 80 L 170 120 Q 170 138 152 138 L 130 138 L 115 122 L 85 122 L 70 138 L 48 138 Q 30 138 30 120 Z"
          fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="70" cy="100" rx="14" ry="10" fill="currentColor" opacity="0.12"/>
    <ellipse cx="130" cy="100" rx="14" ry="10" fill="currentColor" opacity="0.12"/>
    <circle cx="70" cy="100" r="4" fill="currentColor"/>
    <circle cx="130" cy="100" r="4" fill="currentColor"/>
  `,
  gaming: `
    <path d="M 35 90 L 50 75 Q 60 65 75 65 L 125 65 Q 140 65 150 75 L 165 90 Q 175 105 175 120 L 175 130 Q 175 150 158 150 Q 145 150 138 138 L 130 125 L 70 125 L 62 138 Q 55 150 42 150 Q 25 150 25 130 L 25 120 Q 25 105 35 90 Z"
          fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
    <line x1="55" y1="100" x2="75" y2="100" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <line x1="65" y1="90" x2="65" y2="110" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <circle cx="125" cy="95" r="4" fill="currentColor"/>
    <circle cx="140" cy="105" r="4" fill="currentColor"/>
  `
};

// ---- 슬러그 (충돌 방지: +/괄호 등 특수문자도 보존) ----
function slug(s) {
  return s.toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/\(([^)]+)\)/g, "-$1")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 모든 슬러그가 unique 한지 보장
function uniqueSlugs(products) {
  const seen = {};
  const map = {};
  for (const p of products) {
    let s = slug(p.model);
    if (seen[s]) {
      seen[s]++;
      s = s + "-" + seen[s];
    } else {
      seen[s] = 1;
    }
    map[p.model] = s;
  }
  return map;
}

// ---- SVG 빌더 ----
function buildSvg(p) {
  const m = MANUFACTURERS.find(x => x.key === p.mfr) || { name: p.mfr };
  const c = CATEGORIES.find(x => x.key === p.category) || { label: p.category };
  const brand = BRAND[p.mfr] || BRAND.apple;
  const icon = ICON[p.category] || ICON.smartphone;

  // Word-wrap 모델명 (글자 수 기준 단순 wrap)
  const model = p.model;
  const lines = wrapText(model, 20);

  const yearText = `${m.name} · ${p.year}${p.status === "rumored" ? " (예정)" : p.status === "announced" ? " (발표)" : ""}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="${esc(model)} (${esc(m.name)})">
  <rect width="400" height="400" fill="${brand.bg}"/>
  <!-- 상단 가는 액센트 라인 -->
  <rect x="0" y="0" width="400" height="3" fill="${brand.accent}"/>
  <!-- 카테고리 아이콘 — 중앙, 큰 사이즈 -->
  <g transform="translate(100, 60) scale(1.0)" color="${brand.ink}">
    ${icon}
  </g>
  <!-- 카테고리 라벨 (작게, 상단 우측) -->
  <text x="380" y="28" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Pretendard', system-ui, sans-serif"
        font-size="11" font-weight="600" fill="${brand.accent}" letter-spacing="0.5" text-transform="uppercase">${esc(c.label)}</text>
  <!-- 모델명 -->
  ${lines.map((l, i) => `<text x="200" y="${300 + i*22}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Pretendard', system-ui, sans-serif" font-size="${lines.length > 1 ? 17 : 19}" font-weight="600" fill="${brand.ink}" letter-spacing="-0.3">${esc(l)}</text>`).join("\n  ")}
  <!-- 제조사 + 연도 -->
  <text x="200" y="${300 + lines.length*22 + 14}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Pretendard', system-ui, sans-serif" font-size="12" fill="${brand.ink}" opacity="0.6">${esc(yearText)}</text>
</svg>`;
}

function wrapText(s, maxLen) {
  if (s.length <= maxLen) return [s];
  const words = s.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxLen && cur) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 2);   // 최대 2줄
}

function esc(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// ---- 모든 제품에 대해 SVG 생성 + slug 매핑 ----
const slugMap = uniqueSlugs(PRODUCTS);
PRODUCTS.forEach(p => {
  const s = slugMap[p.model];
  fs.writeFileSync(path.join(OUT_IMG, s + ".svg"), buildSvg(p));
});

console.log(`generated ${PRODUCTS.length} SVGs in ${OUT_IMG}`);

// ---- data.js 갱신: imageUrl을 img/<slug>.svg 로 ----
let newCode = code;
PRODUCTS.forEach(p => {
  const s = slugMap[p.model];
  const newUrl = `img/${s}.svg`;
  // 모델 단위로 처리 — 이미 imageUrl 있으면 교체, 없으면 추가
  // model: "..." 검색해서 그 객체 안의 imageUrl 처리
  // Use a regex that matches the full product object on one line
  const escModel = p.model.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(\\{ mfr: "[^"]*", category: "[^"]*", model: "${escModel}"[^}]*?)(?:, imageUrl: "[^"]*")? \\}`, "g");
  newCode = newCode.replace(re, `$1, imageUrl: "${newUrl}" }`);
});

fs.writeFileSync(path.join(DASHBOARD, "data.js"), newCode);
console.log(`data.js updated. all PRODUCTS imageUrl → local img/...svg`);
