/* Tech-Lens. — Interaction layer
   Subtle Fade-in · Tactile Transitions · Smooth Parallax · Filter Logic */

(() => {
  const data = window.TECHLENS_DATA || [];
  const makers = window.TECHLENS_MAKERS || [];
  const cats = window.TECHLENS_CATEGORIES || [];
  const metricsDef = window.TECHLENS_METRICS || [];

  const makerOf = (id) => makers.find((m) => m.id === id) || { name: id };
  const catOf = (id) => cats.find((c) => c.id === id) || { label: id };

  /* Theme toggle */
  const themeBtn = document.getElementById("themeToggle");
  const setTheme = (mode) => {
    document.body.dataset.theme = mode;
    try { localStorage.setItem("tl-theme", mode); } catch (_) {}
  };
  try {
    const saved = localStorage.getItem("tl-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  } catch (_) {}
  themeBtn?.addEventListener("click", () => {
    setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
  });

  /* Makers grid */
  const makersHost = document.getElementById("makersGrid");
  if (makersHost) {
    makersHost.innerHTML = makers
      .map((m) => {
        const count = data.filter((d) => d.makerId === m.id).length;
        const cset = new Set(data.filter((d) => d.makerId === m.id).map((d) => d.category));
        const tags = [...cset].map((c) => catOf(c).label).join(" · ");
        return `
          <article class="maker reveal">
            <div class="maker__head">
              <h3 class="maker__name">${m.name}</h3>
              <span class="maker__count">${count}</span>
            </div>
            <p class="maker__note">${m.note}</p>
            <p class="maker__tags">${tags || "—"}</p>
            <a class="maker__link" href="${m.url}" target="_blank" rel="noopener">공식 사이트 →</a>
          </article>`;
      })
      .join("");
  }

  /* Filters */
  const state = { maker: "all", category: "all" };
  const makerChips = document.getElementById("makerChips");
  const catChips = document.getElementById("categoryChips");

  const buildChips = (host, items, getId, getLabel, getCount) => {
    host.innerHTML = [
      `<button class="chip is-on" data-id="all">All <em>${data.length}</em></button>`,
      ...items.map((it) => {
        const id = getId(it);
        const cnt = getCount(id);
        return `<button class="chip" data-id="${id}">${getLabel(it)} <em>${cnt}</em></button>`;
      }),
    ].join("");
  };

  buildChips(makerChips, makers, (m) => m.id, (m) => m.name,
    (id) => data.filter((d) => d.makerId === id).length);
  buildChips(catChips, cats, (c) => c.id, (c) => c.label,
    (id) => data.filter((d) => d.category === id).length);

  const onChipClick = (host, key) => (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    host.querySelectorAll(".chip").forEach((b) => b.classList.remove("is-on"));
    btn.classList.add("is-on");
    state[key] = btn.dataset.id;
    renderCatalog();
  };
  makerChips.addEventListener("click", onChipClick(makerChips, "maker"));
  catChips.addEventListener("click", onChipClick(catChips, "category"));

  /* Catalog grid */
  const catalogHost = document.getElementById("catalogGrid");
  const catalogCount = document.getElementById("catalogCount");

  const renderCatalog = () => {
    const filtered = data.filter(
      (d) =>
        (state.maker === "all" || d.makerId === state.maker) &&
        (state.category === "all" || d.category === state.category)
    );
    catalogCount.textContent = `${filtered.length}개 제품 표시 중`;
    catalogHost.innerHTML = filtered.length
      ? filtered
          .map(
            (d) => `
            <article class="card reveal" tabindex="0">
              <div>
                <p class="card__cat">${catOf(d.category).label} · ${makerOf(d.makerId).name}</p>
                <h3 class="card__name">${d.name}</h3>
                <ul class="card__specs">
                  ${Object.entries(d.specs).slice(0, 5)
                    .map(([k, v]) => `<li><span>${k}</span><strong>${v}</strong></li>`)
                    .join("")}
                </ul>
              </div>
              <p class="card__src">출처: <a href="${d.source.url}" target="_blank" rel="noopener">${d.source.label}</a></p>
            </article>`
          )
          .join("")
      : `<p class="empty">조건에 맞는 제품이 없습니다. 정보 미제공.</p>`;

    catalogHost.querySelectorAll(".card").forEach((el) => io.observe(el));
  };

  /* Compare module */
  const pickA = document.getElementById("pickA");
  const pickB = document.getElementById("pickB");
  const cmpTable = document.getElementById("compareTable");
  const cmpInsight = document.getElementById("compareInsight");

  if (pickA && pickB) {
    const groups = {};
    data.forEach((d) => {
      const g = makerOf(d.makerId).name;
      (groups[g] ||= []).push(d);
    });
    const opts = Object.entries(groups)
      .map(([maker, list]) => `
        <optgroup label="${maker}">
          ${list.map((d) => `<option value="${d.id}">${d.name} · ${catOf(d.category).label}</option>`).join("")}
        </optgroup>`)
      .join("");
    pickA.innerHTML = opts;
    pickB.innerHTML = opts;
    pickA.value = "s25u";
    pickB.value = "ip16pm";

    const renderCompare = () => {
      const a = data.find((d) => d.id === pickA.value);
      const b = data.find((d) => d.id === pickB.value);
      if (!a || !b) return;

      const rows = [];
      rows.push(`
        <div class="cmp-row cmp-row--head">
          <div>항목</div><div>${a.name}</div><div>${b.name}</div>
        </div>`);

      const allKeys = new Set([...Object.keys(a.specs), ...Object.keys(b.specs)]);
      allKeys.forEach((k) => {
        rows.push(`
          <div class="cmp-row">
            <div class="cmp-row__label">${k}</div>
            <div class="cmp-row__val">${a.specs[k] ?? "정보 미제공"}</div>
            <div class="cmp-row__val">${b.specs[k] ?? "정보 미제공"}</div>
          </div>`);
      });

      cmpTable.innerHTML = rows.join("");

      const wins = [];
      metricsDef.forEach((m) => {
        const av = a.metrics?.[m.key];
        const bv = b.metrics?.[m.key];
        if (av == null || bv == null) return;
        if (av === bv) return;
        const aWins = m.dir === "higher" ? av > bv : av < bv;
        const winner = aWins ? a : b;
        const loserVal = aWins ? bv : av;
        const winnerVal = aWins ? av : bv;
        const delta = Math.abs(winnerVal - loserVal);
        const pct = loserVal ? ((delta / loserVal) * 100).toFixed(1) : "—";
        wins.push({ name: winner.name, metric: m.label, delta: `${delta}${m.unit}`, pct });
      });

      const sideWins = (name) => wins.filter((w) => w.name === name);
      const renderList = (list) =>
        list.length
          ? `<ul>${list.map((w) => `<li><strong>${w.metric}</strong> · +${w.delta} (${w.pct}% 우위)</li>`).join("")}</ul>`
          : `<p>측정 가능한 수치 우위 없음.</p>`;

      cmpInsight.innerHTML = `
        <div class="insight">
          <h4>🔼 ${a.name} 강점</h4>
          ${renderList(sideWins(a.name))}
        </div>
        <div class="insight">
          <h4>🔼 ${b.name} 강점</h4>
          ${renderList(sideWins(b.name))}
        </div>`;
    };

    pickA.addEventListener("change", renderCompare);
    pickB.addEventListener("change", renderCompare);
    renderCompare();
  }

  /* Parser */
  const parserInput = document.getElementById("parserInput");
  const parserOutput = document.getElementById("parserOutput");
  const parseBtn = document.getElementById("parseBtn");
  const parseClear = document.getElementById("parseClear");

  const PATTERNS = [
    { label: "디스플레이", regex: /([\d.]+\s*(?:인치|"|inch).{0,80}?(?:AMOLED|OLED|LCD|LTPO|Retina|Actua|pOLED)[^|.\n]*)/i },
    { label: "주사율",     regex: /(\d{2,3})\s*Hz/i },
    { label: "AP/칩셋",    regex: /(Snapdragon[^|.\n]+|Apple\s*[AM]\d+\s*\w*|Tensor\s*G\d+|Exynos[^|.\n]+|Dimensity[^|.\n]+|Kirin[^|.\n]+|XR2[^|.\n]*)/i },
    { label: "RAM",        regex: /(\d{1,3})\s*GB\s*(?:RAM|램)/i },
    { label: "저장",       regex: /((?:64|128|256|512|1024)\s*GB|1\s*TB|2\s*TB)/i },
    { label: "메인 카메라", regex: /(\d{2,3})\s*MP/i },
    { label: "배터리",     regex: /([\d,]{3,6})\s*mAh/i },
    { label: "무게",       regex: /([\d.]+)\s*g\b/i },
    { label: "방수",       regex: /(IP6[89]|IP[X4-9]\d?|\d+\s*ATM|MIL-STD-810[A-Z]?|WR\d+)/i },
    { label: "FOV",        regex: /([\d.]+)\s*°/ },
    { label: "PPD",        regex: /PPD[^a-zA-Z\d]?\s*([\d.]+)/i },
  ];

  const parse = (text) => {
    const rows = [];
    const firstLine = text.split(/[\n|]/)[0]?.trim();
    if (firstLine) rows.push({ label: "모델명(추정)", value: firstLine.slice(0, 60) });
    PATTERNS.forEach((p) => {
      const m = text.match(p.regex);
      if (m) rows.push({ label: p.label, value: m[1].trim() });
    });
    return rows;
  };

  parseBtn?.addEventListener("click", () => {
    const text = parserInput.value.trim();
    if (!text) {
      parserOutput.innerHTML = `<p style="color:var(--c-fg-mute)">입력된 텍스트가 없습니다.</p>`;
      return;
    }
    const rows = parse(text);
    if (!rows.length) {
      parserOutput.innerHTML = `<p style="color:var(--c-fg-mute)">인식 가능한 사양 패턴이 없습니다. (정보 미제공)</p>`;
      return;
    }
    parserOutput.innerHTML = `
      <table>
        <thead><tr><th>항목</th><th>인식 값</th></tr></thead>
        <tbody>
          ${rows.map((r) => `<tr><td>${r.label}</td><td><strong>${r.value}</strong></td></tr>`).join("")}
        </tbody>
      </table>`;
  });

  parseClear?.addEventListener("click", () => {
    parserInput.value = "";
    parserOutput.innerHTML = "";
  });

  /* Reveal on scroll */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  renderCatalog();

  /* Smooth Parallax for floating objects */
  const floats = document.querySelectorAll(".float-obj");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      floats.forEach((f) => {
        const speed =
          f.classList.contains("float-obj--phone") ? 0.08 :
          f.classList.contains("float-obj--watch") ? 0.12 :
          0.06;
        const base =
          f.classList.contains("float-obj--phone") ? -12 :
          f.classList.contains("float-obj--watch") ? 8 :
          -6;
        f.style.transform = `translateY(${-y * speed}px) rotate(${base}deg)`;
      });
      ticking = false;
    });
    ticking = true;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
})();
