/* =============================================
   YOSEF GEBISA — PORTFOLIO JS
   ============================================= */

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== ACTIVE NAV =====
function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop;
    const h   = sec.offsetHeight;
    const id  = sec.getAttribute('id');
    const a   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (a) {
      a.classList.toggle('active', scrollY >= top && scrollY < top + h);
    }
  });
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity  = '1';
        e.target.style.transform = 'translateY(0)';
      }, i * 100);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.pcard, .stat, .stack-pills span, .c-link').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// (typed text removed — single clean title in HTML)

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      btn.style.background = 'var(--accent)';
      btn.style.color = '#000';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});
