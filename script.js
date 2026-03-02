/* =============================================
   CLEINO FRANK — PORTFOLIO SCRIPTS v2
   ============================================= */

// ---- LOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
});

// ---- CUSTOM CURSOR ----
const cursor = document.querySelector('.cursor');
const cursorGlow = document.querySelector('.cursor-glow');
let mx = 0, my = 0, gx = 0, gy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;

  // Mouse glow
  document.querySelector('.mouse-glow').style.left = mx + 'px';
  document.querySelector('.mouse-glow').style.top = my + 'px';
});

function followGlow() {
  gx += (mx - gx - 18) * 0.1;
  gy += (my - gy - 18) * 0.1;
  cursorGlow.style.transform = `translate(${gx}px, ${gy}px)`;
  requestAnimationFrame(followGlow);
}
followGlow();

document.querySelectorAll('a, button, .acc-header, .fact-row, .c-card, .skill-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorGlow.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorGlow.classList.remove('hover'); });
});

// ---- BLACK HOLE CANVAS ----
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let W, H;

const BH = { x: 0, y: 0, r: 0 };
const TILT = 0.18; // disk perspective (y compression)
let diskParticles = [], spiralParticles = [], bgStars = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  BH.x = W < 768 ? W * 0.5 : W * 0.68;
  BH.y = H * 0.5;
  BH.r = Math.min(W, H) * 0.085;
  initBH();
}

function initBH() {
  bgStars = Array.from({ length: 70 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 0.9 + 0.1,
    o: Math.random() * 0.35 + 0.05
  }));

  diskParticles = [];
  for (let i = 0; i < 420; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = BH.r * (1.5 + Math.pow(Math.random(), 0.55) * 3.6);
    const speed = 0.0055 / Math.sqrt(dist / BH.r);
    const tempFactor = Math.max(0, 1 - (dist - BH.r * 1.5) / (BH.r * 3.6));
    diskParticles.push({
      angle, dist,
      speed: speed * (Math.random() > 0.04 ? 1 : -1),
      size: Math.random() * 1.8 + 0.2,
      brightness: Math.random() * 0.75 + 0.25,
      tempFactor
    });
  }

  spiralParticles = [];
  for (let i = 0; i < 55; i++) spiralParticles.push(newSpiral());
}

function newSpiral() {
  const startDist = BH.r * (4.5 + Math.random() * 7);
  return {
    angle: Math.random() * Math.PI * 2,
    dist: startDist, startDist,
    fallSpeed: 0.18 + Math.random() * 0.4,
    rotSpeed: 0.012 + Math.random() * 0.022,
    size: Math.random() * 1.3 + 0.2,
    opacity: Math.random() * 0.55 + 0.25
  };
}

function particleColor(t) {
  if (t > 0.72) {
    const k = (t - 0.72) / 0.28;
    return [255, Math.floor(190 + k * 65), Math.floor(k * 180)];
  } else if (t > 0.35) {
    const k = (t - 0.35) / 0.37;
    return [255, Math.floor(70 + k * 120), 0];
  } else {
    const k = t / 0.35;
    return [Math.floor(140 + k * 115), Math.floor(k * 70), 0];
  }
}

function drawJet(dir) {
  const jLen = BH.r * 5.5;
  const jWidth = BH.r * 0.28;
  const y0 = BH.y + dir * BH.r * 0.9;
  const y1 = BH.y + dir * (BH.r + jLen);
  const grad = ctx.createLinearGradient(BH.x, y0, BH.x, y1);
  grad.addColorStop(0, 'rgba(167,139,250,0.75)');
  grad.addColorStop(0.45, 'rgba(139,92,246,0.28)');
  grad.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.moveTo(BH.x - 2, y0);
  ctx.lineTo(BH.x + 2, y0);
  ctx.lineTo(BH.x + jWidth, y1);
  ctx.lineTo(BH.x - jWidth, y1);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
}

