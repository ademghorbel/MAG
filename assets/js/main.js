/**
 * MAG Portfolio — THE CONTROLLER (main.js)
 * Fixed: nav prefix bug, mobile nav animation, scroll effect,
 * Projects page, full about page, active nav state.
 */

const MAG_Controller = {

  _prefix: "",

  renderNav(rootPrefix = "") {
    this._prefix = rootPrefix;
    const nav = document.querySelector("nav");
    if (!nav) return;
    nav.innerHTML = `
      <a href="${rootPrefix}index.html" class="nav-logo">MAG<span>.</span></a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="nav-links" role="list">
        <li><a href="${rootPrefix}index.html">Home</a></li>
        <li><a href="${rootPrefix}about.html">About</a></li>
        <li><a href="${rootPrefix}work.html">Work</a></li>
        <li><a href="${rootPrefix}projects.html">Projects</a></li>
        <li><a href="${rootPrefix}events/index.html">Volunteering</a></li>
      </ul>
      <a href="${rootPrefix}contact.html" class="nav-cta" data-magnetic="60">Get in touch</a>
    `;
    const toggle = nav.querySelector("#nav-toggle");
    const links  = nav.querySelector("#nav-links");
    toggle?.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
      // prevent body scroll when menu is open
      document.body.style.overflow = open ? "hidden" : "";
    });
    // Close menu on link click
    links?.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle?.classList.remove("open");
        toggle?.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
    this.setActiveNav();
  },

  setActiveNav() {
    const page = (document.body.dataset.page || "").toLowerCase();
    // Map data-page values to the nav link text they correspond to
    const pageToLabel = {
      "home":         "Home",
      "about":        "About",
      "work":         "Work",
      "projects":     "Projects",
      "events":       "Volunteering",
      "events-detail": "Volunteering",
    };
    const activeLabel = pageToLabel[page];
    document.querySelectorAll(".nav-links a").forEach(a => {
      a.classList.remove("active");
      if (activeLabel && a.textContent.trim() === activeLabel) {
        a.classList.add("active");
      }
    });
  },

  renderFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const d = MAG_DATA.profile;
    footer.innerHTML = `
      <p>© ${new Date().getFullYear()} ${d.name} · ${d.role} · ${d.location}</p>
      <p>IEEE ENETCOM SB &nbsp;·&nbsp; Starwaves &nbsp;·&nbsp; ENET'Com Sfax</p>
    `;
  },

  setup(namespace) {
    this.renderFooter();
    switch (namespace) {
      case "home":         this.setupHome();        break;
      case "about":        this.setupAbout();       break;
      case "work":         this.setupWork();        break;
      case "projects":     this.setupProjects();    break;
      case "contact":      this.setupContact();     break;
      case "events":       this.setupEvents();      break;
      case "event-detail": this.setupEventDetail(); break;
    }
  },

  /* ── HOME ──────────────────────────────── */
  setupHome() {
    const cardsContainer = document.getElementById("overview-cards");
    if (cardsContainer) {
      cardsContainer.innerHTML = MAG_DATA.overviewCards.map(card => `
        <div class="card-hover overview-card" data-reveal-child>
          <div class="card-label">${card.label}</div>
          <div class="card-title">${card.title}</div>
          ${card.sub ? `<div class="card-sub">${card.sub}</div>` : ""}
          ${card.badge ? `<div class="card-badge-wrap"><span class="badge badge--${card.badgeColor||"blue"}">${card.badge}</span></div>` : ""}
          ${card.chips ? `<div class="chip-row">${card.chips.map(c => `<span class="chip">${c}</span>`).join("")}</div>` : ""}
        </div>
      `).join("");
    }

    const hscrollTrack = document.getElementById("hscroll-work");
    if (hscrollTrack) {
      let html = MAG_DATA.videos.slice(0, 3).map(v => `
        <div class="h-scroll-card card-hover artwork" style="cursor:pointer" onclick="openHomeVideoModal('${v.url}', '${v.title.replace(/'/g, "\\'")}')">
          <div class="h-scroll-card-img" style="background:#111;position:relative;overflow:hidden;">
            <img src="${v.thumb || ''}" alt="${v.title}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.4s cubic-bezier(0.16,1,0.3,1)" loading="lazy"
              onerror="this.style.display='none'; this.parentElement.style.background='var(--card-bg)'"
              onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:56px;height:56px;filter:drop-shadow(0 4px 16px rgba(0,0,0,0.5));opacity:0.9">
                <circle cx="40" cy="40" r="40" fill="rgba(0,0,0,0.55)"/>
                <path d="M32 26L58 40L32 54V26Z" fill="white"/>
              </svg>
            </div>
          </div>
          <div class="h-scroll-card-body">
            <div class="h-scroll-card-title">${v.title}</div>
            <div class="h-scroll-card-sub">${v.client}</div>
            <div class="project-tags" style="margin-top:10px">${v.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
          </div>
        </div>
      `).join("");
      html += `<a href="videos.html" class="h-scroll-card card-hover artwork" style="display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--card-bg);text-decoration:none;"><h3 style="margin-bottom:8px;">Show more</h3><p style="color:var(--muted);font-size:14px;">View all video projects →</p></a>`;
      hscrollTrack.innerHTML = html;
    }

    const logosGrid = document.getElementById("event-logos-grid");
    if (logosGrid) {
      logosGrid.innerHTML = MAG_DATA.events.map(ev => `
        <a href="events/${ev.id}.html" class="event-logo-card card-hover" onmouseover="this.classList.add('elc--hover')" onmouseout="this.classList.remove('elc--hover')">
          <div class="elc-img">
            <img src="${ev.logo}" alt="${ev.title}"
              onerror="this.parentElement.innerHTML='<span class=\\'elc-img-fallback\\'>${ev.id}</span>'">
          </div>
          <div class="elc-body">
            <div class="elc-route">
              <div class="elc-endpoint">
                <p class="elc-ep-label">No.</p>
                <p class="elc-ep-code">${ev.index}</p>
              </div>
              <div class="elc-mid">
                <div class="elc-mid-connector">
                  <span class="elc-mid-line"></span>
                  <span class="elc-mid-line"></span>
                </div>
              </div>
              <div class="elc-endpoint elc-endpoint--right">
                <p class="elc-ep-label">Year</p>
                <p class="elc-ep-code">${ev.date}</p>
              </div>
            </div>
            <div class="elc-divider"></div>
            <p class="elc-title">${ev.title}</p>
            <p class="elc-role-line">${ev.role}</p>
          </div>
        </a>
      `).join('');

      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.style.opacity = '1', i * 60);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      logosGrid.querySelectorAll('.event-logo-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transition += ', opacity 0.5s ease';
        obs.observe(card);
      });
    }

    const artObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); artObs.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.artwork').forEach(el => artObs.observe(el));

    window.openHomeVideoModal = function(url, title) {
      const modal = document.getElementById('homeVideoModal');
      document.getElementById('homeModalFrame').src = url;
      document.getElementById('homeModalTitle').textContent = title;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };
    window.closeHomeVideoModal = function(event) {
      if (event.target === event.currentTarget || event.target.tagName === 'BUTTON') {
        const modal = document.getElementById('homeVideoModal');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.getElementById('homeModalFrame').src = '';
      }
    };
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('homeVideoModal');
        if (modal && modal.style.display !== 'none') {
          modal.style.display = 'none';
          document.body.style.overflow = '';
          document.getElementById('homeModalFrame').src = '';
        }
      }
    });
  },

  /* ── ABOUT ─────────────────────────────── */
  setupAbout() {
    // Experience timeline
    const expEl = document.getElementById("experience-list");
    if (expEl) {
      expEl.innerHTML = MAG_DATA.experience.map(exp => `
        <div class="exp-item card-hover" data-reveal>
          <div class="exp-bar exp-bar--${exp.statusColor||"blue"}"></div>
          <div class="exp-company">${exp.company}</div>
          <div class="exp-role">${exp.role}</div>
          <div class="exp-type exp-type--${exp.statusColor||"blue"}">${exp.type} · ${exp.date}</div>
          <p class="exp-desc">${exp.description}</p>
          ${exp.stack ? `<div class="chip-row" style="margin-top:12px">${exp.stack.map(s=>`<span class="chip">${s}</span>`).join("")}</div>` : ""}
        </div>
      `).join("");
    }

    // Education
    const eduEl = document.getElementById("education-list");
      if (eduEl) {
        eduEl.innerHTML = MAG_DATA.education.map(edu => `
          <div class="exp-item card-hover" data-reveal>
            <div class="exp-bar exp-bar--${edu.color}"></div>
            <div class="exp-company">${edu.school}</div>
            <div class="exp-role">${edu.degree}</div>
            <div class="exp-type exp-type--${edu.color}">${edu.period}</div>
            <p class="exp-desc">${edu.detail}</p>
          </div>
        `).join("");
      }

    // Design skills
    const dsEl = document.getElementById("design-skills-list");
    if (dsEl) {
      dsEl.innerHTML = MAG_DATA.designSkills.map(s => `<div class="skill-tag" data-reveal-child>${s}</div>`).join("");
    }

    // Tech skills
    const tsEl = document.getElementById("tech-skills-list");
    if (tsEl) {
      tsEl.innerHTML = MAG_DATA.techSkills.map(s => `<div class="skill-tag" data-reveal-child>${s}</div>`).join("");
    }

      const stackEl = document.getElementById("about-stack-list");
      if (stackEl) {
        const timeline = [
          ...MAG_DATA.experience.map(item => ({
            kind: item.type,
            accent: item.statusColor,
            meta: item.date,
            title: item.company,
            subtitle: `${item.role}`,
            description: item.description,
            tags: item.stack,
            logo: item.logo || null,
          })),
          ...MAG_DATA.education.map(item => ({
            kind: "Education",
            accent: item.color,
            meta: item.period,
            title: item.school,
            subtitle: item.degree,
            description: item.detail,
            tags: [],
            logo: item.logo || null,
          })),
        ];

        stackEl.innerHTML = timeline.map((item, index) => `
          <article class="stack-card card-hover" data-stack-card style="--stack-index:${index};--stack-accent:var(--${item.accent});">
            <div class="stack-card-topline"></div>
            <div class="stack-card-head-row">
              ${item.logo ? `<div class="stack-card-logo"><img src="${item.logo}" alt="${item.title} logo" loading="lazy"></div>` : ""}
              <div class="stack-card-head-text">
                <div class="stack-card-meta">${item.kind} · ${item.meta}</div>
                <div class="stack-card-title">${item.title}</div>
                <div class="stack-card-subtitle">${item.subtitle}</div>
              </div>
            </div>
            <p class="stack-card-desc">${item.description}</p>
            ${item.tags.length ? `<div class="stack-card-tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>` : ""}
          </article>
        `).join("");
      }
  },

  /* ── WORK (Design) ─────────────────────── */
  setupWork() {
    const listEl = document.getElementById("design-work-list");
    if (listEl) {
      listEl.innerHTML = MAG_DATA.designWork.map(p => `
        <div class="project-row" data-reveal-child style="cursor:default;">
          <div class="project-info">
            ${p.logo ? `<div class="stack-card-logo" style="margin-bottom:14px"><img src="${p.logo}" alt="${p.title} logo" loading="lazy"></div>` : ""}
            <div class="project-title">${p.title}</div>
            <div class="project-client">${p.client}</div>
          </div>
          <div class="project-body">
            <div class="project-desc">${p.description}</div>
            <div class="project-tags" style="margin-bottom:16px;">${p.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              ${p.images && p.images.length > 0 ? `<button class="btn-primary" onclick="if(window.openProjectModal) window.openProjectModal(event, '${p.id}')">View more details</button>` : ""}
              ${p.link !== "#" ? `<a href="${p.link}" target="_blank" rel="noopener noreferrer" class="btn-outline" style="text-decoration:none; display:flex; align-items:center;">View the project in action ↗</a>` : ""}
            </div>
          </div>
        </div>
      `).join("");
    }
    window.switchTab = function(e, id) {
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      const panel = document.getElementById("panel-" + id);
      if (panel) panel.classList.add("active");
      e.currentTarget.classList.add("active");
    };
  },

  /* ── PROJECTS (Technical) ──────────────── */
  setupProjects() {
    const listEl = document.getElementById("tech-projects-list");
    if (!listEl) return;
    listEl.innerHTML = MAG_DATA.techProjects.map(p => `
      <div class="tech-project-card card-hover" data-reveal>
        <div class="tp-header">
          <div class="tp-head-left">
            ${p.logo ? `<div class="stack-card-logo"><img src="${p.logo}" alt="${p.title} logo" loading="lazy"></div>` : ""}
            <div>
              <div class="tp-category tp-category--${p.color}">${p.category}</div>
              <div class="tp-title">${p.title}</div>
              <div class="tp-subtitle">${p.subtitle}</div>
            </div>
          </div>
          <div class="tp-period">${p.period}</div>
        </div>
        <div class="tp-client">${p.client}</div>
        <p class="tp-desc">${p.description}</p>
          <div class="project-tags" style="margin-top:16px">${p.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
        ${p.github || p.link ? `<div class="tp-links">${p.link ? `<a class="tp-link" href="${p.link}" target="_blank" rel="noopener noreferrer">View Live ↗</a>` : ""}${p.github ? `<a class="tp-link" href="${p.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>` : ""}</div>` : ""}
      </div>
    `).join("");
  },

  /* ── CONTACT ───────────────────────────── */
  setupContact() {
    const socialsEl = document.getElementById("socials-list");
    if (socialsEl) {
      socialsEl.innerHTML = MAG_DATA.profile.socials.map(s => `
        <a href="${s.url}" class="btn-outline social-link" target="_blank" rel="noopener noreferrer">
          ${s.label} <span>${s.icon}</span>
        </a>
      `).join("");
    }
    const emailLink = document.getElementById("email-link");
    if (emailLink) {
      emailLink.href = `mailto:${MAG_DATA.profile.email}`;
      emailLink.textContent = `${MAG_DATA.profile.email} →`;
    }
  },

  /* ── EVENTS INDEX ──────────────────────── */
  setupEvents() {
    const grid = document.getElementById("events-grid");
    if (!grid) return;
    grid.innerHTML = MAG_DATA.events.map(ev => `
      <a href="${ev.link}" class="eic-card card-hover" data-reveal-child>
        <div class="elc-img elc-img--tall">
          <img src="../${ev.logo}" alt="${ev.title} logo"
            onerror="this.parentElement.innerHTML='<span class=\\'elc-img-fallback\\'>${ev.id.toUpperCase()}</span>'">
        </div>
        <div class="eic-body">
          <div class="elc-route">
            <div class="elc-endpoint">
              <p class="elc-ep-label">No.</p>
              <p class="elc-ep-code">${ev.index}</p>
            </div>
            <div class="elc-mid">
              <div class="elc-mid-connector">
                <span class="elc-mid-line"></span>
                <span class="elc-mid-line"></span>
              </div>
            </div>
            <div class="elc-endpoint elc-endpoint--right">
              <p class="elc-ep-label">Year</p>
              <p class="elc-ep-code">${ev.date}</p>
            </div>
          </div>
          <div class="elc-divider"></div>
          <div class="eic-title">${ev.title}</div>
          <div class="eic-subtext">${ev.subtext}</div>
          <p class="eic-desc">${ev.about ? ev.about[0] : ""}</p>
          <div class="eic-bottom">
            <span class="eic-role">${ev.role}</span>
            <span class="eic-cta">View details →</span>
          </div>
        </div>
      </a>
    `).join("");
  },

  /* ── EVENT DETAIL ──────────────────────── */
  setupEventDetail() {
    const slug = document.body.dataset.event;
    const ev   = MAG_DATA.events.find(e => e.id === slug);
    if (!ev) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set("event-title",   ev.title);
    set("event-eyebrow", ev.subtext);
    document.title = `MAG · ${ev.title}`;
    // FIX: was "event-subtext" in JS but "event-subtitle" in HTML — unified to "event-subtext"
    const subEl = document.getElementById("event-subtext");
    if (subEl) subEl.textContent = ev.subtext;
    const badgeEl = document.getElementById("event-role-badge");
    if (badgeEl) badgeEl.textContent = ev.role;

    // Dynamic logo background rendering
    if (ev.logo) {
      const hero = document.querySelector(".page-hero");
      if (hero) {
        hero.classList.add("page-hero--event");
        let bgWrap = document.createElement("div");
        bgWrap.className = "event-hero-bg";
        bgWrap.innerHTML = `<img src="../${ev.logo}" alt="${ev.title} Logo"
          onerror="this.parentElement.style.display='none'" />`;
        hero.insertBefore(bgWrap, hero.firstChild);
      }
    }

    const aboutEl = document.getElementById("event-about");
    if (aboutEl) aboutEl.innerHTML = ev.about.map(p => `<p class="about-p" data-reveal>${p}</p>`).join("");
    const detailsEl = document.getElementById("event-details-table");
    if (detailsEl && ev.details) {
      detailsEl.innerHTML = Object.entries(ev.details).map(([k,v]) => `
        <div class="detail-row">
          <div class="detail-key">${k.charAt(0).toUpperCase()+k.slice(1)}</div>
          <div class="detail-val">${v}</div>
        </div>
      `).join("");
    }
  },

};

/* ─── BOOTSTRAP ─────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const isInEvents = window.location.pathname.includes("/events/");
  const prefix     = isInEvents ? "../" : "";
  const namespace  = document.body.dataset.barbaNamespace || document.body.dataset.page || "";

  MAG_Controller.renderNav(prefix);
  initLoader();
  MAG_Controller.setup(namespace);
  initNavPill();

  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);
    initCursorGlow();
    initMagneticButtons();
    initPageAnimations();
  } else {
    document.querySelectorAll("[data-reveal],[data-reveal-child]").forEach(el => el.classList.add("in"));
  }
  initBarba();
});
