/* =============================================
   CLEINO FRANK — PORTFOLIO CHATBOT
   ============================================= */

const chatKnowledge = [
  {
    keys: ['hello', 'hi ', 'hey', 'good morning', 'good afternoon', 'good evening', 'sup', 'howdy', 'greetings', 'oi', 'olá'],
    responses: [
      "Hey there! 👋 I'm Cleino Frank — Full Stack Developer based in Dublin. Ask me anything about my skills, projects, or experience!",
      "Hi! Cleino here. What would you like to know? Try asking about my tech stack, projects, or how to get in touch.",
    ]
  },
  {
    keys: ['who are you', 'about you', 'tell me about', 'yourself', 'introduce', 'who is cleino'],
    responses: [
      "I'm Cleino Frank 🚀 A Full Stack Developer from Brazil, living in Dublin, Ireland. I graduated from Code Institute in 2025 and I'm currently working at DSV as a Logistics Coordinator — while actively looking for Junior Full Stack Developer roles. I build purposeful apps with clean code and real-world impact."
    ]
  },
  {
    keys: ['skill', 'tech stack', 'technology', 'know how', 'use', 'framework', 'can you code', 'code in', 'what do you know'],
    responses: [
      "My core stack:\n🐍 Backend: Python · Django · PostgreSQL · PHP\n🌐 Frontend: HTML5 · CSS3 · JavaScript (ES6) · Bootstrap\n🔧 Tools: Git · GitHub · Heroku · VS Code\n🧪 Testing: 46 tests, 98% coverage on my main project!"
    ]
  },
  {
    keys: ['python', 'django', 'postgresql', 'database', 'backend', 'server'],
    responses: [
      "Python and Django are where I shine! 🐍 My Mental Health Tracker project is built with Django + PostgreSQL — full CRUD, user authentication, Chart.js visualisations, and 46 automated tests at 98% coverage. Clean architecture is non-negotiable for me."
    ]
  },
  {
    keys: ['javascript', 'js', 'css', 'html', 'frontend', 'bootstrap', 'react', 'vue'],
    responses: [
      "On the frontend I work with HTML5, CSS3 and vanilla JavaScript (ES6+). I built a full commercial site (Street 66 Bar) and interactive web apps with these. Bootstrap for rapid UI. No React yet — but I pick things up fast! 💪"
    ]
  },
  {
    keys: ['project', 'built', 'portfolio work', 'demo', 'what have you made', 'app', 'website', 'show me'],
    responses: [
      "Here are my key projects:\n\n🧠 Mental Health Tracker — Django full-stack, 46 tests, 98% coverage\n🍸 Street 66 Bar — live commercial site (street66bar.ie)\n✝️ The Life of Jesus — Python CLI app on Heroku\n📖 The Word of God — Bible verse generator\n💆 MARIA Spa — Luxury frontend website"
    ]
  },
  {
    keys: ['mental health', 'tracker', 'mood', 'wellness', 'chart', 'heroku'],
    responses: [
      "The Mental Health Tracker is my flagship project! 🧠\n\nA full-stack Django app where users log daily moods, see weekly trends via Chart.js, and access mental health resources. 46 automated tests · 98% coverage · deployed live on Heroku. I built it because I genuinely care about tech that helps people."
    ]
  },
  {
    keys: ['street 66', 'bar', 'pub', 'cocktail', 'commercial', 'client', 'paid', 'dublin bar'],
    responses: [
      "Street 66 Bar was my first paid client project! 🍸 A full commercial website for a cocktail bar in Temple Bar, Dublin. Live at street66bar.ie — interactive photo gallery, Google Maps integration, built with HTML5/CSS3/JavaScript. Real client = real lessons!"
    ]
  },
  {
    keys: ['life of jesus', 'word of god', 'bible', 'python app', 'cli', 'terminal', 'faith project'],
    responses: [
      "These projects combine my faith and code! ✝️\n\n'The Life of Jesus' is a Python CLI app exploring 25 key moments — 1,000+ lines, 40+ tests, deployed on Heroku.\n\n'The Word of God' is a web app that gives Bible verses based on your emotional state — built purely with HTML/CSS/JS."
    ]
  },
  {
    keys: ['dsv', 'logistics', 'current job', 'work now', 'working at', 'day job', 'foxconn', 'blue yonder', 'aws'],
    responses: [
      "I'm currently a Logistics Coordinator at DSV Global Transport & Logistics (Dec 2025–now). 📦\n\nI coordinate international tech hardware shipments for clients like Foxconn, using Blue Yonder, AWS Argo workflows, and Cargo Planner. Real operational experience with enterprise systems!"
    ]
  },
  {
    keys: ['experience', 'work history', 'worked', 'previous job', 'background', 'career'],
    responses: [
      "My journey:\n\n💼 DSV Global Transport — Logistics Coordinator (2025–now)\n💻 Freelance Web Developer (2024–now)\n🍺 Street 66 Bar — Customer Service (2025)\n🏪 Pennylane — Senior Customer Service (2022–2025)\n🛋️ Tok&Stok Brazil — Design Sales (2018–2021)\n👔 Calvin Klein Brazil — Sales Consultant (2014–2016)"
    ]
  },
  {
    keys: ['education', 'study', 'code institute', 'diploma', 'degree', 'graduate', 'course', 'qualification'],
    responses: [
      "My education:\n\n🎓 Code Institute — Higher National Diploma, Full Stack Software Development (Graduated May 2025)\n📚 Dorset College Dublin — International Business (2024)\n🏛️ FMU Brazil — Business/Corporate Communications (2017–2020)\n\nPlus certifications in Cybersecurity, AI Ads & Salesforce Trailblazer!"
    ]
  },
  {
    keys: ['available', 'hire me', 'open to work', 'looking for job', 'opportunity', 'recruit', 'junior', 'entry level'],
    responses: [
      "Yes! Actively looking for Junior Full Stack Developer roles 🙋‍♂️\n\nI bring:\n✅ Live deployed projects (incl. a commercial site)\n✅ Strong Python/Django + testing skills\n✅ Real professional experience\n✅ Fast learner with genuine passion\n\nDrop me a line: cleinofrank@gmail.com"
    ]
  },
  {
    keys: ['where are you', 'location', 'based', 'dublin', 'ireland', 'brazil', 'onsite', 'stoneybatter', 'live in'],
    responses: [
      "I'm based in Stoneybatter, Dublin, Ireland 🇮🇪 — originally from Brazil 🇧🇷. I'm open to Dublin-based roles, hybrid, or fully remote. I have full working rights in Ireland (Stamp 4)."
    ]
  },
  {
    keys: ['remote', 'work from home', 'wfh', 'hybrid', 'fully remote', 'remote job', 'remote position'],
    responses: [
      "Remote work is absolutely fine for me! 💻 I'm set up to work fully remotely — good internet, home office, and experience collaborating on GitHub. I'm also open to hybrid arrangements in Dublin. The tools I use (Git, Slack, Zoom) make async/remote collaboration natural.",
      "Yes, I'm comfortable working remotely! I already work with GitHub, Heroku, and cloud tools daily — remote-first workflows are second nature to me. Dublin-based, hybrid or fully remote — all options work for me. 🌍"
    ]
  },
  {
    keys: ['contact', 'email', 'linkedin', 'github', 'reach you', 'connect', 'message', 'get in touch', 'reach out'],
    responses: [
      "Here's how to reach me:\n\n📧 cleinofrank@gmail.com\n💼 linkedin.com/in/cleinofrank\n💻 github.com/oliveiracle\n\nI respond quickly — always happy to chat about a project or opportunity! 😊"
    ]
  },
  {
    keys: ['cv', 'resume', 'curriculum', 'download cv', 'your cv'],
    responses: [
      "Grab my full CV using the Download CV button at the top of this page! 📄 It covers my work history, skills, education, certifications, and all my projects."
    ]
  },
  {
    keys: ['language', 'portuguese', 'english', 'spanish', 'speak', 'fluent', 'multilingual'],
    responses: [
      "Languages:\n🇧🇷 Portuguese — Native/Bilingual\n🇬🇧 English — Full Professional\n🇪🇸 Spanish — Limited Working\n\nBeing multilingual helps me work with diverse international clients and teams!"
    ]
  },
  {
    keys: ['certification', 'certified', 'trailblazer', 'salesforce', 'cybersecurity', 'google ads'],
    responses: [
      "My certifications:\n🏅 Dangerous Goods General Awareness\n🏅 Trailblazer Ranger (Salesforce)\n🏅 AI-Powered Performance Ads (Google)\n🏅 Cybersecurity Essentials\n\nAlways investing in learning! 📚"
    ]
  },
  {
    keys: ['faith', 'christian', 'jesus', 'god', 'bible', 'col 3', 'colossians', 'heart'],
    responses: [
      "Faith is central to who I am. 🙏 My quote — 'Whatever you do, work at it with all your heart.' (Col 3:23) — guides how I build. That's why I also created 'The Life of Jesus' and 'The Word of God' apps. Code and faith aren't separate for me — both are about serving people well."
    ]
  },
  {
    keys: ['freelance', 'self employed', 'own client', 'freelancer', 'hire you for', 'project for me', 'build me', 'build a website', 'build my site', 'need a website', 'need a developer'],
    responses: [
      "Yes, I'm open to freelance projects! 🤝 I've been freelancing since May 2024 — my first paid project was the commercial website for Street 66 Bar (street66bar.ie). I can help with:\n\n🌐 Business websites\n🛒 Landing pages & portfolios\n🐍 Django web apps\n📊 Custom tools & dashboards\n\nGet in touch: cleinofrank@gmail.com",
      "Freelance is something I actively do! 💻 Based in Dublin but available remotely too. I handle the full lifecycle — design, build, deploy, and domain setup. Interested? Drop me an email: cleinofrank@gmail.com"
    ]
  },
  {
    keys: ['how much', 'price', 'rate', 'cost', 'charge', 'budget', 'quote', 'pricing'],
    responses: [
      "My rates depend on the scope of the project:\n\n💡 Simple landing page: from €300–500\n🌐 Business website: from €600–1,200\n⚙️ Full-stack web app: from €1,000+\n\nI always offer a free initial consultation to understand your needs before quoting. Get in touch: cleinofrank@gmail.com 📩"
    ]
  },
  {
    keys: ['how long', 'timeline', 'deadline', 'turnaround', 'when', 'delivery time'],
    responses: [
      "Timelines depend on project complexity:\n\n⚡ Landing page: 3–5 days\n🌐 Business website: 1–2 weeks\n⚙️ Web app (Django): 2–6 weeks\n\nI work efficiently and communicate progress throughout. Tight deadline? Let's talk — cleinofrank@gmail.com 📩"
    ]
  },
  {
    keys: ['ireland', 'irish', 'dublin company', 'irish company', 'work permit', 'visa', 'stamp', 'right to work'],
    responses: [
      "I have full right to work in Ireland (Stamp 4) 🇮🇪 — no visa sponsorship needed. I'm based in Dublin and available for on-site, hybrid, or fully remote roles. Companies don't need to worry about any work permit restrictions with me."
    ]
  },
  {
    keys: ['what can you build', 'what services', 'what do you offer', 'what do you do', 'services'],
    responses: [
      "Here's what I can build for you:\n\n🌐 Business websites (responsive, fast, SEO-ready)\n📄 Portfolio sites (like this one!)\n🛒 Landing pages & lead generation pages\n🐍 Django web applications (CRUD, auth, dashboards)\n📊 Data dashboards with Chart.js\n⚙️ REST APIs with Django REST Framework\n\nBased in Dublin, available remotely worldwide. Email: cleinofrank@gmail.com"
    ]
  },
  {
    keys: ['test', 'testing', 'coverage', 'tdd', '98%', 'automated', 'unit test'],
    responses: [
      "Testing is something I take seriously! 🧪 My Mental Health Tracker has 46 automated tests with 98% code coverage. I believe in writing tests that actually catch bugs — not just tests to hit a number. Quality code is tested code."
    ]
  },
];

