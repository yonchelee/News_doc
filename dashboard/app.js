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
  const ALIASES = [
    ["갤럭시", "Galaxy Samsung"], ["삼성", "Samsung"],
    ["아이폰", "iPhone Apple"], ["애플", "Apple"], ["애플워치", "Apple Watch"],
    ["에어팟", "AirPods"], ["비전프로", "Vision Pro"], ["비전", "Vision"],
    ["픽셀", "Pixel Google"], ["구글", "Google"],
    ["샤오미", "Xiaomi"], ["미", "Mi"], ["레드미", "Redmi"],
    ["화웨이", "Huawei"], ["메이트", "Mate"], ["퓨라", "Pura"],
    ["오포", "OPPO"], ["비보", "Vivo"], ["파인드", "Find"],
    ["메타", "Meta"], ["퀘스트", "Quest"], ["레이밴", "Ray-Ban"],
    ["모토로라", "Motorola"], ["레이저", "Razr"], ["엣지", "Edge"],
    ["소니", "Sony"], ["엑스페리아", "Xperia"], ["플레이스테이션", "PlayStation"],
    ["에이수스", "Asus"], ["로그", "ROG"], ["젠폰", "Zenfone"],
    ["폴드", "Fold"], ["플립", "Flip"], ["폴더블", "foldable Fold Flip"],
    ["워치", "Watch"], ["반지", "Ring"], ["밴드", "Band"],
    ["태블릿", "tablet Pad iPad Tab"], ["탭", "Tab"], ["패드", "Pad iPad"],
    ["글래스", "Glass"], ["글라스", "Glass"],
    ["프로", "Pro"], ["맥스", "Max"], ["울트라", "Ultra"], ["미니", "mini"],
    ["게이밍", "gaming ROG"], ["게임", "gaming"],
    ["스마트폰", "smartphone phone"], ["폰", "phone"]
  ];

  function expandQuery(q){
    let s = q;
    ALIASES.forEach(([kr, en]) => {
      if (s.includes(kr)) s += " " + en;
    });
    return s;
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

  const AI = {
    engine: null,                 // "ollama" | "groq" | "gemini" | "fallback"
    ollamaModel: null
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
    if (AI.ollamaModel) return "ollama";
    if (lsGet(STORAGE.groq))   return "groq";
    if (lsGet(STORAGE.gemini)) return "gemini";
    return "fallback";
  }

  function buildSystemPrompt(){
    const list = PRODUCTS.map(p => {
      const m = MANUFACTURERS.find(x => x.key === p.mfr);
      return `- ${p.model} | ${m ? m.name : p.mfr} | ${p.category} | ${p.year} ${p.status === "rumored" ? "(예정)" : ""}`;
    }).join("\n");
    return `당신은 모바일 제품 데이터베이스 전문가입니다. 사용자 질문에 한국어로 친절하게 답하세요.

답변 규칙:
1. 짧고 명확하게 (3~6줄). 마크다운 사용 가능.
2. 비교 질문이면 표 또는 두 단락으로 핵심 차이만.
3. 추천 질문이면 2~3개 후보 + 각 한 줄 이유.
4. 제품명은 아래 목록에 있는 그대로 정확히 사용.
5. 답변 끝에 별도 줄로 "MATCH:" 다음에 콤마 구분된 매칭 제품명 목록을 출력. (UI가 카드를 필터하는 데 사용)
   예: MATCH: Galaxy Z Fold7, iPhone 17 Pro Max
6. 매칭이 없으면 MATCH: (빈칸)

제품 목록:
${list}`;
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
          { role: "system", content: buildSystemPrompt() },
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
          { role: "system", content: buildSystemPrompt() },
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
        systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
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
    const expanded = expandQuery(q).toLowerCase();
    const tokens = expanded.split(/[\s,·/]+/).filter(t => t.length >= 1);
    return PRODUCTS.map(p => {
      const m = MANUFACTURERS.find(x => x.key === p.mfr);
      const c = CATEGORIES.find(x => x.key === p.category);
      const hay = [p.model, p.highlight, m && m.name, c && c.label, String(p.year)]
        .filter(Boolean).join(" ").toLowerCase();
      let score = 0;
      tokens.forEach(t => { if (hay.indexOf(t) !== -1) score += 1; });
      return { p, score };
    }).filter(x => x.score > 0).sort((a,b) => b.score - a.score);
  }

  function keywordFallback(userQ){
    const wantsCompare = /비교|vs|versus|둘\s*중|차이/.test(userQ);

    let matches = [];
    if (wantsCompare){
      // "A vs B" 패턴 — vs/비교 기준 분리 후 양쪽 따로 매칭
      const parts = userQ.split(/\s*(?:vs|VS|versus|와\s*비교|랑\s*비교)\s*|\s*비교\s*/).filter(Boolean);
      if (parts.length >= 2){
        const left  = scoreByQuery(parts[0])[0];
        const right = scoreByQuery(parts[1])[0];
        if (left)  matches.push(left.p.model);
        if (right && right.p.model !== (left && left.p.model)) matches.push(right.p.model);
      }
      if (matches.length < 2){
        const all = scoreByQuery(userQ);
        for (const x of all){
          if (matches.indexOf(x.p.model) === -1) matches.push(x.p.model);
          if (matches.length >= 2) break;
        }
      }
    } else {
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
      if (engine === "ollama"){ raw = await callOllama(userQ); source = `Ollama · ${AI.ollamaModel}`; }
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

  function openCompare(){
    const body = qs("#cmp-modal-body");
    body.innerHTML = "";
    state.picks.forEach(model => {
      const p = PRODUCTS.find(x => x.model === model);
      if (!p) return;
      const m = MANUFACTURERS.find(x => x.key === p.mfr) || { name: p.mfr };
      const c = CATEGORIES.find(x => x.key === p.category) || { label: p.category };
      const col = document.createElement("section");
      col.className = "cmp-col";
      col.innerHTML = `
        <div class="meta"><span class="badge">${ICONS[p.category] || ""} ${esc(c.label)}</span></div>
        <h3>${esc(p.model)}</h3>
        <dl>
          <div class="row"><dt>제조사</dt><dd>${esc(m.name)}</dd></div>
          <div class="row"><dt>카테고리</dt><dd>${esc(c.label)}</dd></div>
          <div class="row"><dt>출시</dt><dd>${esc(String(p.year || "-"))} · ${p.status === "rumored" ? "예정" : "출시"}</dd></div>
          <div class="row"><dt>특징</dt><dd>${esc(p.highlight || "-")}</dd></div>
        </dl>`;
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

  function renderAiPanel({ body, source, loading, error }){
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
    node.innerHTML = `<div class="ai-content">${markdownish(body)}</div>` +
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
      renderAiPanel({ body: res.body, source: res.source });

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
    if (e === "ollama"){ setAiStatus("online", `Ollama · ${AI.ollamaModel}`); elAiEng.textContent = `Ollama · ${AI.ollamaModel}`; }
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
    probeOllama().then(() => reflectEngine());
  } else {
    reflectEngine();
  }
})();
