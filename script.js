(function () {
  'use strict';

  // ─── Stars / particles ───
  const starsContainer = document.getElementById('stars-container');
  const starCount = 60;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
    star.style.setProperty('--delay', (Math.random() * 4) + 's');
    star.style.width = (1 + Math.random() * 2) + 'px';
    star.style.height = star.style.width;
    starsContainer.appendChild(star);
  }

  // ─── Header scroll effect ───
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ─── Mobile menu ───
  const menuToggle = document.getElementById('menu-toggle');
  const navlinks = document.getElementById('navlinks');

  menuToggle.addEventListener('click', () => {
    navlinks.classList.toggle('active');
    menuToggle.textContent = navlinks.classList.contains('active') ? '✕' : '☰';
  });

  // Close mobile menu on link click
  navlinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navlinks.classList.remove('active');
      menuToggle.textContent = '☰';
    });
  });

  // ─── Scroll reveal ───
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── Counter animation ───
  function animateCounter(id, target, duration) {
    const el = document.getElementById(id);
    if (!el) return;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // Trigger counters when widgets come into view
  const widgetRow = document.querySelector('.widget-row');
  if (widgetRow) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter('counter-projects', 6, 1200);
          animateCounter('counter-dsa', 400, 1400);
          animateCounter('counter-hackathon', 1, 800);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counterObserver.observe(widgetRow);
  }

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
