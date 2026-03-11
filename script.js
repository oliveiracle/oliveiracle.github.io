/* =============================================
   CLEINO FRANK — PORTFOLIO SCRIPTS
   ============================================= */

// ---- CUSTOM CURSOR ----
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateFollower() {
  followerX += (mouseX - followerX - 15) * 0.12;
  followerY += (mouseY - followerY - 15) * 0.12;
  follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .skill-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2)';
    follower.style.width = '50px';
    follower.style.height = '50px';
    follower.style.borderColor = 'rgba(167,139,250,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width = '30px';
    follower.style.height = '30px';
    follower.style.borderColor = 'rgba(139,92,246,0.6)';
  });
});

// ---- STAR FIELD ----
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
let w, h;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.2,
      speed: Math.random() * 0.15 + 0.02,
      opacity: Math.random() * 0.8 + 0.2,
      flicker: Math.random() * 0.02
    });
  }
}

// Shooting star
let shootingStars = [];
function spawnShootingStar() {
  shootingStars.push({
    x: Math.random() * w,
    y: Math.random() * h * 0.5,
    len: Math.random() * 80 + 60,
    speed: Math.random() * 8 + 6,
    opacity: 1,
    angle: Math.PI / 5
  });
}
setInterval(spawnShootingStar, 3000);

function drawStars() {
  ctx.clearRect(0, 0, w, h);

  // Grid lines (SpaceX feel)
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 80) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += 80) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // Stars
  stars.forEach(s => {
    s.opacity += Math.sin(Date.now() * s.flicker) * 0.01;
    s.opacity = Math.max(0.1, Math.min(1, s.opacity));
    s.y -= s.speed;
    if (s.y < 0) { s.y = h; s.x = Math.random() * w; }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
    ctx.fill();
  });

  // Shooting stars
  shootingStars.forEach((ss, i) => {
    ctx.beginPath();
    ctx.moveTo(ss.x, ss.y);
    ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
    const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
    grad.addColorStop(0, `rgba(167, 139, 250, ${ss.opacity})`);
    grad.addColorStop(1, 'transparent');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ss.x += Math.cos(ss.angle) * ss.speed;
    ss.y += Math.sin(ss.angle) * ss.speed;
    ss.opacity -= 0.015;
    if (ss.opacity <= 0) shootingStars.splice(i, 1);
  });

  requestAnimationFrame(drawStars);
}

resizeCanvas();
createStars();
drawStars();
window.addEventListener('resize', () => { resizeCanvas(); createStars(); });

// ---- TYPING EFFECT ----
const phrases = [
  'Full Stack Developer',
  'Django & Python Engineer',
  'Building with Purpose',
  'Based in Dublin, Ireland'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }

  let speed = isDeleting ? 50 : 90;
  if (!isDeleting && charIndex === current.length + 1) {
    speed = 2000; isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }
  setTimeout(type, speed);
}
setTimeout(type, 1000);

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const start = Date.now();
  const tick = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  tick();
}

// ---- SCROLL ANIMATIONS ----
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Skill bars
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, 200);
      });

      // Counters
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        animateCounter(el);
      });

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos], .skill-card, .project-card').forEach(el => observer.observe(el));

// Counter observer for hero stats
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ---- NAVBAR SCROLL ----
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ---- SMOOTH NAV CLICK ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ---- HAMBURGER MENU ----
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});
