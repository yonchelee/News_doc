/* 모바일 제품 비교 AI플랫폼
 * - 통합 입력창: 검색 + AI 질의를 한 번에
 * - LLM 어댑터: Ollama → Groq → Gemini → 키워드 폴백
 * - 듀얼 패널: 좌측 카드 그리드 + 우측 AI 응답
 */
(function(){
  "use strict";

  // ============ 카테고리 SVG 아이콘 ============
  const ICONS = {
    smartphone: '<svg class="icon" viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.2"/><line x1="11" y1="18.5" x2="13" y2="18.5"/></svg>',
    foldable:   '<svg class="icon" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="7" height="17" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="17" rx="1.5"/></svg>',
    tablet:     '<svg class="icon" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="2"/><line x1="11" y1="17.5" x2="13" y2="17.5"/></svg>',
    wearable:   '<svg class="icon" viewBox="0 0 24 24"><rect x="7.5" y="7.5" width="9" height="9" rx="2"/><line x1="9" y1="3.5" x2="15" y2="3.5"/><line x1="9" y1="20.5" x2="15" y2="20.5"/></svg>',
    xr:         '<svg class="icon" viewBox="0 0 24 24"><path d="M3 9.5h18v6a2 2 0 0 1-2 2h-3l-2-2h-4l-2 2H5a2 2 0 0 1-2-2v-6Z"/><circle cx="8.5" cy="13" r="1.4"/><circle cx="15.5" cy="13" r="1.4"/></svg>',
    gaming:     '<svg class="icon" viewBox="0 0 24 24"><path d="M5 8.5h14a3 3 0 0 1 3 3v3a3 3 0 0 1-5 2l-2-2h-6l-2 2a3 3 0 0 1-5-2v-3a3 3 0 0 1 3-3Z"/><line x1="8" y1="12.5" x2="10" y2="12.5"/><line x1="9" y1="11.5" x2="9" y2="13.5"/><circle cx="15" cy="12" r=".8"/><circle cx="17" cy="13.5" r=".8"/></svg>'
  };

  function monogram(name){
    if (name === "OPPO / Vivo") return "OV";
    return name.split(/\s+/).map(w => w[0]).join("").slice(0,2).toUpperCase();
  }

  // 한국어 별칭 → 영문 키워드 매핑 (검색 향상)
  // 순서 중요: 더 긴 패턴(예: "폴드7")이 짧은 패턴(예: "폴드")보다 먼저 와야 함
  const ALIASES = [
    // 제조사
    ["갤럭시", "Galaxy Samsung"], ["삼성", "Samsung"],
    ["아이폰", "iPhone Apple"], ["애플워치", "Apple Watch"], ["애플", "Apple"],
    ["에어팟", "AirPods"], ["비전프로", "Vision Pro"], ["비전", "Vision"],
    ["픽셀", "Pixel Google"], ["구글", "Google"],
    ["샤오미", "Xiaomi"], ["레드미", "Redmi"],
    ["화웨이", "Huawei"], ["메이트", "Mate"], ["퓨라", "Pura"],
    ["오포", "OPPO"], ["비보", "Vivo"], ["파인드", "Find"],
    ["메타", "Meta"], ["퀘스트", "Quest"], ["레이밴", "Ray-Ban"],
    ["모토로라", "Motorola"], ["레이저", "Razr"], ["엣지", "Edge"],
    ["소니", "Sony"], ["엑스페리아", "Xperia"], ["플레이스테이션", "PlayStation"],
    ["에이수스", "Asus"], ["로그", "ROG"], ["젠폰", "Zenfone"],
    // 형태 — 숫자 attached 우선
    ["폴드", "Fold Z"], ["플립", "Flip Z"], ["폴더블", "foldable Fold Flip"],
    ["워치", "Watch"], ["반지", "Ring"], ["밴드", "Band"],
    ["태블릿", "tablet Pad iPad Tab"], ["탭", "Tab"], ["패드", "Pad iPad"],
    ["글래스", "Glass"], ["글라스", "Glass"],
    // 등급 — "프로맥스" 같은 합성도 분해
    ["프로맥스", "Pro Max"], ["프로 맥스", "Pro Max"],
    ["프로", "Pro"], ["맥스", "Max"], ["울트라", "Ultra"], ["미니", "mini"],
    ["엣지", "Edge"], ["에어", "Air"],
    // 카테고리/일반어
    ["게이밍", "gaming ROG"], ["게임", "gaming"],
    ["스마트폰", "smartphone phone"], ["폰", "phone"]
  ];

  // 한국어 모델 → 정확한 모델명 직접 매핑 (특히 폼팩터 + 숫자 조합)
  // 순서 중요: 긴 패턴 먼저
  const MODEL_HINTS = [
    // Samsung 폴더블
    [/(?:갤럭시\s*)?(?:z\s*)?폴드\s*(\d+)/i,    "Galaxy Z Fold$1"],
    [/(?:갤럭시\s*)?(?:z\s*)?플립\s*(\d+)/i,    "Galaxy Z Flip$1"],
    [/(?:갤럭시\s*)?s\s*(\d+)\s*울트라/i,        "Galaxy S$1 Ultra"],
    [/(?:갤럭시\s*)?s\s*(\d+)\s*\+/i,           "Galaxy S$1+"],
    [/(?:갤럭시\s*)?s\s*(\d+)\s*엣지/i,          "Galaxy S$1 Edge"],
    // iPhone — "프로17맥스" 같은 압축 폼 처리
    [/아이폰\s*(\d+)\s*프로\s*맥스/i,            "iPhone $1 Pro Max"],
    [/아이폰\s*(\d+)\s*프로/i,                  "iPhone $1 Pro"],
    [/아이폰\s*프로\s*(\d+)\s*맥스/i,            "iPhone $1 Pro Max"],
    [/아이폰\s*맥스\s*(\d+)\s*프로/i,            "iPhone $1 Pro Max"],
    [/아이폰\s*에어/i,                          "iPhone Air"],
    [/아이폰\s*(\d+)\s*e/i,                     "iPhone $1e"],
    [/아이폰\s*(\d+)/i,                         "iPhone $1"],
    // Pixel
    [/픽셀\s*(\d+)\s*프로\s*xl/i,               "Pixel $1 Pro XL"],
    [/픽셀\s*(\d+)\s*프로\s*폴드/i,              "Pixel $1 Pro Fold"],
    [/픽셀\s*(\d+)\s*프로/i,                    "Pixel $1 Pro"],
    [/픽셀\s*워치\s*(\d+)/i,                    "Pixel Watch $1"],
    [/픽셀\s*(\d+)a/i,                          "Pixel $1a"],
    [/픽셀\s*(\d+)/i,                           "Pixel $1"],
    // Vision Pro / Quest / 기타
    [/비전\s*프로\s*m(\d+)/i,                   "Vision Pro M$1"],
    [/비전\s*프로\s*(\d+)/i,                    "Vision Pro $1"],
    [/퀘스트\s*(\d+)/i,                         "Quest $1"]
  ];

  // 토큰화: 한국어/영문/숫자 단위로 쪼갬, 공백 무시
  function tokensOf(s){
    return (s || "").toLowerCase()
      .replace(/[,·/\.]/g, " ")
      .split(/\s+/).filter(Boolean);
  }

  // 압축 토큰: 공백 제거된 정규화 (예: "iphone17promax")
  function condense(s){
    return (s || "").toLowerCase().replace(/\s+/g, "");
  }

  // expand: 한국어 alias 추가 + 모델 힌트로 추출된 정확 모델명 추가
  function expandQuery(q){
    let s = q;
    // 1) 모델 힌트로 정확 모델명 추출 (가장 강한 신호)
    MODEL_HINTS.forEach(([re, repl]) => {
      const m = q.match(re);
      if (m) {
        const exact = repl.replace(/\$(\d+)/g, (_, i) => m[parseInt(i,10)]);
        s += " " + exact;
      }
    });
    // 2) alias 단순 substring 매핑
    ALIASES.forEach(([kr, en]) => {
      if (s.includes(kr)) s += " " + en;
    });
    return s;
  }

  // 모델 힌트 적중을 별도로 추출 — 정확 매칭 우선순위 부여용
  function exactModelHints(q){
    const hits = [];
    MODEL_HINTS.forEach(([re, repl]) => {
      const m = q.match(re);
      if (m) {
        const exact = repl.replace(/\$(\d+)/g, (_, i) => m[parseInt(i,10)]);
        hits.push(exact);
      }
    });
    return hits;
  }

  // ============ DOM helpers ============
  const qs  = (sel) => document.querySelector(sel);
  const qsa = (sel) => Array.from(document.querySelectorAll(sel));

  // ============ 상태 ============
  const state = {
    q: "",            // 현재 검색/질의
    mfr: new Set(),
    cat: new Set(),
    picks: [],
    aiBusy: false
  };

  // ============ LLM 어댑터 ============
  // 우선순위: Ollama → Groq → Gemini → 키워드 폴백
  const STORAGE = {
    groq:   "news_doc_llm_groq_key",
    gemini: "news_doc_llm_gemini_key"
  };
  function lsGet(k){ try{ return localStorage.getItem(k) || ""; }catch(e){ return ""; } }
  function lsSet(k,v){ try{ if (v) localStorage.setItem(k,v); else localStorage.removeItem(k); }catch(e){} }

  // Cloudflare Worker proxy URL (Groq 백엔드, 키 노출 X)
  // 사용자 Cloudflare 계정 서브도메인. 실제 다르면 setting에서 override 가능.
  const WORKER_URL = (window.NEWS_DOC_WORKER_URL) || "https://news-doc-llm-proxy.yonchelee.workers.dev";

  const AI = {
    engine: null,                 // "worker" | "ollama" | "groq" | "gemini" | "fallback"
    ollamaModel: null,
    workerOk: false
  };

  async function probeOllama(){
    try{
      const r = await fetch("http://localhost:11434/api/tags", { method: "GET" });
      if (!r.ok) return false;
      const d = await r.json();
      const names = (d.models || []).map(m => m.name || m.model || "");
      const wanted = ["gemma3:4b", "gemma2:2b", "gemma:2b", "llama3.2", "qwen2.5"];
      const found = wanted.find(m => names.some(n => n.startsWith(m)));
      if (found){
        AI.ollamaModel = found;
        return true;
      }
      // 다른 모델이라도 있으면 첫 번째 사용
      if (names[0]){ AI.ollamaModel = names[0]; return true; }
      return false;
    }catch(e){ return false; }
  }

  function pickEngine(){
    if (AI.workerOk)           return "worker";   // Cloudflare Worker 우선
    if (AI.ollamaModel)        return "ollama";
    if (lsGet(STORAGE.groq))   return "groq";
    if (lsGet(STORAGE.gemini)) return "gemini";
    return "fallback";
  }

  async function probeWorker(){
    try{
      const r = await fetch(WORKER_URL + "/", { method: "GET" });
      if (r.ok){
        const d = await r.json();
        if (d && d.ok){ AI.workerOk = true; return true; }
      }
    }catch(e){ /* worker 미배포/네트워크 — silent */ }
    return false;
  }

  function buildSystemPrompt(userQ){
    const list = PRODUCTS.map(p => {
      const m = MANUFACTURERS.find(x => x.key === p.mfr);
      return `- ${p.model} | ${m ? m.name : p.mfr} | ${p.category} | ${p.year} ${p.status === "rumored" ? "(예정)" : ""}`;
    }).join("\n");

    // 사용자 질의에 매칭 가능성 높은 제품 → 풀 스펙을 LLM에 주입
    let specContext = "";
    if (typeof SPECS !== "undefined" && userQ) {
      const candidates = scoreByQuery(userQ).slice(0, 4).map(x => x.p.model);
      const specBlocks = candidates
        .filter(name => SPECS[name])
        .map(name => {
          const s = SPECS[name];
          // 핵심 필드만 압축해서 토큰 절약
          const flat = [
            s.display && s.display.size && `display: ${s.display.size} ${s.display.panel || ""} ${s.display.refreshRate || ""}`,
            s.processor && s.processor.ap && `chip: ${s.processor.ap}`,
            s.memory && s.memory.ram && `ram: ${s.memory.ram}`,
            s.camera && s.camera.rear && `cam: ${typeof s.camera.rear === 'object' ? Object.values(s.camera.rear).filter(Boolean).join('/') : s.camera.rear}`,
            s.battery && s.battery.capacity && `battery: ${s.battery.capacity} ${s.battery.chargingWired || ""}`,
            s.os && s.os.initial && `os: ${s.os.initial}`,
            s.price && (s.price.usd || s.price.krw) && `price: ${s.price.usd || s.price.krw}`,
            s.price && s.price.launchDate && `launch: ${s.price.launchDate}`
          ].filter(Boolean).join(" | ");
          return `[${name}] ${flat}`;
        });
      if (specBlocks.length) {
        specContext = `\n\n관련 풀 스펙 (정확한 답변에 활용):\n${specBlocks.join("\n")}`;
      }
    }

    return `당신은 모바일 제품 데이터베이스 전문가입니다. 사용자 질문에 한국어로 친절하게 답하세요.

답변 규칙:
1. 짧고 명확하게 (3~8줄). 마크다운 사용 가능.
2. 비교 질문이면 표 또는 두 단락으로 핵심 차이만 (스펙 수치 인용).
3. 추천 질문이면 2~3개 후보 + 각 한 줄 이유.
4. 제품명은 아래 목록에 있는 그대로 정확히 사용.
5. 답변 끝에 별도 줄로 "MATCH:" 다음에 콤마 구분된 매칭 제품명 목록을 출력.
   예: MATCH: Galaxy Z Fold7, iPhone 17 Pro Max
6. 매칭이 없으면 MATCH: (빈칸)

제품 목록:
${list}${specContext}`;
  }

  // ---- Cloudflare Worker (Groq backend) ----
  async function callWorker(userQ){
    const r = await fetch(WORKER_URL + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: buildSystemPrompt(userQ) },
          { role: "user",   content: userQ }
        ],
        temperature: 0.3
      })
    });
    if (!r.ok){
      const errText = await r.text().catch(() => "");
      throw new Error("worker " + r.status + " " + errText.slice(0,120));
    }
    const d = await r.json();
    return (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || "";
  }

  // ---- Ollama ----
  async function callOllama(userQ){
    const r = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: AI.ollamaModel,
        stream: false,
        messages: [
          { role: "system", content: buildSystemPrompt(userQ) },
          { role: "user",   content: userQ }
        ],
        options: { temperature: 0.3 }
      })
    });
    if (!r.ok) throw new Error("ollama " + r.status);
    const d = await r.json();
    return (d.message && d.message.content) || "";
  }

  // ---- Groq (OpenAI 호환) ----
  async function callGroq(userQ){
    const key = lsGet(STORAGE.groq);
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: buildSystemPrompt(userQ) },
          { role: "user",   content: userQ }
        ],
        temperature: 0.3
      })
    });
    if (!r.ok) throw new Error("groq " + r.status);
    const d = await r.json();
    return (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || "";
  }

  // ---- Gemini ----
  async function callGemini(userQ){
    const key = lsGet(STORAGE.gemini);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: userQ }] }],
        systemInstruction: { parts: [{ text: buildSystemPrompt(userQ) }] },
        generationConfig: { temperature: 0.3 }
      })
    });
    if (!r.ok) throw new Error("gemini " + r.status);
    const d = await r.json();
    const cand = d.candidates && d.candidates[0];
    return (cand && cand.content && cand.content.parts && cand.content.parts[0] && cand.content.parts[0].text) || "";
  }

  // 응답 파싱: 본문 + MATCH: 라인
  function parseLLMResponse(text){
    const m = text.match(/MATCH:\s*(.*)\s*$/m);
    let matches = [];
    let body = text;
    if (m){
      matches = m[1].split(",").map(s => s.trim()).filter(Boolean);
      body = text.replace(/MATCH:\s*.*$/m, "").trim();
    }
    return { body, matches };
  }

  // ---- 키워드 폴백 ----
  function scoreByQuery(q){
    if (!q || !q.trim()) return [];
    const exactHints = exactModelHints(q);   // ["Galaxy Z Fold7", "iPhone 17 Pro Max", ...]
    const expanded = expandQuery(q).toLowerCase();
    const tokens = expanded.split(/[\s,·/]+/).filter(t => t.length >= 1);
    const condQ = condense(q);                // "갤럭시폴드7vs아이폰프로17맥스..."

    return PRODUCTS.map(p => {
      const m = MANUFACTURERS.find(x => x.key === p.mfr);
      const c = CATEGORIES.find(x => x.key === p.category);
      const hay = [p.model, p.highlight, m && m.name, c && c.label, String(p.year)]
        .filter(Boolean).join(" ").toLowerCase();
      const condModel = condense(p.model);

      let score = 0;
      // 1) 정확 모델 힌트 매칭 — 가장 강한 신호 (각 50점)
      exactHints.forEach(hint => {
        if (hint.toLowerCase() === p.model.toLowerCase()) score += 50;
      });
      // 2) 압축 모델명이 압축 쿼리에 등장 (예: "iphone17promax" in "갤럭시폴드7이랑아이폰프로17맥스...")
      if (condQ.indexOf(condModel) !== -1) score += 20;
      // 3) 일반 토큰 매칭 (각 1점)
      tokens.forEach(t => { if (hay.indexOf(t) !== -1) score += 1; });
      // 4) 숫자 토큰 정확 매칭 보너스 — "7"이 모델명에 있고 쿼리에도 있으면 +3
      const queryNums = (q.match(/\d+/g) || []);
      const modelNums = (p.model.match(/\d+/g) || []);
      queryNums.forEach(qn => {
        if (modelNums.indexOf(qn) !== -1) score += 3;
      });
      // 5) 모델명 자체에 토큰 직접 매칭 — 추가 보너스
      tokens.forEach(t => { if (p.model.toLowerCase().indexOf(t) !== -1) score += 2; });

      return { p, score };
    }).filter(x => x.score > 0).sort((a,b) => b.score - a.score);
  }

  // 비교 패턴 분리: "이랑/랑/와/과 ... 비교" 또는 "vs" 같은 모든 변형 처리
  function splitComparePair(q){
    // 우선 'vs' / 'versus' 로 명시적 split
    let parts = q.split(/\s*(?:vs|VS|versus|Versus|VERSUS)\s*/).filter(Boolean);
    if (parts.length >= 2) return parts;

    // "X 비교 Y" 형태
    parts = q.split(/\s*비교\s*(?:해\s*달라|해줘|해|할|하|—)?\s*/).filter(Boolean);
    if (parts.length >= 2) return parts;

    // "X 이랑 Y", "X 랑 Y", "X 와 Y", "X 과 Y" — 단, 마지막에 "비교" 같은 게 와야 의도 확실
    if (/비교|차이/.test(q)){
      // 한국어 접속 조사로 split, 마지막 토큰의 "비교/차이/...해" 같은 꼬리는 제거
      parts = q.split(/\s*(?:이랑|랑|와|과|또는)\s+/).filter(Boolean);
      if (parts.length >= 2){
        // 마지막 part에서 "비교해달라", "비교", "차이" 등 꼬리 제거
        parts[parts.length - 1] = parts[parts.length - 1]
          .replace(/\s*(?:비교\s*해\s*달라|비교\s*해\s*줘|비교\s*해|비교|차이|어때|뭐가\s*달라)\s*$/, "")
          .trim();
        return parts.filter(Boolean);
      }
    }
    return [];
  }

  function keywordFallback(userQ){
    const wantsCompare = /비교|vs|versus|둘\s*중|차이/i.test(userQ);

    let matches = [];

    // 0) 정확 모델 힌트가 2개 이상 떨어졌으면 즉시 사용
    if (wantsCompare){
      const hints = exactModelHints(userQ)
        .filter(h => PRODUCTS.some(p => p.model === h));
      if (hints.length >= 2){
        matches = [hints[0], hints[1]];
      }
    }

    // 1) 비교 패턴 → 양쪽 split 후 각각 scoreByQuery
    if (matches.length < 2 && wantsCompare){
      const parts = splitComparePair(userQ);
      if (parts.length >= 2){
        const left  = scoreByQuery(parts[0])[0];
        const right = scoreByQuery(parts[1])[0];
        if (left)  matches.push(left.p.model);
        if (right && right.p.model !== (left && left.p.model)) matches.push(right.p.model);
      }
    }

    // 2) 그래도 부족하면 전체 쿼리 점수 기반 폴백
    if (wantsCompare && matches.length < 2){
      const all = scoreByQuery(userQ);
      for (const x of all){
        if (matches.indexOf(x.p.model) === -1) matches.push(x.p.model);
        if (matches.length >= 2) break;
      }
    }

    if (!wantsCompare){
      matches = scoreByQuery(userQ).slice(0, 6).map(x => x.p.model);
    }
    let body;
    if (matches.length === 0){
      body = `**검색 결과 없음.** "${userQ}" 키워드로 매칭되는 제품이 없습니다. 제조사 또는 카테고리 키워드를 함께 입력해보세요.`;
    } else if (wantsCompare && matches.length >= 2){
      const [a, b] = matches.slice(0, 2).map(name => PRODUCTS.find(p => p.model === name));
      body = `**${a.model} vs ${b.model}** (키워드 매칭)\n\n` +
             `- **${a.model}** (${a.year}): ${a.highlight}\n` +
             `- **${b.model}** (${b.year}): ${b.highlight}\n\n` +
             `_AI 엔진이 연결되지 않아 단순 키워드 비교만 표시합니다. 더 자세한 비교는 설정에서 Ollama 또는 API 키를 활성화하세요._`;
    } else {
      const lines = matches.slice(0, 4).map(name => {
        const p = PRODUCTS.find(x => x.model === name);
        return `- **${p.model}** (${p.year}, ${p.status === "rumored" ? "예정" : "출시"}): ${p.highlight}`;
      });
      body = `**키워드 매칭 결과** (${matches.length}개):\n\n${lines.join("\n")}\n\n_더 풍부한 인사이트는 AI 엔진을 연결하세요. (설정 버튼)_`;
    }
    return { body, matches };
  }

  async function askAI(userQ){
    const engine = AI.engine || pickEngine();
    AI.engine = engine;
    let raw, source;
    try{
      if (engine === "worker"){ raw = await callWorker(userQ); source = "Cloudflare Worker · Groq llama-3.3-70b"; }
      else if (engine === "ollama"){ raw = await callOllama(userQ); source = `Ollama · ${AI.ollamaModel}`; }
      else if (engine === "groq"){ raw = await callGroq(userQ); source = "Groq · llama-3.3-70b"; }
      else if (engine === "gemini"){ raw = await callGemini(userQ); source = "Gemini 2.0 Flash"; }
      else throw new Error("no engine");
      const parsed = parseLLMResponse(raw);
      return { ...parsed, source };
    }catch(e){
      console.warn("[ai] fallback:", e.message);
      const fb = keywordFallback(userQ);
      return { ...fb, source: "키워드 매칭 (폴백)" };
    }
  }

  // ============ UI 렌더 ============
  const elGrid    = qs("#grid");
  const elCount   = qs("#count");
  const elEmpty   = qs("#empty");
  const elAsk     = qs("#ask");
  const elAskGo   = qs("#ask-go");
  const elAiDot   = qs("#ai-status .ai-dot");
  const elAiLabel = qs(".ai-status-label");
  const elAiBody  = qs("#ai-body");
  const elAiEng   = qs("#ai-engine");
  const elBar     = qs("#cmp-bar");
  const elModal   = qs("#cmp-modal");

  function renderChips(){
    const mfrRow = qs("#mfr-chips");
    const catRow = qs("#cat-chips");
    mfrRow.innerHTML = "";
    catRow.innerHTML = "";
    MANUFACTURERS.forEach(m => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.textContent = m.name;
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", () => toggleChip("mfr", m.key, b));
      mfrRow.appendChild(b);
    });
    CATEGORIES.forEach(c => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip";
      b.innerHTML = (ICONS[c.key] || "") + " " + c.label;
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", () => toggleChip("cat", c.key, b));
      catRow.appendChild(b);
    });
  }

  function toggleChip(kind, key, btn){
    const set = state[kind];
    if (set.has(key)) set.delete(key); else set.add(key);
    btn.setAttribute("aria-pressed", set.has(key) ? "true" : "false");
    renderGrid();
  }

  // 제품 필터: q 자유 텍스트 + 칩 + AI 매칭 모델 강조
  function filtered(){
    const rawQ = state.q.trim();
    const expanded = expandQuery(rawQ).toLowerCase();
    return PRODUCTS.filter(p => {
      if (state.mfr.size && !state.mfr.has(p.mfr)) return false;
      if (state.cat.size && !state.cat.has(p.category)) return false;
      if (!rawQ) return true;
      const m = MANUFACTURERS.find(x => x.key === p.mfr);
      const c = CATEGORIES.find(x => x.key === p.category);
      const hay = [p.model, p.highlight, String(p.year), m && m.name, c && c.label]
        .filter(Boolean).join(" ").toLowerCase();
      // 한국어 원문 또는 영문 별칭 중 하나라도 포함되면 매칭
      const tokens = expanded.split(/\s+/).filter(Boolean);
      return tokens.some(t => hay.indexOf(t) !== -1) || hay.indexOf(rawQ.toLowerCase()) !== -1;
    });
  }

  function renderGrid(){
    const list = filtered();
    elGrid.innerHTML = "";
    list.forEach(p => {
      const m = MANUFACTURERS.find(x => x.key === p.mfr) || { name: p.mfr };
      const c = CATEGORIES.find(x => x.key === p.category) || { label: p.category };
      const isPicked = state.picks.indexOf(p.model) !== -1;

      const card = document.createElement("article");
      card.className = "card";
      card.setAttribute("aria-pressed", isPicked ? "true" : "false");
      card.dataset.model = p.model;

      // 썸네일 (이미지 또는 모노그램 폴백)
      const thumb = document.createElement("div");
      thumb.className = "thumb";
      if (p.imageUrl){
        const img = document.createElement("img");
        img.src = p.imageUrl;
        img.alt = p.model;
        img.loading = "lazy";
        img.referrerPolicy = "no-referrer";
        img.onerror = () => {
          // 이미지 깨지면 모노그램으로 폴백
          thumb.innerHTML = "";
          const fb = document.createElement("div");
          fb.className = "thumb-fallback";
          fb.textContent = monogram(m.name);
          thumb.appendChild(fb);
        };
        thumb.appendChild(img);
      } else {
        const fb = document.createElement("div");
        fb.className = "thumb-fallback";
        fb.textContent = monogram(m.name);
        thumb.appendChild(fb);
      }
      card.appendChild(thumb);

      const meta = document.createElement("div");
      meta.className = "meta";
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.innerHTML = (ICONS[p.category] || "") + " " + c.label;
      const year = document.createElement("span");
      year.textContent = p.year || "";
      meta.appendChild(badge);
      meta.appendChild(year);

      const h3 = document.createElement("h3");
      h3.textContent = p.model;

      const hl = document.createElement("p");
      hl.className = "hl";
      hl.textContent = p.highlight || "";

      const mfr = document.createElement("p");
      mfr.className = "mfr";
      const mono = document.createElement("span");
      mono.className = "mfr-mono"; mono.textContent = monogram(m.name);
      const mfrName = document.createTextNode(m.name);
      mfr.appendChild(mono); mfr.appendChild(mfrName);

      if (p.status && p.status !== "released"){
        const st = document.createElement("span");
        st.className = "status"; st.dataset.status = p.status;
        st.textContent = p.status === "rumored" ? "예정" : "발표";
        mfr.appendChild(st);
      }

      const pick = document.createElement("span");
      pick.className = "pick"; pick.setAttribute("aria-hidden", "true");

      card.appendChild(meta); card.appendChild(h3);
      card.appendChild(hl); card.appendChild(mfr); card.appendChild(pick);
      card.addEventListener("click", () => togglePick(p.model));
      elGrid.appendChild(card);
    });

    elCount.textContent = list.length === PRODUCTS.length
      ? `전체 ${list.length}개`
      : `${list.length} / ${PRODUCTS.length}개`;
    elEmpty.hidden = list.length !== 0;
    renderCmpBar();
  }

  // ============ 비교 모드 ============
  function togglePick(model){
    const idx = state.picks.indexOf(model);
    if (idx !== -1) state.picks.splice(idx, 1);
    else {
      if (state.picks.length >= 2) state.picks.shift();
      state.picks.push(model);
    }
    renderGrid();
  }

  function renderCmpBar(){
    qsa(".cmp-slot").forEach((slot, i) => {
      const model = state.picks[i];
      slot.classList.toggle("filled", !!model);
      slot.textContent = model || (i === 0 ? "슬롯 1 — 카드를 탭" : "슬롯 2");
    });
    qs("#cmp-open").disabled = state.picks.length !== 2;
    elBar.hidden = state.picks.length === 0;
  }

  qs("#cmp-clear").addEventListener("click", () => { state.picks = []; renderGrid(); });
  qs("#cmp-open").addEventListener("click", () => {
    if (state.picks.length !== 2) return;
    openCompare();
  });

  // 비교 모달의 풀 스펙 섹션 정의
  const SPEC_SECTIONS = [
    { key: "design",       label: "디자인",     fields: [["dimensions","치수"],["weight","무게"],["materials","소재"],["colors","색상"]] },
    { key: "display",      label: "디스플레이", fields: [["size","크기"],["resolution","해상도"],["panel","패널"],["refreshRate","주사율"],["brightness","밝기"],["hdr","HDR"],["extra","기타"]] },
    { key: "processor",    label: "프로세서",   fields: [["ap","AP / 칩"],["process","공정"]] },
    { key: "memory",       label: "메모리",     fields: [["ram","RAM"],["storage","저장"]] },
    { key: "camera",       label: "카메라",     fields: [["rear","후면"],["front","전면"],["video","동영상"]] },
    { key: "battery",      label: "배터리",     fields: [["capacity","용량"],["chargingWired","유선 충전"],["chargingWireless","무선 충전"],["reverse","역충전"]] },
    { key: "connectivity", label: "연결성",     fields: [["fiveG","5G"],["wifi","Wi-Fi"],["bluetooth","Bluetooth"],["usb","USB"],["nfc","NFC"],["uwb","UWB"]] },
    { key: "os",           label: "소프트웨어", fields: [["initial","초기 OS"],["updates","업데이트"]] },
    { key: "durability",   label: "내구성",     fields: [["ip","방수방진"],["biometric","생체인식"]] },
    { key: "price",        label: "가격 / 출시", fields: [["krw","한국 가격"],["usd","USD 가격"],["launchDate","출시일"]] }
  ];

  function fmtSpecValue(v) {
    if (v === undefined || v === null || v === "") return null;
    if (Array.isArray(v)) return v.join(" · ");
    if (typeof v === "boolean") return v ? "✓ 지원" : "✗ 미지원";
    if (typeof v === "object") {
      // camera.rear { main, ultrawide, ... } 같은 중첩
      return Object.entries(v).filter(([k,vv]) => vv).map(([k, vv]) => `${k}: ${vv}`).join(" · ");
    }
    return String(v);
  }

  function specRows(specA, specB, sectionKey, fields) {
    const sa = (specA && specA[sectionKey]) || {};
    const sb = (specB && specB[sectionKey]) || {};
    const out = { aRows: [], bRows: [] };
    fields.forEach(([key, label]) => {
      const va = fmtSpecValue(sa[key]);
      const vb = fmtSpecValue(sb[key]);
      const diff = (va && vb && va !== vb);
      out.aRows.push({ label, value: va || "—", diff });
      out.bRows.push({ label, value: vb || "—", diff });
    });
    return out;
  }

  function buildSpecSections(p, otherSpecs, mySpecs) {
    if (!mySpecs) {
      return `<p class="cmp-source">스펙 데이터 없음 — <code>tools/fetch_specs.py</code> 또는 manual 추가 필요.</p>`;
    }
    const rows = SPEC_SECTIONS.map((sec, i) => {
      const sa = (mySpecs && mySpecs[sec.key]) || {};
      const sb = (otherSpecs && otherSpecs[sec.key]) || {};
      const trs = sec.fields.map(([k, lbl]) => {
        const va = fmtSpecValue(sa[k]);
        const vb = fmtSpecValue(sb[k]);
        if (va === null) return ""; // 빈 필드는 스킵
        const diff = (va && vb && va !== vb);
        return `<div class="cmp-row${diff?' diff':''}"><dt>${esc(lbl)}</dt><dd>${esc(va)}</dd></div>`;
      }).filter(Boolean).join("");
      if (!trs) return "";
      return `<details class="cmp-section"${i < 2 ? " open" : ""}>
        <summary>${esc(sec.label)}</summary>
        <dl>${trs}</dl>
      </details>`;
    }).filter(Boolean).join("");
    const src = mySpecs.source ? `<div class="cmp-source">출처: <a href="${esc(mySpecs.source)}" target="_blank" rel="noopener">Wikipedia</a> · 갱신: ${esc(mySpecs.lastUpdated || "—")}</div>` : "";
    return rows + src;
  }

  function openCompare(){
    const body = qs("#cmp-modal-body");
    body.innerHTML = "";
    const [mA, mB] = state.picks;
    const pA = PRODUCTS.find(x => x.model === mA);
    const pB = PRODUCTS.find(x => x.model === mB);
    const specA = (typeof SPECS !== "undefined") ? SPECS[mA] : null;
    const specB = (typeof SPECS !== "undefined") ? SPECS[mB] : null;

    [[pA, specA, specB], [pB, specB, specA]].forEach(([p, mySpecs, otherSpecs]) => {
      if (!p) return;
      const m = MANUFACTURERS.find(x => x.key === p.mfr) || { name: p.mfr };
      const c = CATEGORIES.find(x => x.key === p.category) || { label: p.category };
      const col = document.createElement("section");
      col.className = "cmp-col";

      // thumbnail
      const thumb = `<div class="cmp-thumb">${
        p.imageUrl
          ? `<img src="${esc(p.imageUrl)}" alt="${esc(p.model)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.innerHTML='<div class=&quot;thumb-fallback&quot;>${esc(monogram(m.name))}</div>'"/>`
          : `<div class="thumb-fallback">${esc(monogram(m.name))}</div>`
      }</div>`;

      const head = `<div class="meta"><span class="badge">${ICONS[p.category] || ""} ${esc(c.label)}</span> · ${esc(m.name)} · ${esc(String(p.year))} ${p.status === "rumored" ? "(예정)" : ""}</div>
        <h3>${esc(p.model)}</h3>
        <p class="hl">${esc(p.highlight || "")}</p>`;

      col.innerHTML = thumb + head + buildSpecSections(p, otherSpecs, mySpecs);
      body.appendChild(col);
    });

    elModal.hidden = false;
    document.body.classList.add("modal-open");
  }
  function closeModal(modal){
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }
  qsa("#cmp-modal [data-close]").forEach(el => el.addEventListener("click", () => closeModal(elModal)));
  qsa("#settings-modal [data-close]").forEach(el => el.addEventListener("click", () => closeModal(qs("#settings-modal"))));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape"){
      if (!elModal.hidden) closeModal(elModal);
      if (!qs("#settings-modal").hidden) closeModal(qs("#settings-modal"));
    }
  });

  // ============ 통합 입력 처리 ============
  function setAiStatus(state, label){
    elAiDot.dataset.state = state;
    elAiLabel.textContent = label;
  }

  function renderAiPanel({ body, source, loading, error, matchModels }){
    const node = qs("#ai-body");
    elAiEng.textContent = source || "대기 중";
    if (loading){
      node.innerHTML = `<div class="ai-loading">생각하는 중…</div>`;
      return;
    }
    if (error){
      node.innerHTML = `<div class="ai-error">${esc(error)}</div>`;
      return;
    }
    if (!body){
      node.innerHTML = `
        <div class="ai-empty">
          <p class="ai-empty-title">자연어로 질문해 보세요.</p>
          <ul class="ai-empty-list">
            <li>"갤럭시 Z Fold7 vs 아이폰 17 프로 맥스"</li>
            <li>"2025년에 나온 폴더블 추천"</li>
            <li>"가성비 좋은 게이밍 폰"</li>
            <li>"Vision Pro M5 특징"</li>
          </ul>
        </div>`;
      // 빈 상태 예시 클릭 → 입력
      qsa(".ai-empty-list li").forEach(li => {
        li.addEventListener("click", () => {
          elAsk.value = li.textContent.replace(/^"|"$/g, "");
          handleAsk();
        });
      });
      return;
    }
    // 매칭된 제품들의 thumbnail 배지
    let productBadges = "";
    if (matchModels && matchModels.length){
      const items = matchModels
        .map(name => PRODUCTS.find(p => p.model === name))
        .filter(Boolean)
        .slice(0, 6)
        .map(p => {
          const m = MANUFACTURERS.find(x => x.key === p.mfr) || { name: p.mfr };
          const img = p.imageUrl
            ? `<img src="${esc(p.imageUrl)}" alt="${esc(p.model)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.outerHTML='<span class=&quot;ai-pc-mono&quot;>${esc(monogram(m.name))}</span>'"/>`
            : `<span class="ai-pc-mono">${esc(monogram(m.name))}</span>`;
          return `<span class="ai-product-card">${img}<span>${esc(p.model)}</span></span>`;
        }).join("");
      if (items) productBadges = `<div class="ai-product-list">${items}</div>`;
    }
    node.innerHTML = `<div class="ai-content">${markdownish(body)}</div>` +
      productBadges +
      (source ? `<div class="ai-source">${esc(source)}</div>` : "");
  }

  // 매우 가벼운 마크다운 렌더 (XSS 방지 위해 텍스트 escape 후 패턴 재치환)
  function markdownish(text){
    let s = esc(text);
    // 코드 블록은 생략, inline `code` 만
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    // **bold**
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    // 헤딩 ###
    s = s.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
    // 리스트 - / *
    s = s.replace(/(^|\n)[\-\*]\s+(.+)/g, "$1<li>$2</li>");
    s = s.replace(/(<li>(?:.|\n)+?<\/li>)+/g, m => `<ul>${m}</ul>`);
    // 표 (| header |) — 단순 처리: pipe 줄을 변환
    // 한 단락 단위 줄바꿈
    s = s.split(/\n{2,}/).map(p => p.match(/^<(h3|ul|ol|table)/) ? p : `<p>${p.replace(/\n/g,"<br/>")}</p>`).join("");
    return s;
  }

  function esc(s){
    return String(s)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }

  let askDebounce = null;
  let askInFlight = 0;     // 입력 중복 방지용 시퀀스 번호

  async function handleAsk(){
    const userQ = elAsk.value.trim();
    state.q = userQ;
    renderGrid();   // 즉시 키워드 검색 반영 (좌측)

    if (!userQ){
      renderAiPanel({});
      return;
    }
    // AI 응답 (우측)
    askInFlight++;
    const seq = askInFlight;
    renderAiPanel({ loading: true, source: AI.engine === "fallback" || !AI.engine ? "키워드 매칭" : AI.engine });
    try{
      const res = await askAI(userQ);
      if (seq !== askInFlight) return;   // 더 새로운 질의가 들어옴 — 무시
      renderAiPanel({ body: res.body, source: res.source, matchModels: res.matches });

      // AI가 매칭한 모델이 있으면 카드 그리드/비교 모드에 반영
      if (res.matches && res.matches.length){
        const valid = res.matches.filter(name => PRODUCTS.some(p => p.model === name));
        if (valid.length >= 2 && /비교|vs|versus|둘\s*중|차이/.test(userQ)){
          // 비교 패턴 → 두 카드 선택 + 모달 자동 오픈
          state.picks = valid.slice(0, 2);
          renderGrid();
          openCompare();
        } else if (valid.length === 1){
          // 단일 매칭 → 검색창에 모델명 적용해 그 카드만 강조
          state.q = valid[0]; elAsk.value = valid[0]; renderGrid();
        }
        // 다수 매칭이지만 비교 의도 아니면 패널 텍스트만 유지 (필터는 키워드 검색이 이미 수행)
      }
    }catch(e){
      if (seq !== askInFlight) return;
      renderAiPanel({ error: "AI 호출 실패: " + e.message });
    }
  }

  elAsk.addEventListener("input", () => {
    // 즉시 좌측 키워드 검색 반영 (디바운스)
    clearTimeout(askDebounce);
    askDebounce = setTimeout(() => {
      state.q = elAsk.value;
      renderGrid();
    }, 90);
  });
  elAsk.addEventListener("keydown", e => {
    if (e.key === "Enter"){ e.preventDefault(); handleAsk(); }
  });
  elAskGo.addEventListener("click", handleAsk);

  qs("#reset").addEventListener("click", () => {
    state.q = ""; state.mfr.clear(); state.cat.clear(); state.picks = [];
    elAsk.value = "";
    qsa(".chip").forEach(c => c.setAttribute("aria-pressed","false"));
    renderGrid();
    renderAiPanel({});
  });

  // ============ 설정 모달 ============
  qs("#open-settings").addEventListener("click", () => {
    qs("#groq-key").value   = lsGet(STORAGE.groq);
    qs("#gemini-key").value = lsGet(STORAGE.gemini);
    qs("#ollama-hint").textContent = AI.ollamaModel
      ? `연결됨 · 모델: ${AI.ollamaModel}`
      : "연결되지 않음 (localhost:11434 응답 없음)";
    qs("#settings-modal").hidden = false;
    document.body.classList.add("modal-open");
  });
  qsa("#settings-modal [data-save]").forEach(btn => {
    btn.addEventListener("click", () => {
      const which = btn.dataset.save;
      const val = qs(`#${which}-key`).value.trim();
      lsSet(STORAGE[which], val);
      AI.engine = null;   // 다음 호출 시 재선택
      reflectEngine();
    });
  });
  qsa("#settings-modal [data-clear]").forEach(btn => {
    btn.addEventListener("click", () => {
      const which = btn.dataset.clear;
      lsSet(STORAGE[which], "");
      qs(`#${which}-key`).value = "";
      AI.engine = null;
      reflectEngine();
    });
  });

  function reflectEngine(){
    const e = pickEngine();
    AI.engine = e;
    if (e === "worker"){ setAiStatus("online", "Worker · Groq"); elAiEng.textContent = "Cloudflare Worker · Groq llama-3.3-70b"; }
    else if (e === "ollama"){ setAiStatus("online", `Ollama · ${AI.ollamaModel}`); elAiEng.textContent = `Ollama · ${AI.ollamaModel}`; }
    else if (e === "groq"){   setAiStatus("online", "Groq llama-3.3");   elAiEng.textContent = "Groq · llama-3.3-70b"; }
    else if (e === "gemini"){ setAiStatus("online", "Gemini 2.0 Flash"); elAiEng.textContent = "Gemini 2.0 Flash"; }
    else { setAiStatus("offline", "키워드 폴백"); elAiEng.textContent = "키워드 매칭"; }
  }

  // ============ init ============
  renderChips();
  renderGrid();
  renderAiPanel({});
  setAiStatus("checking", "연결 확인 중");
  if (typeof fetch === "function"){
    // Worker 우선 probe (제일 가능성 높은 엔진), 실패 시 Ollama 시도
    Promise.all([probeWorker(), probeOllama()]).then(() => reflectEngine());
  } else {
    reflectEngine();
  }
})();
