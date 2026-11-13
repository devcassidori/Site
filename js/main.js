/* Landing page — interações, efeitos 3D e animações de scroll. */
(() => {
  const P = window.PROFILE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const animate = hasGsap && !reduce;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tagsHTML = (arr = []) => (arr.length ? `<div class="tags">${arr.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : "");
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  const SECTIONS = [
    { id: "sobre", label: "Sobre" },
    { id: "experiencia", label: "Experiência" },
    { id: "formacao", label: "Formação" },
    { id: "skills", label: "Skills" },
    { id: "certificados", label: "Certificados" },
    { id: "contato", label: "Contato" },
  ];
  const num = (i) => String(i + 1).padStart(2, "0");

  /* =================== RENDER =================== */
  $$("[data-link]").forEach((a) => (a.href = P.links[a.dataset.link]));
  $("[data-headline]").textContent = P.headline;
  $("#year").textContent = new Date().getFullYear();

  $("#navLinks").innerHTML = SECTIONS.map((s, i) => `<a href="#${s.id}" data-nav="${s.id}" data-magnetic><span>${num(i)}</span>${s.label}</a>`).join("");
  $("#menuLinks").innerHTML = SECTIONS.map((s, i) => `<a href="#${s.id}" data-nav="${s.id}"><span>${num(i)}</span>${s.label}</a>`).join("");

  // Marquee
  const mq = ["Full Stack", "C# .NET", "React", "TypeScript", "Python", "IA Generativa", "Azure", "AWS", "Clean Architecture", "Next.js"];
  const chunk = mq.map((w) => `<span>${esc(w)}</span><i>✦</i>`).join("");
  $("#marquee").innerHTML = chunk + chunk;

  // Sobre
  $("#aboutText").innerHTML = P.about.map((p) => `<p data-anim>${esc(p)}</p>`).join("");
  $("#offCode").innerHTML = P.offCode
    .map((o) => `<div class="off card" data-tilt data-anim><span class="off__icon" aria-hidden="true">${o.icon}</span><h4>${esc(o.title)}</h4><p>${esc(o.text)}</p></div>`)
    .join("");
  $("#langs").innerHTML = P.languages
    .map((l) => `<div class="lang" data-anim><div class="lang__top">${esc(l.name)}<span>${esc(l.level)}</span></div><div class="lang__bar"><i style="--w:${l.pct}%"></i></div></div>`)
    .join("");

  // Experiência
  $("#expList").innerHTML = P.experience
    .map(
      (e) => `
      <li class="tl__item">
        <div class="tl__node"><span>${e.highlight ? "⬢" : "◆"}</span></div>
        <div class="tl__date">${esc(e.period)}</div>
        <article class="tl__card card" data-tilt>
          <span class="tl__place">// ${esc(e.place)}</span>
          <h3 class="tl__title">${esc(e.title)}</h3>
          <p class="tl__org">${esc(e.org)}</p>
          <ul class="tl__points">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          ${e.highlight ? `<div class="tl__hl"><b>★ ${esc(e.highlight.title)}</b><p>${esc(e.highlight.text)}</p></div>` : ""}
          ${tagsHTML(e.tags)}
        </article>
      </li>`
    )
    .join("");

  // Formação
  $("#eduList").innerHTML = P.education
    .map(
      (e, i) => `
      <article class="edu-card" data-anim>
        <div class="edu-card__inner card">
          <header class="edu-card__head">
            <span class="edu-card__abbr" aria-hidden="true">${esc(e.abbr)}</span>
            <div class="edu-card__meta">
              <span class="edu-card__degree">${esc(e.degree)}</span>
              <h3 class="edu-card__title">${esc(e.title)}</h3>
              <p class="edu-card__org">${esc(e.org)}</p>
            </div>
            <div class="edu-card__side">
              <span class="edu-card__period">${esc(e.period)}</span>
            </div>
          </header>
          <div class="edu-card__body" id="edu-body-${i}">
            <ul class="edu-card__points">
              ${e.points.map((p) => `<li><b>${esc(p.h)}</b><span>${esc(p.t)}</span></li>`).join("")}
            </ul>
            ${tagsHTML(e.tags)}
          </div>
          <button class="edu-card__toggle" type="button" aria-expanded="false" aria-controls="edu-body-${i}">
            <span>ver grade do curso</span><i aria-hidden="true">＋</i>
          </button>
        </div>
      </article>`
    )
    .join("");
  const eduCollapsible = matchMedia("(max-width: 768px)");
  function setEdu(card, open, anim = true) {
    const body = $(".edu-card__body", card), btn = $(".edu-card__toggle", card);
    btn.setAttribute("aria-expanded", open);
    $("span", btn).textContent = open ? "recolher" : "ver grade do curso";
    card.classList.toggle("is-open", open);
    if (!animate || !anim) { body.style.height = open ? "auto" : "0px"; if (hasGsap) ScrollTrigger.refresh(); return; }
    gsap.fromTo(body, { height: body.offsetHeight }, { height: open ? "auto" : 0, duration: 0.6, ease: "expo.out", onComplete: () => ScrollTrigger.refresh() });
    if (open) gsap.from($$("li", body), { opacity: 0, x: -20, duration: 0.6, stagger: 0.05, ease: "expo.out", clearProps: "transform,opacity" });
  }
  const syncEdu = () => $$(".edu-card").forEach((c) => setEdu(c, !eduCollapsible.matches, false));
  eduCollapsible.addEventListener("change", syncEdu);
  syncEdu();
  $$(".edu-card__toggle").forEach((b) => b.addEventListener("click", () => {
    const card = b.closest(".edu-card");
    setEdu(card, !card.classList.contains("is-open"));
  }));

  // Skills
  $("#skillGroups").innerHTML = P.skillGroups
    .map((g) => `<div class="sg card" data-anim><h3><span>${g.icon}</span>${esc(g.name)}</h3>${tagsHTML(g.items)}</div>`)
    .join("");

  // Certificados
  const orgMark = { Google: "G", Oracle: "O", Certiprof: "CP" };
  $("#certList").innerHTML = P.certificates
    .map(
      (c) => `
      <article class="cert" data-tilt>
        <div class="cert__shine" aria-hidden="true"></div>
        <div class="cert__top">
          <span class="cert__seal" aria-hidden="true"><span>${esc(orgMark[c.org] || c.org[0])}</span></span>
          <div class="cert__issuer"><b>${esc(c.org)}</b><span>emitido em ${esc(c.issued)}</span></div>
        </div>
        <h3 class="cert__title">${esc(c.title)}</h3>
        <dl class="cert__meta">
          <div><dt>validade</dt><dd>${c.expires ? "até " + esc(c.expires) : "sem expiração"}</dd></div>
          ${c.code ? `<div><dt>credencial</dt><dd class="mono">${esc(c.code)}</dd></div>` : ""}
        </dl>
        ${tagsHTML(c.skills)}
        ${c.url ? `<a class="cert__link" href="${esc(c.url)}" target="_blank" rel="noopener">Exibir credencial <span aria-hidden="true">↗</span></a>` : ""}
      </article>`
    )
    .join("");

  // Contato
  const L = P.links;
  const contacts = [
    { ico: "in", t: "LinkedIn", s: "in/lucascassidori", href: L.linkedin },
    { ico: "gh", t: "GitHub", s: "devcassidori", href: L.github },
    { ico: "@", t: "E-mail", s: L.email, href: "mailto:" + L.email },
    { ico: "wa", t: "WhatsApp", s: "Mande uma mensagem", href: L.whatsapp },
    { ico: "ig", t: "Instagram", s: "@lucassidori", href: L.instagram },
    { ico: "cv", t: "Currículo", s: "Baixar PDF", href: L.cv },
  ];
  $("#contactGrid").innerHTML = contacts
    .map(
      (c) => `
      <a class="cl" href="${esc(c.href)}" ${c.href.startsWith("mailto") ? "" : 'target="_blank" rel="noopener"'} data-anim>
        <span class="cl__ico" aria-hidden="true">${c.ico}</span>
        <span class="cl__txt"><b>${c.t}</b><span>${esc(c.s)}</span></span>
        <span class="cl__arrow" aria-hidden="true">↗</span>
      </a>`
    )
    .join("");
  // Luz que segue o mouse dentro de cada contato
  $$(".cl").forEach((el) =>
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", e.clientX - r.left + "px");
      el.style.setProperty("--y", e.clientY - r.top + "px");
    })
  );

  // Split do nome em letras
  $$(".hero__line").forEach((line) => {
    line.innerHTML = [...line.textContent].map((c) => `<span class="ch">${c}</span>`).join("");
  });

  /* =================== BOOT =================== */
  const bootLines = [
    "> inicializando cassidori.os v6.0 ...",
    "> carregando módulos: [.net] [react] [ai] <span class=ok>OK</span>",
    "> sincronizando linkedin + github ... <span class=ok>OK</span>",
    "> compilando café ☕ ................ <span class=ok>OK</span>",
    "> renderizando grid holográfico ..... <span class=ok>OK</span>",
    "> bem-vindo.",
  ];
  function boot() {
    return new Promise((resolve) => {
      if (reduce) return resolve();
      const log = $("#bootLog"), bar = $("#bootBar"), pct = $("#bootPct");
      let i = 0;
      (function step() {
        log.innerHTML = bootLines.slice(0, i + 1).join("\n");
        const p = Math.round(((i + 1) / bootLines.length) * 100);
        bar.style.width = p + "%";
        pct.textContent = p;
        i++;
        i < bootLines.length ? setTimeout(step, 210) : setTimeout(resolve, 340);
      })();
    });
  }

  /* =================== SCROLL BASE =================== */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true, easing: (t) => 1 - Math.pow(1 - t, 4) });
    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
    lenis.stop();
  }
  const nav = $("#nav"), bar = $("#progressBar");
  const navOffset = () => -(nav.offsetHeight + 8);
  function goTo(target, immediate = false) {
    const el = typeof target === "string" ? $(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: el.id === "top" ? 0 : navOffset(), immediate, duration: 1.2 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + (el.id === "top" ? 0 : navOffset()), behavior: reduce || immediate ? "auto" : "smooth" });
  }

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    nav.classList.toggle("is-scrolled", scrollY > 40);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* =================== MENU MOBILE =================== */
  const burger = $("#burger"), menu = $("#menu");
  function setMenu(open) {
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", !open);
    document.body.classList.toggle("menu-open", open);
    if (lenis) open ? lenis.stop() : lenis.start();
  }
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  addEventListener("keydown", (e) => e.key === "Escape" && menu.classList.contains("is-open") && setMenu(false));
  matchMedia("(min-width: 1025px)").addEventListener("change", (e) => e.matches && setMenu(false));

  /* =================== NAVEGAÇÃO (âncoras + scroll-spy) =================== */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const el = id === "#top" ? $("#top") : $(id);
    if (!el) return;
    e.preventDefault();
    const wasOpen = menu.classList.contains("is-open");
    if (wasOpen) setMenu(false);
    setTimeout(() => goTo(el), wasOpen ? 250 : 0);
    history.replaceState(null, "", id === "#top" ? location.pathname : id);
  });

  function setActive(id) {
    $$("[data-nav]").forEach((a) => {
      const on = a.dataset.nav === id;
      a.classList.toggle("is-active", on);
      on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current");
    });
  }
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => spy.observe($("#" + s.id)));
    new IntersectionObserver((en) => en[0].isIntersecting && setActive(null), { rootMargin: "-45% 0px -50% 0px" }).observe($("#hero"));
  }

  /* =================== EFEITOS =================== */
  if (fine && !reduce) {
    const cur = $("#cursor");
    let cx = innerWidth / 2, cy = innerHeight / 2, x = cx, y = cy;
    addEventListener("pointermove", (e) => { cx = e.clientX; cy = e.clientY; });
    (function loop() { x += (cx - x) * 0.2; y += (cy - y) * 0.2; cur.style.transform = `translate(${x}px, ${y}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("pointerover", (e) => cur.classList.toggle("is-hover", !!e.target.closest("a, button, [data-tilt]")));
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        hasGsap ? gsap.to(el, { x: dx * 0.25, y: dy * 0.35, duration: 0.4, ease: "power3.out", overwrite: "auto" }) : (el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`);
      });
      el.addEventListener("pointerleave", () => (hasGsap ? gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)", overwrite: "auto" }) : (el.style.transform = "")));
    });
  } else {
    $("#cursor").style.display = "none";
  }

  // Tilt 3D (só com mouse)
  if (fine && !reduce) {
    $$("[data-tilt]").forEach((el) => {
      const isHero = el.classList.contains("holo-frame");
      const base = isHero ? { rotationY: -10, rotationX: 4, z: 0 } : { rotationY: 0, rotationX: 0, z: 0 };
      const max = isHero ? 12 : 8;
      const set = (v) =>
        hasGsap
          ? gsap.to(el, { ...v, transformPerspective: 1000, duration: 0.6, ease: "power3.out", overwrite: "auto" })
          : (el.style.transform = `perspective(1000px) rotateY(${v.rotationY}deg) rotateX(${v.rotationX}deg) translateZ(${v.z}px)`);
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        set({ rotationY: (px - 0.5) * max * 2, rotationX: (0.5 - py) * max * 2, z: isHero ? 30 : 10 });
        el.style.setProperty("--mx", px * 100 + "%");
        el.style.setProperty("--my", py * 100 + "%");
      });
      el.addEventListener("pointerleave", () => set(base));
    });
  }

  // Glitch periódico
  if (!reduce) {
    $$(".glitch").forEach((g) => {
      (function fire() {
        g.classList.add("is-glitching");
        setTimeout(() => g.classList.remove("is-glitching"), 360);
        setTimeout(fire, 2400 + Math.random() * 3200);
      })();
    });
  }

  // Esfera 3D de skills (só anima quando visível)
  const sphere = $("#sphere"), stage = $("#sphereStage");
  const tagEls = P.sphereSkills.map((s) => {
    const t = document.createElement("span");
    t.className = "tag"; t.textContent = s; sphere.appendChild(t); return t;
  });
  const N = tagEls.length;
  const pts = tagEls.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i + 1) / N), theta = Math.sqrt(N * Math.PI) * phi;
    return [Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi)];
  });
  let ax = 0.3, ay = 0, vx = 0.0025, vy = 0.004, dragging = false, lx = 0, ly = 0, sphereOn = false, sphereRaf = 0;
  stage.addEventListener("pointerdown", (e) => { dragging = true; lx = e.clientX; ly = e.clientY; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    vy = (e.clientX - lx) * 0.0008; vx = (e.clientY - ly) * -0.0008; lx = e.clientX; ly = e.clientY;
  });
  ["pointerup", "pointercancel"].forEach((ev) => stage.addEventListener(ev, () => (dragging = false)));
  function sphereLoop() {
    cancelAnimationFrame(sphereRaf);
    const R = stage.clientWidth * 0.4;
    ax += vx; ay += vy;
    if (!dragging) { vx += (0.0015 - vx) * 0.02; vy += (0.004 - vy) * 0.02; }
    const ca = Math.cos(ax), sa = Math.sin(ax), cb = Math.cos(ay), sb = Math.sin(ay);
    for (let i = 0; i < N; i++) {
      const [x, y, z] = pts[i];
      const y1 = y * ca - z * sa, z1 = y * sa + z * ca;
      const x2 = x * cb + z1 * sb, z2 = -x * sb + z1 * cb;
      const s = (z2 + 2) / 3;
      tagEls[i].style.transform = `translate(-50%, -50%) translate3d(${x2 * R}px, ${y1 * R}px, ${z2 * R}px)`;
      tagEls[i].style.opacity = 0.2 + s * 0.8;
      tagEls[i].style.zIndex = Math.round(s * 100);
    }
    if (sphereOn && !reduce) sphereRaf = requestAnimationFrame(sphereLoop);
  }
  sphereLoop();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => { sphereOn = en.isIntersecting; if (sphereOn) sphereLoop(); }).observe(stage);
  }

  // Typewriter
  const code = [
    ["c", "// quem sou eu, em TypeScript\n"],
    ["k", "const "], ["p", "lucas"], ["", " = {\n"],
    ["", "  role: "], ["s", `"${P.role}"`], ["", ",\n"],
    ["", "  base: "], ["s", `"${P.location}"`], ["", ",\n"],
    ["", "  degrees: ["], ["s", '"Eng. Computação"'], ["", ", "], ["s", '"MBA Eng. Software"'], ["", ", "], ["s", '"Pós Eng. de IA"'], ["", "],\n"],
    ["", "  back: ["], ["s", '"C#"'], ["", ", "], ["s", '".NET"'], ["", ", "], ["s", '"Python"'], ["", "],\n"],
    ["", "  front: ["], ["s", '"React"'], ["", ", "], ["s", '"Next.js"'], ["", ", "], ["s", '"TS"'], ["", "],\n"],
    ["", "  ai: ["], ["s", '"LLMs"'], ["", ", "], ["s", '"Agents"'], ["", ", "], ["s", '"MCP"'], ["", "],\n"],
    ["", "  hobbies: ["], ["s", '"jiu-jitsu 🥋"'], ["", ", "], ["s", '"games 🎮"'], ["", "],\n"],
    ["", "};\n\n"],
    ["k", "await "], ["p", "lucas"], ["", ".build("], ["s", '"seu próximo projeto"'], ["", ");"],
  ];
  let typed = false;
  function typeCode() {
    if (typed) return;
    typed = true;
    const out = $("#typeCode");
    const full = code.map(([c, t]) => (c ? `<span class="${c}">${esc(t)}</span>` : esc(t))).join("");
    if (reduce) return (out.innerHTML = full);
    let seg = 0, ch = 0, html = "";
    (function step() {
      if (seg >= code.length) return;
      const [c, t] = code[seg];
      ch++;
      const part = esc(t.slice(0, ch));
      out.innerHTML = html + (c ? `<span class="${c}">${part}</span>` : part);
      if (ch >= t.length) { html = out.innerHTML; seg++; ch = 0; }
      setTimeout(step, 12 + Math.random() * 26);
    })();
  }
  /* =================== ANIMAÇÕES DE ENTRADA =================== */
  // IntersectionObserver: robusto quando a altura da página muda (cards expansíveis)
  function onVisible(els, from, to, cb) {
    if (!els.length) return;
    if (!animate || !("IntersectionObserver" in window)) { cb && els.forEach(cb); return; }
    gsap.set(els, from);
    let queue = [], timer = 0;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { queue.push(e.target); io.unobserve(e.target); } });
      clearTimeout(timer);
      timer = setTimeout(() => {
        const batch = queue; queue = [];
        if (!batch.length) return;
        gsap.to(batch, { ...to, stagger: 0.08, overwrite: "auto", clearProps: "transform,opacity" });
        cb && batch.forEach(cb);
      }, 40);
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });
    els.forEach((el) => io.observe(el));
  }
  const once = (el, fn, margin = "0px 0px -10% 0px") => {
    if (!("IntersectionObserver" in window)) return fn();
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); fn(); } }, { rootMargin: margin });
    io.observe(el);
  };

  function setupSections() {
    // Títulos das seções giram em 3D ao entrar
    onVisible($$(".section__head > *:not(.section__idx)"),
      { opacity: 0, y: 50, rotateX: -60, transformPerspective: 800, transformOrigin: "50% 100%" },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.1, ease: "expo.out" });

    // Conteúdo genérico
    onVisible($$("#sobre [data-anim], #skills [data-anim], #formacao [data-anim]"),
      { opacity: 0, y: 50, rotateX: 18, transformPerspective: 1000 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "expo.out" });

    // Sobre: terminal + contadores + idiomas
    once($(".about__grid"), () => setTimeout(typeCode, 300));
    if (animate) {
      gsap.from(".terminal", { rotateY: 30, rotateX: 8, z: -260, opacity: 0, transformPerspective: 1200, duration: 1.3, ease: "expo.out",
        scrollTrigger: { trigger: ".about__grid", start: "top 85%", once: true } });
      once($("#langs"), () => gsap.from(".lang__bar i", { scaleX: 0, duration: 1.4, ease: "expo.out", stagger: 0.15 }));
    }

    // Certificados: entram virando
    onVisible($$(".cert"),
      { opacity: 0, rotateY: -70, z: -200, transformPerspective: 1200, transformOrigin: "0% 50%" },
      { opacity: 1, rotateY: 0, z: 0, duration: 1.2, ease: "expo.out" });

    // Contato
    onVisible($$(".cl"), { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "expo.out" });

    // Skills
    if (animate) gsap.from(".sphere-stage", { scale: 0.4, rotate: -90, opacity: 0, duration: 1.5, ease: "expo.out",
      scrollTrigger: { trigger: ".stack__wrap", start: "top 80%", once: true } });

    // Experiência: trilho + cards 3D
    const tl = $("#tlExp"), fill = $(".tl__fill", tl), head = $(".tl__head", tl);
    if (!animate) { $$(".tl__item", tl).forEach((i) => i.classList.add("is-active")); fill.style.transform = "scaleY(1)"; return; }
    ScrollTrigger.create({
      trigger: tl, start: "top 60%", end: "bottom 60%", scrub: true,
      onUpdate: (self) => { gsap.set(fill, { scaleY: self.progress }); gsap.set(head, { top: self.progress * tl.offsetHeight }); },
    });
    ScrollTrigger.matchMedia({
      "(min-width: 861px)": () => expTimeline(false),
      "(max-width: 860px)": () => expTimeline(true),
    });
    function expTimeline(mobile) {
      $$(".tl__item", tl).forEach((item, i) => {
        const card = $(".tl__card", item), date = $(".tl__date", item), node = $(".tl__node", item);
        const dir = mobile ? 1 : i % 2 === 0 ? -1 : 1;
        gsap.timeline({
          scrollTrigger: {
            trigger: item, start: "top 88%", end: "top 45%", scrub: 0.8,
            onEnter: () => item.classList.add("is-active"),
            onLeaveBack: () => item.classList.remove("is-active"),
          },
        })
          .from(card, { rotateY: dir * (mobile ? 30 : 70), rotateX: 10, x: dir * (mobile ? 30 : 110), z: -220, opacity: 0, transformPerspective: 1200, ease: "power3.out" })
          .from(date, { x: (mobile ? 1 : -dir) * 60, opacity: 0, filter: "blur(8px)", ease: "power3.out" }, 0)
          .from(node, { scale: 0, rotate: 225, ease: "back.out(2)" }, 0);
      });
    }
  }

  /* =================== INTRO + SCROLL GLOBAL =================== */
  function intro() {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to("#boot", { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut" })
      .set("#boot", { display: "none" })
      .from(".hero__line .ch", { yPercent: 120, rotateX: -90, opacity: 0, duration: 1.3, stagger: 0.035 }, "-=0.35")
      .from(".badge-holo", { scaleX: 0, opacity: 0, duration: 0.9 }, "-=0.9")
      .from([".hero .eyebrow", ".hero__lead", ".hero__actions"], { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.8")
      .from(".holo-frame", { rotateY: -70, rotateX: 25, z: -400, opacity: 0, duration: 1.6 }, "-=1.4")
      .from(".float-chip", { scale: 0, opacity: 0, duration: 0.8, stagger: 0.12, ease: "back.out(2)" }, "-=0.9")
      .from(".nav > *", { y: -30, opacity: 0, duration: 0.8, stagger: 0.08, clearProps: "transform,opacity" }, "-=1");
    // Proteção: se o navegador pausar as animações, finaliza a intro
    setTimeout(() => tl.progress() < 1 && tl.progress(1), 6000);
  }

  function globalScroll() {
    gsap.to(".hero__copy", { yPercent: -25, opacity: 0, rotateX: 20, transformPerspective: 900, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero__visual", { yPercent: 20, rotateY: 25, scale: 0.88, opacity: 0.2, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    $$("[data-depth]").forEach((el) =>
      gsap.to(el, { y: -+el.dataset.depth * 2.5, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } })
    );
    gsap.fromTo("#marquee", { xPercent: 0 }, { xPercent: -50, ease: "none", scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 0.5 } });
    $$(".section__idx").forEach((n) =>
      gsap.fromTo(n, { yPercent: 30 }, { yPercent: -30, ease: "none", scrollTrigger: { trigger: n.parentElement, start: "top bottom", end: "bottom top", scrub: true } })
    );
  }

  setupSections();
  boot().then(() => {
    document.body.classList.remove("is-loading");
    lenis && lenis.start();
    if (!animate) $("#boot").remove();
    else { intro(); globalScroll(); }
    const h = location.hash && $(location.hash);
    if (h) setTimeout(() => goTo(h), animate ? 1200 : 0);
    if (hasGsap) ScrollTrigger.refresh();
  });
})();