function drawFrame() {
  ctx.clearRect(0, 0, W, H);

  // Deep void
  ctx.fillStyle = '#000005';
  ctx.fillRect(0, 0, W, H);

  // Background stars
  bgStars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.o})`;
    ctx.fill();
  });

  // Outer ambient haze
  const outerHaze = ctx.createRadialGradient(BH.x, BH.y, BH.r * 2, BH.x, BH.y, BH.r * 7.5);
  outerHaze.addColorStop(0, 'rgba(255,100,0,0.09)');
  outerHaze.addColorStop(0.45, 'rgba(180,45,0,0.04)');
  outerHaze.addColorStop(1, 'transparent');
  ctx.fillStyle = outerHaze;
  ctx.fillRect(0, 0, W, H);

  // Update all disk particle angles first
  diskParticles.forEach(p => { p.angle += p.speed; });

  // Back half of disk (sin < 0 = behind black hole)
  diskParticles.filter(p => Math.sin(p.angle) < 0).forEach(p => {
    const px = BH.x + Math.cos(p.angle) * p.dist;
    const py = BH.y + Math.sin(p.angle) * p.dist * TILT;
    const [r, g, b] = particleColor(p.tempFactor);
    ctx.beginPath();
    ctx.arc(px, py, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${p.brightness * 0.55})`;
    ctx.fill();
    if (p.brightness > 0.65 && p.tempFactor > 0.45) {
      ctx.beginPath();
      ctx.arc(px, py, p.size * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${p.brightness * 0.07})`;
      ctx.fill();
    }
  });

  // Spiral infalling particles
  spiralParticles.forEach((p, i) => {
    p.angle += p.rotSpeed;
    p.dist -= p.fallSpeed;
    if (p.dist <= BH.r) { spiralParticles[i] = newSpiral(); return; }
    const fade = (p.dist - BH.r) / (p.startDist - BH.r);
    const px = BH.x + Math.cos(p.angle) * p.dist;
    const py = BH.y + Math.sin(p.angle) * p.dist * 0.22;
    ctx.beginPath();
    ctx.arc(px, py, p.size * Math.max(0.1, fade), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,140,0,${p.opacity * fade * 0.65})`;
    ctx.fill();
  });

  // Relativistic jets
  drawJet(-1);
  drawJet(1);

  // Photon sphere / gravitational lensing ring
  const lensing = ctx.createRadialGradient(BH.x, BH.y, BH.r * 0.88, BH.x, BH.y, BH.r * 1.65);
  lensing.addColorStop(0, 'transparent');
  lensing.addColorStop(0.5, 'rgba(255,190,80,0.28)');
  lensing.addColorStop(0.72, 'rgba(255,110,0,0.16)');
  lensing.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.arc(BH.x, BH.y, BH.r * 1.65, 0, Math.PI * 2);
  ctx.fillStyle = lensing;
  ctx.fill();

  // Event horizon shadow
  const shadow = ctx.createRadialGradient(BH.x, BH.y, 0, BH.x, BH.y, BH.r * 1.28);
  shadow.addColorStop(0.65, '#000000');
  shadow.addColorStop(0.82, 'rgba(0,0,0,0.96)');
  shadow.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.arc(BH.x, BH.y, BH.r * 1.28, 0, Math.PI * 2);
  ctx.fillStyle = shadow;
  ctx.fill();

  // Solid event horizon
  ctx.beginPath();
  ctx.arc(BH.x, BH.y, BH.r, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();

  // Front half of disk (sin >= 0 = in front of black hole)
  diskParticles.filter(p => Math.sin(p.angle) >= 0).forEach(p => {
    const px = BH.x + Math.cos(p.angle) * p.dist;
    const py = BH.y + Math.sin(p.angle) * p.dist * TILT;
    const [r, g, b] = particleColor(p.tempFactor);
    ctx.beginPath();
    ctx.arc(px, py, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${p.brightness * 0.88})`;
    ctx.fill();
    if (p.brightness > 0.6 && p.tempFactor > 0.4) {
      ctx.beginPath();
      ctx.arc(px, py, p.size * 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${p.brightness * 0.11})`;
      ctx.fill();
    }
  });

  // Hawking radiation flashes
  if (Math.random() < 0.12) {
    const a = Math.random() * Math.PI * 2;
    const rr = BH.r * (1.0 + Math.random() * 0.25);
    ctx.beginPath();
    ctx.arc(BH.x + Math.cos(a) * rr, BH.y + Math.sin(a) * rr * TILT, 1, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,220,0.92)';
    ctx.fill();
  }

  requestAnimationFrame(drawFrame);
}

resize();
drawFrame();
window.addEventListener('resize', resize);

// ---- COUNTER ANIMATION ----
function animateCount(el) {
  const target = +el.dataset.target;
  const dur = 2000; const start = Date.now();
  const tick = () => {
    const p = Math.min((Date.now()-start)/dur, 1);
    const ease = 1 - Math.pow(1-p, 3);
    el.textContent = Math.floor(ease*target);
    if(p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  tick();
}

// ---- INTERSECTION OBSERVER ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;

    // Counters
    e.target.querySelectorAll('[data-target]').forEach(el => animateCount(el));

    // Skill bars (active panel only)
    e.target.querySelectorAll('.skill-panel.active .si-fill').forEach(bar => {
      const pct = bar.closest('.skill-item').dataset.pct;
      setTimeout(() => { bar.style.width = pct + '%'; }, 200);
    });

    io.unobserve(e.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.snap-section').forEach(s => io.observe(s));

// ---- SKILL TABS ----
document.querySelectorAll('.skill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.querySelector(`.skill-panel[data-panel="${target}"]`);
    panel.classList.add('active');

    // Animate bars in new panel
    setTimeout(() => {
      panel.querySelectorAll('.si-fill').forEach(bar => {
        bar.style.width = '0';
        const pct = bar.closest('.skill-item').dataset.pct;
        setTimeout(() => { bar.style.width = pct + '%'; }, 50);
      });
    }, 50);
  });
});

// ---- ACCORDION ----
document.querySelectorAll('.acc-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.acc-item');
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('active'));
    if(!isActive) item.classList.add('active');
  });
});

// ---- NAVBAR SCROLL ----
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);

  // Side nav active dot
  const sections = ['hero','about','skills','projects','contact'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    const rect = el.getBoundingClientRect();
    const dot = document.querySelector(`.side-dot[href="#${id}"]`);
    if(dot) dot.classList.toggle('active', rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2);
  });
});

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// ---- MAGNETIC BUTTONS ----
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.25}px, ${y*0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
