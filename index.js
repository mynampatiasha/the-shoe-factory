/* =============================================
   THE SHOE FACTORY – JAYANAGAR
   index.js – Interactions & Animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR: Scroll-based style change ─── */
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ─── HAMBURGER MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    navLinks.classList.toggle('open', menuOpen);
    hamburger.setAttribute('aria-expanded', menuOpen);

    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (menuOpen && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      menuOpen = false;
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  /* ─── SCROLL-TRIGGERED REVEAL (Intersection Observer) ─── */
  const revealEls = document.querySelectorAll('[data-aos], .faq-item');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger delay based on position among siblings
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('[data-aos]'));
        const i = siblings.indexOf(entry.target);
        const delay = i * 90;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ─── ACTIVE NAV LINK on scroll ─── */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ─── BRAND PILL hover ripple ─── */
  document.querySelectorAll('.brand-pill').forEach(pill => {
    pill.addEventListener('mouseenter', function () {
      this.style.transform = `scale(1.08) rotate(${(Math.random() - 0.5) * 4}deg)`;
    });
    pill.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  /* ─── CATEGORY CARD tilt on mouse move ─── */
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tiltX  = dy * -5;
      const tiltY  = dx *  5;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── REVIEW CARD staggered entrance ─── */
  const reviewCards = document.querySelectorAll('.review-card');
  const reviewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = Array.from(entry.target.parentElement.querySelectorAll('.review-card'));
        const i = cards.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 120);
        reviewObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reviewCards.forEach(c => reviewObserver.observe(c));

  /* ─── SMOOTH SCROLL polyfill for older Safari ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── FLOATING CALL BUTTON: hide/show on scroll ─── */
  const callBtn  = document.querySelector('.floating-call');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > 300) {
      callBtn.style.opacity   = '1';
      callBtn.style.transform = 'scale(1)';
    } else {
      callBtn.style.opacity   = '0';
      callBtn.style.transform = 'scale(0.8)';
    }
    lastScroll = curr;
  }, { passive: true });

  // Start hidden
  callBtn.style.opacity    = '0';
  callBtn.style.transform  = 'scale(0.8)';
  callBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  /* ─── HERO stats count-up animation ─── */
  const counters = document.querySelectorAll('.stat-num');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const final = el.textContent.trim();
      const numMatch = final.match(/[\d.]+/);
      if (!numMatch) return;
      const num     = parseFloat(numMatch[0]);
      const prefix  = '';
      const suffix  = final.replace(numMatch[0], '');
      let start     = 0;
      const step    = num / 50;
      const timer   = setInterval(() => {
        start += step;
        if (start >= num) {
          el.textContent = `${num % 1 === 0 ? Math.round(num) : num}${suffix}`;
          clearInterval(timer);
        } else {
          el.textContent = `${num % 1 === 0 ? Math.round(start) : start.toFixed(1)}${suffix}`;
        }
      }, 28);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.8 });

  counters.forEach(c => countObserver.observe(c));

});