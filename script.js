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

// ---- STAR FIELD ----
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [], shooters = [], W, H;

function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
function initStars() {
  stars = Array.from({length: 180}, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.4 + 0.2,
    s: Math.random() * 0.12 + 0.02,
    o: Math.random() * 0.8 + 0.1,
    flicker: Math.random() * 0.025
  }));
}

setInterval(() => {
  shooters.push({ x: Math.random() * W, y: Math.random() * H * 0.4, len: 80 + Math.random()*60, spd: 7 + Math.random()*5, o: 1, a: Math.PI/5 });
}, 3500);

function drawFrame() {
  ctx.clearRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = 'rgba(139,92,246,0.03)';
  ctx.lineWidth = 1;
  for(let x=0; x<W; x+=100) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for(let y=0; y<H; y+=100) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  // Stars
  stars.forEach(s => {
    s.o += Math.sin(Date.now() * s.flicker) * 0.008;
    s.o = Math.max(0.05, Math.min(1, s.o));
    s.y -= s.s;
    if(s.y < 0) { s.y = H; s.x = Math.random() * W; }
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${s.o})`; ctx.fill();
  });

  // Shooting stars
  shooters.forEach((ss, i) => {
    const ex = ss.x - Math.cos(ss.a)*ss.len, ey = ss.y - Math.sin(ss.a)*ss.len;
    const g = ctx.createLinearGradient(ss.x, ss.y, ex, ey);
    g.addColorStop(0, `rgba(167,139,250,${ss.o})`);
    g.addColorStop(1, 'transparent');
    ctx.beginPath(); ctx.moveTo(ss.x, ss.y); ctx.lineTo(ex, ey);
    ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
    ss.x += Math.cos(ss.a)*ss.spd; ss.y += Math.sin(ss.a)*ss.spd;
    ss.o -= 0.018;
    if(ss.o <= 0) shooters.splice(i, 1);
  });
  requestAnimationFrame(drawFrame);
}
resize(); initStars(); drawFrame();
window.addEventListener('resize', () => { resize(); initStars(); });

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