const fallbacks = [
  "I'm not sure about that one! Drop me an email at cleinofrank@gmail.com and I'll answer personally 😊",
  "Good question! Check my GitHub (github.com/oliveiracle) or reach out on LinkedIn for more detail.",
  "That's beyond what I can answer here — but send me a message at cleinofrank@gmail.com. I respond fast! 🚀",
  "Hmm, I don't have that info. Try checking my CV (Download CV button above) or connecting on LinkedIn!",
  "Not sure I caught that! You can ask me about my skills, projects, experience, or how to contact me.",
];

const suggestions = [
  { label: '👋 Who are you?', query: 'Who are you?' },
  { label: '🛠️ Your skills', query: 'What are your skills?' },
  { label: '💻 Freelance?', query: 'Are you available for freelance?' },
  { label: '🌍 Remote work?', query: 'Do you work remotely?' },
  { label: '🚀 Your projects', query: 'Tell me about your projects' },
  { label: '💼 Open to work?', query: 'Are you available to hire?' },
  { label: '💰 What do you charge?', query: 'How much do you charge?' },
  { label: '📞 Contact', query: 'How can I contact you?' },
];

function getResponse(input) {
  const lower = input.toLowerCase().trim();
  for (const item of chatKnowledge) {
    if (item.keys.some(k => lower.includes(k))) {
      const arr = item.responses;
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ---- DOM SETUP ----
const chatToggle   = document.getElementById('chat-toggle');
const chatWindow   = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput    = document.getElementById('chat-input');
const chatSend     = document.getElementById('chat-send');
const chatClose    = document.getElementById('chat-close-btn');
const chatBadge    = document.querySelector('.chat-badge');

let chatOpen    = false;
let welcomed    = false;

function toggleChat() {
  chatOpen = !chatOpen;
  chatWindow.classList.toggle('chat-hidden', !chatOpen);
  if (chatBadge) chatBadge.style.display = 'none';

  if (chatOpen) {
    chatInput.focus();
    if (!welcomed) {
      welcomed = true;
      setTimeout(() => {
        addMessage("Hey! 👋 I'm a virtual version of Cleino. Ask me about my skills, projects, experience, or how to get in touch!", 'bot');
        setTimeout(renderSuggestions, 400);
      }, 350);
    }
  }
}

chatToggle.addEventListener('click', toggleChat);
chatClose.addEventListener('click', toggleChat);

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${type}`;
  msg.innerHTML = `<div class="chat-bubble">${text.replace(/\n/g, '<br/>')}</div>`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const t = document.createElement('div');
  t.className = 'chat-msg bot';
  t.id = 'chat-typing';
  t.innerHTML = `<div class="chat-typing"><span></span><span></span><span></span></div>`;
  chatMessages.appendChild(t);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return t;
}

function renderSuggestions() {
  const container = document.getElementById('chat-suggestions');
  if (!container) return;
  container.innerHTML = '';
  suggestions.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'chat-suggestion';
    btn.textContent = s.label;
    btn.addEventListener('click', () => {
      container.innerHTML = '';
      sendMessage(s.query);
    });
    container.appendChild(btn);
  });
}

function sendMessage(text) {
  if (!text.trim()) return;
  addMessage(text, 'user');
  chatInput.value = '';
  document.getElementById('chat-suggestions').innerHTML = '';

  const typing = showTyping();
  const delay = 500 + Math.random() * 700;

  setTimeout(() => {
    typing.remove();
    addMessage(getResponse(text), 'bot');
  }, delay);
}

chatSend.addEventListener('click', () => sendMessage(chatInput.value));
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage(chatInput.value);
});

// Show badge after 3s to hint at the chatbot
setTimeout(() => {
  if (!chatOpen && chatBadge) {
    chatBadge.style.display = 'flex';
  }
}, 3000);
