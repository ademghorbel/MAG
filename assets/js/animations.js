/**
 * ═══════════════════════════════════════════════
 *  MAG Portfolio — ANIMATION ENGINE v2
 *  Researa.tn-inspired: floating nav pill, clip-path
 *  reveals, card tilt, page loader, counters, line reveal.
 *  Mohamed Adam Ghorbel
 * ═══════════════════════════════════════════════
 */

/* ─── A. PAGE LOADER ─────────────────────────── */
function initLoader() {
  // Only on first visit per session
  if (sessionStorage.getItem("mag-loaded")) return;
  sessionStorage.setItem("mag-loaded", "1");

  const el = document.createElement("div");
  el.id = "mag-loader";
  el.innerHTML = `
    <div class="loader-half loader-half--l"></div>
    <div class="loader-half loader-half--r"></div>
    <div class="loader-wordmark">MAG<span class="loader-dot">.</span></div>
  `;
  document.body.prepend(el);
  document.body.style.overflow = "hidden";

  const tl = gsap.timeline({
    delay: 0.1,
    onComplete: () => { el.remove(); document.body.style.overflow = ""; }
  });
  tl.fromTo(".loader-wordmark",
      { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0.15)
    .to([".loader-half--l", ".loader-half--r"],
      { scaleX: 0, duration: 0.7, ease: "power4.inOut", stagger: 0 }, 0.95)
    .to(".loader-wordmark",
      { opacity: 0, duration: 0.2, ease: "power2.in" }, 1.0);
}

/* ─── B. FLOATING PILL NAVBAR ────────────────── */
function initNavPill() {
  const nav = document.querySelector("nav");
  if (!nav) return;
  const threshold = window.innerHeight * 0.08;
  const onScroll = () => {
    nav.classList.toggle("nav--floating", window.scrollY > threshold);
    nav.classList.toggle("nav--scrolled",  window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ─── C. HERO ENTRANCE ───────────────────────── */
function initHeroEntrance() {
  const eyebrow = document.querySelector(".hero-eyebrow");
  const words   = document.querySelectorAll(".hero-h1 .hero-word");
  const sub     = document.querySelector(".hero-sub");
  const btns    = document.querySelector(".hero-btns");
  const img     = document.querySelector(".hero-img");
  const panel   = document.querySelector(".hero-panel");
  if (!words.length) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (eyebrow)
    tl.fromTo(eyebrow, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.15);
  tl.fromTo(words,
    { y: "110%", opacity: 0 },
    { y: "0%", opacity: 1, duration: 0.85, stagger: 0.1 }, 0.3);
  if (sub)
    tl.fromTo(sub,  { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.72);
  if (btns)
    tl.fromTo(btns, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.88);
  if (img)
    tl.fromTo(img,  { clipPath: "inset(100% 0% 0% 0% round 24px)", opacity: 0 },
      { clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1, duration: 1.1, ease: "power2.out" }, 0.4);
  if (panel)
    tl.fromTo(panel, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" }, 0.5);
}

/* ─── D. PAGE-HERO (INNER PAGES) ─────────────── */
function initPageHero() {
  const hero = document.querySelector(".page-hero");
  if (!hero) return;
  const eyebrow = hero.querySelector(".eyebrow");
  const h1      = hero.querySelector("h1");
  const sub     = hero.querySelector(".sub");
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (eyebrow)
    tl.fromTo(eyebrow, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, 0.1);
  if (h1) {
    const lines = h1.querySelectorAll("span, em") || [h1];
    tl.fromTo(h1.childNodes.length > 1 ? Array.from(h1.childNodes).filter(n => n.nodeType !== 3) : [h1],
      { y: "105%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.8, stagger: 0.08 }, 0.25);
  }
  if (sub)
    tl.fromTo(sub, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.6);
}

/* ─── E. SCROLL REVEAL ───────────────────────── */
function initScrollReveal() {
  // Standard reveal
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.fromTo(el,
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });

  // Clip-path line reveal for headings
  gsap.utils.toArray("[data-clip-reveal]").forEach((el) => {
    gsap.fromTo(el,
      { clipPath: "inset(0% 100% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });

  // Stagger children
  gsap.utils.toArray("[data-stagger]").forEach((group) => {
    const children = group.querySelectorAll("[data-reveal-child]");
    if (!children.length) return;
    gsap.fromTo(children,
      { y: 36, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out",
        stagger: { amount: 0.4 },
        scrollTrigger: { trigger: group, start: "top 85%", once: true } });
  });

  // Section labels sweep in from left
  gsap.utils.toArray(".section-label").forEach((el) => {
    gsap.fromTo(el,
      { x: -24, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });
}

/* ─── F. ANIMATED COUNTERS ───────────────────── */
function initCounters() {
  gsap.utils.toArray("[data-counter]").forEach((el) => {
    const target  = parseInt(el.dataset.counter, 10);
    const suffix  = el.dataset.suffix || "";
    const prefix  = el.dataset.prefix || "";
    const obj     = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => { el.textContent = prefix + Math.round(obj.val) + suffix; },
        });
      },
    });
  });
}

/* ─── G. 3D CARD TILT ────────────────────────── */
function initCardTilt() {
  document.querySelectorAll(".card-tilt").forEach((card) => {
    let pending = false;
    card.addEventListener("mousemove", (e) => {
      if (pending) return;
      pending = true;
      // ponytail: rAF throttle stops getBoundingClientRect layout thrash on every mousemove
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        gsap.to(card, { rotationY: x * 10, rotationX: -y * 10, transformPerspective: 800, ease: "power2.out", duration: 0.3 });
        pending = false;
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
    });
  });
}

/* ─── H. PARALLAX ────────────────────────────── */
function initParallax() {
  gsap.utils.toArray("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.15;
    gsap.to(el, {
      y: () => -(el.offsetHeight * speed),
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top bottom", end: "bottom top", scrub: true,
      },
    });
  });
  // Glow background parallax
  const glow = document.querySelector(".hero-glow");
  if (glow) {
    gsap.to(glow, {
      y: "30%", ease: "none",
      scrollTrigger: { trigger: "body", start: "top top", end: "40% top", scrub: true },
    });
  }
}

/* ─── I. MAGNETIC BUTTONS ────────────────────── */
function initMagneticButtons() {
  document.querySelectorAll("[data-magnetic]").forEach((btn) => {
    const radius = parseInt(btn.dataset.magnetic) || 50;
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < radius) {
        const pull = (1 - dist / radius) * 0.38;
        gsap.to(btn, { x: dx*pull, y: dy*pull, duration: 0.3, ease: "power2.out" });
      }
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.4)" });
    });
  });
}

/* ─── J. CURSOR GLOW ─────────────────────────── */
function initCursorGlow() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;
  // ponytail: transform-only update = compositor only, zero repaints
  glow.style.willChange = "transform";
  window.addEventListener("mousemove", (e) => {
    glow.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
  });
}

/* ─── K. TICKER ──────────────────────────────── */
function initTicker() {
  const track = document.querySelector(".ticker-track");
  if (!track) return;
  // Duplicate for seamless loop
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);
  const anim = gsap.to([track, clone], {
    x: "-50%", duration: 28, ease: "none", repeat: -1,
    modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % (track.scrollWidth / 2)) },
  });
  // Pause on hover
  track.parentElement.addEventListener("mouseenter", () => anim.pause());
  track.parentElement.addEventListener("mouseleave", () => anim.resume());
}

