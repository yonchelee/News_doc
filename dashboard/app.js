/* 모바일 제품 스펙 대시보드 — 필터 + 검색 + 비교 모드 */
(function(){
  "use strict";

  // ---------- 카테고리 SVG 아이콘 (line, currentColor stroke) ----------
  const ICONS = {
    smartphone: '<svg class="icon" viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.2"/><line x1="11" y1="18.5" x2="13" y2="18.5"/></svg>',
    foldable:   '<svg class="icon" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="7"  height="17" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="17" rx="1.5"/></svg>',
    tablet:     '<svg class="icon" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="2"/><line x1="11" y1="17.5" x2="13" y2="17.5"/></svg>',
    wearable:   '<svg class="icon" viewBox="0 0 24 24"><rect x="7.5" y="7.5" width="9" height="9" rx="2"/><line x1="9" y1="3.5" x2="15" y2="3.5"/><line x1="9" y1="20.5" x2="15" y2="20.5"/></svg>',
    xr:         '<svg class="icon" viewBox="0 0 24 24"><path d="M3 9.5h18v6a2 2 0 0 1-2 2h-3l-2-2h-4l-2 2H5a2 2 0 0 1-2-2v-6Z"/><circle cx="8.5" cy="13" r="1.4"/><circle cx="15.5" cy="13" r="1.4"/></svg>',
    gaming:     '<svg class="icon" viewBox="0 0 24 24"><path d="M5 8.5h14a3 3 0 0 1 3 3v3a3 3 0 0 1-5 2l-2-2h-6l-2 2a3 3 0 0 1-5-2v-3a3 3 0 0 1 3-3Z"/><line x1="8" y1="12.5" x2="10" y2="12.5"/><line x1="9" y1="11.5" x2="9" y2="13.5"/><circle cx="15" cy="12" r=".8"/><circle cx="17" cy="13.5" r=".8"/></svg>'
  };

  // monogram fallback for manufacturer logo
  function monogram(name){
    if (name === "OPPO / Vivo") return "OV";
    return name.split(/\s+/).map(w => w[0]).join("").slice(0,2).toUpperCase();
  }

  // ---------- 상태 ----------
  const state = {
    q: "",
    mfr: new Set(),
    cat: new Set(),
    picks: []   // 비교 대상 (최대 2개) — model 키 사용
  };

  const qs  = (sel) => document.querySelector(sel);
  const qsa = (sel) => Array.from(document.querySelectorAll(sel));

  const elGrid  = qs("#grid");
  const elCount = qs("#count");
  const elEmpty = qs("#empty");
  const elQ     = qs("#q");
  const elBar   = qs("#cmp-bar");
  const elModal = qs("#cmp-modal");

  // ---------- 칩 ----------
  function renderChips(){
    const mfrRow = qs("#mfr-chips");
    const catRow = qs("#cat-chips");
    mfrRow.innerHTML = "";
    catRow.innerHTML = "";

    MANUFACTURERS.forEach(m => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = m.name;
      b.setAttribute("aria-pressed", "false");
      b.dataset.kind = "mfr";
      b.dataset.key  = m.key;
      b.addEventListener("click", () => toggleChip("mfr", m.key, b));
      mfrRow.appendChild(b);
    });

    CATEGORIES.forEach(c => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.innerHTML = (ICONS[c.key] || "") + " " + c.label;
      b.setAttribute("aria-pressed", "false");
      b.dataset.kind = "cat";
      b.dataset.key  = c.key;
      b.addEventListener("click", () => toggleChip("cat", c.key, b));
      catRow.appendChild(b);
    });
  }

  function toggleChip(kind, key, btn){
    const set = state[kind];
    if (set.has(key)) set.delete(key);
    else              set.add(key);
    btn.setAttribute("aria-pressed", set.has(key) ? "true" : "false");
    render();
  }

  // ---------- 필터링 ----------
  function filtered(){
    const q = state.q.trim().toLowerCase();
    return PRODUCTS.filter(p => {
      if (state.mfr.size && !state.mfr.has(p.mfr)) return false;
      if (state.cat.size && !state.cat.has(p.category)) return false;
      if (!q) return true;
      const mfrMeta = MANUFACTURERS.find(m => m.key === p.mfr);
      const catMeta = CATEGORIES.find(c => c.key === p.category);
      const hay = [
        p.model, p.highlight, String(p.year),
        mfrMeta && mfrMeta.name, catMeta && catMeta.label
      ].filter(Boolean).join(" ").toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  // ---------- 카드 ----------
  function render(){
    const list = filtered();
    elGrid.innerHTML = "";

    list.forEach(p => {
      const mfrMeta = MANUFACTURERS.find(m => m.key === p.mfr) || { name: p.mfr };
      const catMeta = CATEGORIES.find(c => c.key === p.category) || { label: p.category };
      const isPicked = state.picks.indexOf(p.model) !== -1;

      const card = document.createElement("article");
      card.className = "card";
      card.setAttribute("aria-pressed", isPicked ? "true" : "false");
      card.dataset.model = p.model;

      const meta = document.createElement("div");
      meta.className = "meta";
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.innerHTML = (ICONS[p.category] || "") + " " + catMeta.label;
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
      mono.className = "mfr-mono";
      mono.textContent = monogram(mfrMeta.name);
      mfr.appendChild(mono);
      mfr.appendChild(document.createTextNode(mfrMeta.name));

      const pick = document.createElement("span");
      pick.className = "pick";
      pick.setAttribute("aria-hidden", "true");

      card.appendChild(meta);
      card.appendChild(h3);
      card.appendChild(hl);
      card.appendChild(mfr);
      card.appendChild(pick);
      card.addEventListener("click", () => togglePick(p.model));
      elGrid.appendChild(card);
    });

    elCount.textContent = list.length === PRODUCTS.length
      ? `전체 ${list.length}개`
      : `${list.length} / ${PRODUCTS.length}개`;
    elEmpty.hidden = list.length !== 0;
    renderCmpBar();
  }

  // ---------- 비교: pick 토글 ----------
  function togglePick(model){
    const idx = state.picks.indexOf(model);
    if (idx !== -1){
      state.picks.splice(idx, 1);
    } else {
      if (state.picks.length >= 2){
        state.picks.shift();   // FIFO — 가장 오래된 슬롯 제거
      }
      state.picks.push(model);
    }
    render();
  }

  // ---------- 비교 트레이 ----------
  function renderCmpBar(){
    const slots = qsa(".cmp-slot");
    slots.forEach((slot, i) => {
      const model = state.picks[i];
      slot.classList.toggle("filled", !!model);
      slot.textContent = model || (i === 0 ? "슬롯 1 — 카드를 탭해 추가" : "슬롯 2");
    });
    qs("#cmp-open").disabled = state.picks.length !== 2;
    elBar.hidden = state.picks.length === 0;
  }

  qs("#cmp-clear").addEventListener("click", () => {
    state.picks = [];
    render();
  });

  qs("#cmp-open").addEventListener("click", () => {
    if (state.picks.length !== 2) return;
    openCompare();
  });

  // ---------- 비교 모달 ----------
  function openCompare(){
    const body = qs("#cmp-modal-body");
    body.innerHTML = "";
    state.picks.forEach(model => {
      const p = PRODUCTS.find(x => x.model === model);
      if (!p) return;
      const mfrMeta = MANUFACTURERS.find(m => m.key === p.mfr) || { name: p.mfr };
      const catMeta = CATEGORIES.find(c => c.key === p.category) || { label: p.category };
      const col = document.createElement("section");
      col.className = "cmp-col";
      col.innerHTML = `
        <div class="meta">
          <span class="badge">${ICONS[p.category] || ""} ${escapeHtml(catMeta.label)}</span>
        </div>
        <h3>${escapeHtml(p.model)}</h3>
        <dl>
          <div class="row"><dt>제조사</dt><dd>${escapeHtml(mfrMeta.name)}</dd></div>
          <div class="row"><dt>카테고리</dt><dd>${escapeHtml(catMeta.label)}</dd></div>
          <div class="row"><dt>출시</dt><dd>${escapeHtml(String(p.year || "-"))}</dd></div>
          <div class="row"><dt>특징</dt><dd>${escapeHtml(p.highlight || "-")}</dd></div>
        </dl>
      `;
      body.appendChild(col);
    });
    elModal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeCompare(){
    elModal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  qsa("#cmp-modal [data-close]").forEach(el => el.addEventListener("click", closeCompare));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !elModal.hidden) closeCompare();
  });

  // ---------- 검색 ----------
  let qTimer = null;
  elQ.addEventListener("input", (e) => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => {
      state.q = e.target.value || "";
      render();
    }, 90);
  });

  // ---------- 리셋 ----------
  qs("#reset").addEventListener("click", () => {
    state.q = "";
    state.mfr.clear();
    state.cat.clear();
    state.picks = [];
    elQ.value = "";
    qsa(".chip").forEach(c => c.setAttribute("aria-pressed", "false"));
    render();
  });

  // ---------- 유틸 ----------
  function escapeHtml(s){
    return String(s)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }

  // ===========================================================
  //  AI 검색 (Ollama Gemma 연동 + 키워드 폴백)
  // ===========================================================
  const AI = {
    endpoint: "http://localhost:11434/api/chat",
    models: ["gemma3:4b", "gemma2:2b", "gemma:2b"],   // 첫 번째부터 시도
    activeModel: null,
    online: false
  };

  const elAiQ      = qs("#ai-q");
  const elAiGo     = qs("#ai-go");
  const elAiDot    = qs("#ai-status .ai-dot");
  const elAiLabel  = qs(".ai-status-label");
  const elAiHint   = qs("#ai-hint");

  function setAiStatus(state, label){
    elAiDot.dataset.state = state;
    elAiLabel.textContent = label;
  }

  // Ollama 연결 점검 — /api/tags 로 모델 목록 받아서 지원되는 모델 자동 픽
  async function checkOllama(){
    try{
      const r = await fetch("http://localhost:11434/api/tags", { method: "GET" });
      if (!r.ok) throw new Error("not ok");
      const d = await r.json();
      const names = (d.models || []).map(m => m.name || m.model || "");
      const found = AI.models.find(m => names.some(n => n.startsWith(m)));
      if (found){
        AI.online = true;
        AI.activeModel = found;
        setAiStatus("online", `Ollama · ${found}`);
        elAiHint.textContent = `현재 ${found} 모델로 자연어 검색이 동작합니다.`;
      } else {
        AI.online = false;
        setAiStatus("offline", "키워드 폴백");
        elAiHint.textContent = "Gemma 모델이 없어 키워드 매칭으로 동작합니다. `ollama pull gemma3:4b` 로 활성화하세요.";
      }
    }catch(e){
      AI.online = false;
      setAiStatus("offline", "키워드 폴백");
      elAiHint.textContent = "Ollama가 실행 중이 아니에요. README의 설정 안내를 참고하세요.";
    }
  }

  // 시스템 프롬프트 — 컨텍스트로 제품 키 + 카테고리 + 제조사 매핑 제공
  function buildSystemPrompt(){
    const productList = PRODUCTS.map(p => {
      const m = MANUFACTURERS.find(x => x.key === p.mfr);
      return `- ${p.model} | ${m ? m.name : p.mfr} | ${p.category} | ${p.year}`;
    }).join("\n");

    return `당신은 모바일 제품 데이터베이스 검색 도우미입니다.
사용자 질문을 분석해서 아래 제품 목록 중 관련된 것을 찾아 JSON으로 응답하세요.

응답 형식 (반드시 이 JSON만 출력, 다른 설명 금지):
{
  "products": ["제품명1", "제품명2"],
  "action": "compare" | "filter" | "show",
  "reason": "선택 이유 한 줄"
}

action 결정 규칙:
- 사용자가 "비교", "vs", "둘 중에" 같은 표현 → "compare" (정확히 2개)
- 카테고리/제조사 필터링 → "filter" (해당하는 모든 제품)
- 단순 검색/추천 → "show" (1~5개)

제품 목록:
${productList}

제품명은 위 목록에서 정확히 그대로 복사해 사용하세요.`;
  }

  async function askGemma(userQ){
    const sys = buildSystemPrompt();
    const r = await fetch(AI.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: AI.activeModel,
        stream: false,
        format: "json",
        messages: [
          { role: "system", content: sys },
          { role: "user",   content: userQ }
        ],
        options: { temperature: 0.2 }
      })
    });
    if (!r.ok) throw new Error("Ollama " + r.status);
    const d = await r.json();
    const content = (d.message && d.message.content) || "";
    return JSON.parse(content);
  }

  // ---------- 키워드 폴백 ----------
  function keywordFallback(userQ){
    const q = userQ.toLowerCase();
    const wantsCompare = /비교|vs|versus|둘\s*중|차이/.test(userQ);
    const tokens = q.split(/[\s,·/]+/).filter(Boolean);

    const scored = PRODUCTS.map(p => {
      const m = MANUFACTURERS.find(x => x.key === p.mfr);
      const c = CATEGORIES.find(x => x.key === p.category);
      const hay = [p.model, p.highlight, m && m.name, c && c.label, String(p.year)]
        .filter(Boolean).join(" ").toLowerCase();
      let score = 0;
      tokens.forEach(t => { if (hay.indexOf(t) !== -1) score += 1; });
      return { p, score };
    }).filter(x => x.score > 0)
      .sort((a,b) => b.score - a.score);

    const picks = scored.slice(0, wantsCompare ? 2 : 5).map(x => x.p.model);
    return {
      products: picks,
      action: wantsCompare && picks.length >= 2 ? "compare" : (picks.length ? "filter" : "show"),
      reason: wantsCompare ? "키워드 비교 추출" : "키워드 매칭"
    };
  }

  // 결과 적용
  function applyAiResult(res){
    if (!res || !Array.isArray(res.products)) return;
    const valid = res.products.filter(name => PRODUCTS.some(p => p.model === name));

    if (res.action === "compare" && valid.length >= 2){
      state.picks = valid.slice(0, 2);
      // filter 해제하고 검색창 비움 — 모달이 메인 무대
      state.q = "";
      state.mfr.clear();
      state.cat.clear();
      qsa(".chip").forEach(c => c.setAttribute("aria-pressed","false"));
      elQ.value = "";
      render();
      openCompare();
      return;
    }

    if (res.action === "show" || res.action === "filter"){
      // 검색창에 모델명 키워드 합쳐서 넣고 필터처럼 동작
      // 다중 매칭이면 첫 매칭으로 검색
      if (valid.length === 1){
        elQ.value = valid[0];
        state.q = valid[0];
      } else if (valid.length > 1){
        // 공통 키워드 추출이 어려우니 이름 첫 단어 사용
        const first = valid[0].split(/\s+/)[0];
        elQ.value = first;
        state.q = first;
      }
      render();
    }
  }

  async function runAi(){
    const q = elAiQ.value.trim();
    if (!q) return;
    elAiGo.disabled = true;
    elAiHint.textContent = AI.online ? "Gemma가 생각 중…" : "키워드 매칭 중…";
    elAiHint.className = "ai-thinking";

    let res = null;
    if (AI.online){
      try{
        res = await askGemma(q);
      }catch(e){
        console.warn("[ai] Gemma fail, fallback:", e.message);
      }
    }
    if (!res) res = keywordFallback(q);

    applyAiResult(res);

    elAiHint.className = "ai-hint";
    elAiHint.textContent = res.reason
      ? `${res.action} · ${res.reason}`
      : "결과 적용";
    elAiGo.disabled = false;
  }

  elAiGo.addEventListener("click", runAi);
  elAiQ.addEventListener("keydown", e => { if (e.key === "Enter") runAi(); });

  // ---------- init ----------
  renderChips();
  render();
  setAiStatus("checking", "연결 확인 중");
  if (typeof fetch === "function") checkOllama();
})();
