(function () {
  'use strict';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  (function mobileNav() {
    const btn = document.getElementById('nav-toggle');
    const panel = document.getElementById('nav-mobile');
    if (!btn || !panel) return;
    const openIcon = btn.querySelector('.nav-toggle-icon-open');
    const closeIcon = btn.querySelector('.nav-toggle-icon-close');

    function setNavOpen(open) {
      btn.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-mobile-open', open);
      if (openIcon && closeIcon) {
        openIcon.classList.toggle('hidden', open);
        closeIcon.classList.toggle('hidden', !open);
      }
    }

    btn.addEventListener('click', () => setNavOpen(!panel.classList.contains('is-open')));
    panel.querySelectorAll('.nav-mobile-link').forEach((link) =>
      link.addEventListener('click', () => setNavOpen(false))
    );
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setNavOpen(false);
    });
  })();

  (function heroTyping() {
    const lineEl = document.getElementById('hero-type-line');
    const nameEl = document.getElementById('hero-type-name');
    const h1 = lineEl && nameEl ? lineEl.closest('h1') : null;
    if (!lineEl || !nameEl || !h1) return;

    const part1 = "Hello! I'm ";
    const part2 = 'Dexter Orro';
    const delayMs = 58;
    const repeatMs = 10000;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lineEl.textContent = part1;
      nameEl.textContent = part2;
      const cur = document.getElementById('hero-type-cursor');
      if (cur) cur.remove();
      return;
    }

    let typingGen = 0;

    const nameWrapEl = document.getElementById('hero-type-name-wrap');

    function ensureCursor() {
      let c = document.getElementById('hero-type-cursor');
      const host = nameWrapEl || h1;
      if (!c) {
        c = document.createElement('span');
        c.id = 'hero-type-cursor';
        c.className = 'type-cursor';
        c.setAttribute('aria-hidden', 'true');
        host.appendChild(c);
      } else if (!host.contains(c)) {
        host.appendChild(c);
      }
      c.classList.remove('type-cursor--done');
      return c;
    }

    function runTypingCycle() {
      typingGen += 1;
      const gen = typingGen;

      lineEl.textContent = '';
      nameEl.textContent = '';

      const cursorEl = ensureCursor();

      function typeChunk(text, el, index, onDone) {
        if (gen !== typingGen) return;
        if (index >= text.length) {
          onDone();
          return;
        }
        el.appendChild(document.createTextNode(text[index]));
        setTimeout(() => typeChunk(text, el, index + 1, onDone), delayMs);
      }

      typeChunk(part1, lineEl, 0, () => {
        typeChunk(part2, nameEl, 0, () => {
          if (gen !== typingGen) return;
          cursorEl.classList.add('type-cursor--done');
          setTimeout(() => {
            if (gen !== typingGen) return;
            cursorEl.remove();
          }, 800);
        });
      });
    }

    runTypingCycle();
    setInterval(runTypingCycle, repeatMs);
  })();

  (function awardsSeeMore() {
    const btn = document.getElementById('awards-see-more');
    const extra = document.getElementById('awards-extra');
    if (!btn || !extra) return;
    btn.addEventListener('click', () => {
      extra.classList.toggle('hidden');
      const open = !extra.classList.contains('hidden');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'See less' : 'See more';
    });
  })();

  (function projectsSeeMore() {
    const btn = document.getElementById('projects-see-more');
    const extra = document.getElementById('projects-extra');
    if (!btn || !extra) return;
    btn.addEventListener('click', () => {
      extra.classList.toggle('hidden');
      const open = !extra.classList.contains('hidden');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'See less' : 'See more';
      if (open) {
        extra.querySelectorAll('.reveal').forEach((el) => el.classList.add('show'));
      }
    });
  })();
})();