/* ─── L. HORIZONTAL SCROLL ───────────────────── */
function initHorizontalScroll() {
  const section = document.querySelector(".h-scroll-section");
  if (!section) return;
  const track = section.querySelector(".h-scroll-track");
  if (!track) return;
  gsap.to(track, {
    x: () => -(track.scrollWidth - section.offsetWidth + 96),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => "+=" + (track.scrollWidth - section.offsetWidth + 96),
      invalidateOnRefresh: true,
    },
  });
}

/* ─── M. SPLIT TEXT ANIMATE ──────────────────── */
function splitAndAnimate(selector, options = {}) {
  const cfg = {
    stagger: 0.025, y: 40, opacity: 0, duration: 0.65, ease: "power3.out", delay: 0,
    ...options
  };
  document.querySelectorAll(selector).forEach((el) => {
    if (el.dataset.split) return;
    el.dataset.split = "true";
    const text = el.textContent;
    el.textContent = "";
    el.style.overflow = "hidden";
    text.split(" ").forEach((word, wi, arr) => {
      const ws = document.createElement("span");
      ws.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;";
      [...word].forEach((ch) => {
        const s = document.createElement("span");
        s.textContent = ch === " " ? "\u00a0" : ch;
        s.style.display = "inline-block";
        ws.appendChild(s);
      });
      el.appendChild(ws);
      if (wi < arr.length - 1) {
        const sp = document.createElement("span");
        sp.textContent = "\u00a0";
        sp.style.display = "inline-block";
        el.appendChild(sp);
      }
    });
    const chars = el.querySelectorAll("span > span");
    gsap.fromTo(chars,
      { y: cfg.y, opacity: cfg.opacity },
      { y: 0, opacity: 1, duration: cfg.duration, ease: cfg.ease,
        stagger: cfg.stagger, delay: cfg.delay,
        scrollTrigger: el.closest("[data-split-scroll]")
          ? { trigger: el, start: "top 85%" } : null });
  });
}

