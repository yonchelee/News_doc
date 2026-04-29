/* 모바일 제품 스펙 대시보드 — 필터 + 검색 로직
   data.js 의 CATEGORIES / MANUFACTURERS / PRODUCTS 사용
*/
(function(){
  "use strict";

  const state = {
    q: "",
    mfr: new Set(),   // 빈 Set = 전체
    cat: new Set()    // 빈 Set = 전체
  };

  const qs  = (sel) => document.querySelector(sel);
  const qsa = (sel) => Array.from(document.querySelectorAll(sel));

  const elGrid  = qs("#grid");
  const elCount = qs("#count");
  const elEmpty = qs("#empty");
  const elQ     = qs("#q");

  // ---------- 칩 렌더 ----------
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
      b.addEventListener("click", () => toggle("mfr", m.key, b));
      mfrRow.appendChild(b);
    });

    CATEGORIES.forEach(c => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = c.label;
      b.setAttribute("aria-pressed", "false");
      b.dataset.kind = "cat";
      b.dataset.key  = c.key;
      b.addEventListener("click", () => toggle("cat", c.key, b));
      catRow.appendChild(b);
    });
  }

  function toggle(kind, key, btn){
    const set = state[kind];
    if (set.has(key)) set.delete(key);
    else              set.add(key);
    btn.setAttribute("aria-pressed", set.has(key) ? "true" : "false");
    render();
  }

  // ---------- 필터/검색 적용 ----------
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

  // ---------- 카드 렌더 ----------
  function render(){
    const list = filtered();
    elGrid.innerHTML = "";

    list.forEach(p => {
      const mfrMeta = MANUFACTURERS.find(m => m.key === p.mfr) || { name: p.mfr };
      const catMeta = CATEGORIES.find(c => c.key === p.category) || { label: p.category };

      const card = document.createElement("article");
      card.className = "card";

      const meta = document.createElement("div");
      meta.className = "meta";
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = catMeta.label;
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
      mfr.textContent = mfrMeta.name;

      card.appendChild(meta);
      card.appendChild(h3);
      card.appendChild(hl);
      card.appendChild(mfr);
      elGrid.appendChild(card);
    });

    elCount.textContent = list.length === PRODUCTS.length
      ? `전체 ${list.length}개`
      : `${list.length} / ${PRODUCTS.length}개`;

    elEmpty.hidden = list.length !== 0;
  }

  // ---------- 검색 입력 ----------
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
    elQ.value = "";
    qsa(".chip").forEach(c => c.setAttribute("aria-pressed", "false"));
    render();
  });

  // ---------- 초기화 ----------
  renderChips();
  render();
})();
