/* =========================================================
   ELLERY QUEEN — Shared Script
   ========================================================= */

// ── INTRO SCREEN ──
const introScreen = document.getElementById('intro-screen');
const introBtn    = document.getElementById('intro-enter');

function dismissIntro() {
  if (!introScreen) return;
  introScreen.classList.add('hidden');
  document.body.style.overflow = '';
  sessionStorage.setItem('intro-seen', '1');
}

if (introScreen) {
  if (sessionStorage.getItem('intro-seen')) {
    introScreen.classList.add('hidden');
  } else {
    document.body.style.overflow = 'hidden';
    if (introBtn) introBtn.addEventListener('click', dismissIntro);
  }
}

// ── NAVIGATION ──
const header    = document.getElementById('site-header');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

// ── ACTIVE NAV LINK (multi-page) ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── FADE-IN ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Q&A ACCORDION ──
document.querySelectorAll('.qa-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // collapse all
    document.querySelectorAll('.qa-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling?.classList.remove('open');
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling?.classList.add('open');
    }
  });
});

// ── CONTACT FORM ──
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const status  = document.getElementById('form-status');

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields before sending.';
      status.style.color = 'crimson';
      return;
    }

    const subject = encodeURIComponent('Message from ' + name + ' via Spiritual Passages');
    const body    = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      message
    );

    window.location.href =
      'mailto:Elleryqueen65137@yahoo.com?subject=' + subject + '&body=' + body;

    status.textContent = 'Your email app should open now. Thank you for reaching out!';
    status.style.color = 'green';
  });
}

// ── FOOTER YEAR ──
const fy = document.getElementById('footer-year');
if (fy) fy.textContent = new Date().getFullYear();