/* ─── N. LINE REVEAL (about paragraphs) ─────── */
function initLineReveal() {
  gsap.utils.toArray(".about-p").forEach((p, i) => {
    gsap.fromTo(p,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
        delay: i * 0.06,
        scrollTrigger: { trigger: p, start: "top 90%", once: true } });
  });
}

/* ─── O. BARBA PAGE TRANSITIONS ──────────────── */
function initBarba() {
  if (typeof barba === "undefined") return;
  barba.init({
    preventRunning: true,
    transitions: [{
      name: "clip-wipe",
      async leave(data) {
        await gsap.to(data.current.container, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.45, ease: "power2.inOut"
        });
      },
      beforeEnter(data) {
        gsap.set(data.next.container, { clipPath: "inset(100% 0% 0% 0%)" });
        MAG_Controller.setup(data.next.namespace);
      },
      async enter(data) {
        await gsap.to(data.next.container, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.55, ease: "power3.out"
        });
      },
      async after() {
        initPageAnimations();
        initMagneticButtons();
        MAG_Controller.setActiveNav();
      },
    }],
  });
}

/* ─── P. BORDER GLOW ─────────────────────────── */
function initBorderGlow() {
  document.querySelectorAll('.card-hover:not(.stack-card)').forEach(card => {
    if (card.querySelector('.edge-light')) return;
    card.classList.add('border-glow-card');
    const el = document.createElement('span');
    el.className = 'edge-light';
    card.insertBefore(el, card.firstChild);
    card.addEventListener('pointermove', (e) => {
      if (card._bp) return; card._bp = true;
      requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const cx = r.width / 2, cy = r.height / 2;
        const dx = x - cx, dy = y - cy;
        const kx = dx ? cx / Math.abs(dx) : Infinity;
        const ky = dy ? cy / Math.abs(dy) : Infinity;
        const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
        let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;
        card.style.setProperty('--edge-proximity', (edge * 100).toFixed(2));
        card.style.setProperty('--cursor-angle', `${angle.toFixed(2)}deg`);
        card._bp = false;
      });
    });
  });
}

/* ─── MASTER INIT ────────────────────────────── */
function initPageAnimations() {
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }
  initHeroEntrance();
  initPageHero();
  initScrollReveal();
  initParallax();
  initCounters();
  initCardTilt();
  initLineReveal();
  splitAndAnimate("[data-split]");
  initTicker();
  initHorizontalScroll();
  initBorderGlow();
}
