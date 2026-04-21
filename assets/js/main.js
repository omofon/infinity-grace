/* =====================================================
   INFINITY GRACE PROPOSAL — main.js
   Sense Connect · 2026
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. BUILD TIMELINE BAR
  const tlBar = document.getElementById('tlBar');
  if (tlBar) {
    for (let i = 1; i <= 45; i++) {
      const d = document.createElement('div');
      d.className = 'td';
      if (i <= 30) d.classList.add('dev');
      else if (i <= 42) d.classList.add('test');
      else d.classList.add('launch');
      d.title = `Day ${i}`;
      tlBar.appendChild(d);
    }
  }

  // ── 2. COUNTDOWN (7 days from load)
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  const expiry = new Date(Date.now() + SEVEN_DAYS);

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const now = Date.now();
    const diff = expiry - now;
    if (diff <= 0) {
      ['cd-days','cd-hrs','cd-min','cd-sec'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % 60000) / 1000);

    const cdDays = document.getElementById('cd-days');
    const cdHrs  = document.getElementById('cd-hrs');
    const cdMin  = document.getElementById('cd-min');
    const cdSec  = document.getElementById('cd-sec');
    if (cdDays) cdDays.textContent = pad(d);
    if (cdHrs)  cdHrs.textContent  = pad(h);
    if (cdMin)  cdMin.textContent  = pad(m);
    if (cdSec)  cdSec.textContent  = pad(s);

    const total = `${d}d ${pad(h)}:${pad(m)}:${pad(s)}`;
    const el = document.getElementById('expTimer');
    if (el) el.textContent = total;

    // Flash timer in store strip
    const storeTimer = document.getElementById('storeFlashTimer');
    if (storeTimer) storeTimer.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Expiry date display
  const expDateEl = document.getElementById('expDate');
  if (expDateEl) {
    expDateEl.textContent = expiry.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  // ── 3. MILESTONE PROGRESS BAR
  const progFill = document.getElementById('prog-fill');
  const progPct  = document.getElementById('prog-pct');
  setTimeout(() => {
    if (progFill) {
      progFill.style.width = '60%';
      if (progPct) progPct.textContent = 'Milestone 1 — 60% · ₦480,000';
    }
  }, 800);

  // ── 4. ANIMATE BAR CHART ON SCROLL
  const barFills = document.querySelectorAll('.bar-fill');
  if (barFills.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const target = fill.getAttribute('data-target') || fill.style.getPropertyValue('--w') || '0%';
          setTimeout(() => { fill.style.width = target; }, 200);
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.3 });

    barFills.forEach(fill => {
      const w = fill.style.width;
      fill.setAttribute('data-target', w);
      fill.style.width = '0%';
      observer.observe(fill);
    });
  }

  // ── 5. FADE-IN ON SCROLL
  const fadeEls = document.querySelectorAll('.scope-item, .plat-card, .int-card, .phase-card, .ag-card, .trust-card, .milestone-card');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    fadeObserver.observe(el);
  });

  // ── 6. STORE CATEGORY TABS (interactive)
  const catPills = document.querySelectorAll('.cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // ── 7. STORE NAV ITEMS
  const snavItems = document.querySelectorAll('.snav-item');
  snavItems.forEach(item => {
    item.addEventListener('click', () => {
      snavItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ── 8. SMOOTH SCROLL FOR ANCHORS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
