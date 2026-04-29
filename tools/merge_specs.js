#!/usr/bin/env node
/* fetch_specs.py 결과(JSON) → dashboard/data.js 의 SPECS 객체 갱신.
 * 기존 manual 데이터는 보존 (lastUpdated 비교). 자동 추출 데이터는 추가/덮어쓰기.
 *
 * Usage: node merge_specs.js fresh_specs.json dashboard/data.js
 */
const fs = require("fs");
const path = require("path");

const freshPath = process.argv[2];
const dataPath  = process.argv[3];

if (!freshPath || !dataPath) {
  console.error("Usage: node merge_specs.js fresh_specs.json dashboard/data.js");
  process.exit(1);
}

const fresh = JSON.parse(fs.readFileSync(freshPath, "utf8"));
const code = fs.readFileSync(dataPath, "utf8");

// 기존 SPECS 파싱 (모듈로 평가)
const tmp = "/tmp/_data_eval_" + Date.now() + ".js";
fs.writeFileSync(tmp, code + ";module.exports = { CATEGORIES, MANUFACTURERS, PRODUCTS, SPECS };");
const cur = require(tmp);
fs.unlinkSync(tmp);

const merged = { ...cur.SPECS };
let added = 0, updated = 0, kept = 0;
for (const [model, schema] of Object.entries(fresh)) {
  if (!schema) continue;
  if (!merged[model]) {
    merged[model] = schema;
    added++;
  } else {
    // 기존 데이터 우선. 새 데이터의 빈 필드 채우기.
    const cur = merged[model];
    let didUpdate = false;
    for (const [section, vals] of Object.entries(schema)) {
      if (typeof vals !== "object" || vals === null) continue;
      if (!cur[section]) cur[section] = {};
      for (const [k, v] of Object.entries(vals)) {
        if (v && !cur[section][k]) {
          cur[section][k] = v;
          didUpdate = true;
        }
      }
    }
    if (didUpdate) {
      cur.lastUpdated = new Date().toISOString().slice(0, 10);
      updated++;
    } else {
      kept++;
    }
  }
}

// data.js 재생성: 기존 PRODUCTS/MANUFACTURERS/CATEGORIES 그대로, SPECS만 교체
const head = code.replace(/const SPECS = \{[\s\S]*?\n\};\s*$/m, "").trimEnd() + "\n\n";
const newSpecs = "const SPECS = " + JSON.stringify(merged, null, 2) + ";\n";
fs.writeFileSync(dataPath, head + newSpecs);

console.log(`merged specs: added ${added}, updated ${updated}, kept ${kept}, total ${Object.keys(merged).length}`);
