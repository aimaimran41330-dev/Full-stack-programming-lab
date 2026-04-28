const express = require('express');
const app = express();

// ─── Shared Layout ───────────────────────────────────────────────────────────
const header = (activePage = '') => `
  <header>
    <div class="header-inner">
      <div class="logo">
        <span class="logo-icon">⚡</span>
        <div>
          <div class="logo-title">AirStack Lab</div>
          <div class="logo-sub">Air University · BSSE-VI</div>
        </div>
      </div>
      <nav>
        <a href="/" class="${activePage === 'home' ? 'active' : ''}">Home</a>
        <a href="/students" class="${activePage === 'students' ? 'active' : ''}">Students</a>
        <a href="/home" class="${activePage === 'about-home' ? 'active' : ''}">Pages</a>
        <a href="/user/Ali" class="${activePage === 'user' ? 'active' : ''}">User</a>
      </nav>
      <div class="badge">Lab 10</div>
    </div>
  </header>`;

const footer = () => `
  <footer>
    <div class="footer-inner">
      <div class="footer-left">
        <span class="logo-icon">⚡</span>
        <span>AirStack Lab · Node.js + Express.js</span>
      </div>
      <div class="footer-links">
        <a href="/">Home</a>
        <a href="/students">Students</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      <div class="footer-right">
        Instructor: <strong>Mr. Sharif Hussain</strong>
      </div>
    </div>
    <div class="footer-bottom">
      © 2025 Air University FCAI · Full Stack Programming Lab · BSSE-VI-A & B
    </div>
  </footer>`;

const css = () => `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --navy:   #0a0f1e;
    --dark:   #111827;
    --card:   #161d2e;
    --border: #1e2d45;
    --accent: #00d4ff;
    --gold:   #f5c842;
    --green:  #00e5a0;
    --text:   #e2e8f0;
    --muted:  #64748b;
    --radius: 14px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--navy);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,212,255,0.08), transparent),
      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,229,160,0.05), transparent);
  }

  /* ── Header ── */
  header {
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,15,30,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }
  .header-inner {
    max-width: 1100px; margin: 0 auto;
    padding: 0 32px;
    height: 68px;
    display: flex; align-items: center; gap: 24px;
  }
  .logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
  .logo-icon { font-size: 28px; filter: drop-shadow(0 0 8px var(--accent)); }
  .logo-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 17px; color: #fff; letter-spacing: -0.3px; }
  .logo-sub   { font-size: 11px; color: var(--muted); letter-spacing: 0.5px; }

  nav { display: flex; gap: 4px; margin-left: auto; }
  nav a {
    padding: 7px 16px; border-radius: 8px;
    color: var(--muted); font-size: 14px; font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;
  }
  nav a:hover, nav a.active {
    background: rgba(0,212,255,0.1);
    color: var(--accent);
  }

  .badge {
    background: linear-gradient(135deg, var(--accent), var(--green));
    color: var(--navy); font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 12px;
    padding: 4px 12px; border-radius: 20px;
    letter-spacing: 0.5px;
  }

  /* ── Main ── */
  main { flex: 1; max-width: 1100px; width: 100%; margin: 0 auto; padding: 48px 32px; }

  /* ── Hero (Home) ── */
  .hero {
    text-align: center; padding: 80px 0 60px;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.25);
    color: var(--accent); font-size: 12px; font-weight: 500;
    padding: 6px 16px; border-radius: 20px;
    margin-bottom: 24px; letter-spacing: 0.8px; text-transform: uppercase;
  }
  .hero h1 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(36px, 6vw, 64px);
    line-height: 1.1; letter-spacing: -1.5px;
    background: linear-gradient(135deg, #fff 30%, var(--accent));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-bottom: 20px;
  }
  .hero p {
    font-size: 18px; color: var(--muted); max-width: 520px; margin: 0 auto 48px;
    line-height: 1.7;
  }

  /* ── Cards Grid ── */
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px; text-decoration: none; color: inherit;
    transition: all 0.3s;
    position: relative; overflow: hidden;
  }
  .card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,212,255,0.05), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .card:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
  .card:hover::before { opacity: 1; }

  .card-icon { font-size: 32px; margin-bottom: 16px; }
  .card-task { font-size: 11px; color: var(--accent); font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .card h3 { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 8px; }
  .card p  { font-size: 14px; color: var(--muted); line-height: 1.6; }
  .card-arrow { position: absolute; top: 24px; right: 24px; color: var(--muted); font-size: 18px; transition: all 0.3s; }
  .card:hover .card-arrow { color: var(--accent); transform: translate(3px, -3px); }

  /* ── Page Header ── */
  .page-header {
    padding: 48px 0 40px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 48px;
  }
  .page-header .breadcrumb { font-size: 13px; color: var(--muted); margin-bottom: 12px; }
  .page-header .breadcrumb a { color: var(--accent); text-decoration: none; }
  .page-header h1 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 40px; letter-spacing: -1px;
    color: #fff;
  }
  .page-header p { color: var(--muted); margin-top: 8px; font-size: 16px; }

  /* ── Student List ── */
  .student-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
  .student-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px 24px;
    display: flex; align-items: center; gap: 16px;
    transition: all 0.25s;
  }
  .student-card:hover { border-color: var(--green); transform: translateX(4px); }
  .student-avatar {
    width: 48px; height: 48px; border-radius: 12px;
    background: linear-gradient(135deg, var(--accent), var(--green));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 18px; color: var(--navy); flex-shrink: 0;
  }
  .student-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; }
  .student-roll { font-size: 13px; color: var(--muted); margin-top: 3px; }
  .student-id   { margin-left: auto; font-size: 12px; color: var(--accent); font-weight: 600; }

  /* ── Message Page ── */
  .message-box {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 20px; padding: 64px; text-align: center;
    max-width: 560px; margin: 0 auto;
  }
  .message-icon { font-size: 56px; margin-bottom: 24px; }
  .message-box h2 { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; margin-bottom: 12px; }
  .message-box p  { color: var(--muted); font-size: 16px; line-height: 1.7; margin-bottom: 32px; }

  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 28px; border-radius: 10px;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px;
    text-decoration: none; transition: all 0.25s;
  }
  .btn-primary { background: var(--accent); color: var(--navy); }
  .btn-primary:hover { background: #fff; transform: translateY(-2px); }
  .btn-ghost { background: var(--border); color: var(--text); }
  .btn-ghost:hover { background: rgba(0,212,255,0.15); color: var(--accent); }

  /* ── User Page ── */
  .user-profile {
    max-width: 480px; margin: 0 auto; text-align: center;
  }
  .user-avatar-lg {
    width: 110px; height: 110px; border-radius: 28px;
    background: linear-gradient(135deg, var(--gold), #f97316);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 42px; color: #fff; margin: 0 auto 28px;
    box-shadow: 0 20px 40px rgba(245,200,66,0.25);
  }
  .user-profile h2 { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; }
  .user-profile .user-tag {
    display: inline-block; margin-top: 12px;
    background: rgba(0,229,160,0.1); border: 1px solid rgba(0,229,160,0.25);
    color: var(--green); font-size: 13px; padding: 4px 14px; border-radius: 20px;
  }
  .user-info { margin-top: 32px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .info-chip {
    background: var(--card); border: 1px solid var(--border);
    padding: 12px 20px; border-radius: 10px;
    font-size: 14px; color: var(--muted);
  }
  .info-chip strong { color: var(--text); display: block; font-size: 16px; font-family: 'Syne', sans-serif; }

  /* ── Footer ── */
  footer {
    background: var(--dark);
    border-top: 1px solid var(--border);
    margin-top: auto;
  }
  .footer-inner {
    max-width: 1100px; margin: 0 auto;
    padding: 28px 32px;
    display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
  }
  .footer-left { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--muted); }
  .footer-links { display: flex; gap: 16px; margin-left: auto; }
  .footer-links a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--accent); }
  .footer-right { font-size: 13px; color: var(--muted); }
  .footer-right strong { color: var(--text); }
  .footer-bottom {
    text-align: center; padding: 14px 32px;
    font-size: 12px; color: var(--muted);
    border-top: 1px solid var(--border);
  }

  /* ── Route Pills ── */
  .route-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
  .pill {
    background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.2);
    color: var(--accent); font-size: 13px; padding: 6px 14px; border-radius: 8px;
    font-family: 'DM Mono', monospace;
  }
`;

const layout = (title, body, page = '') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} · AirStack Lab</title>
  <style>${css()}</style>
</head>
<body>
  ${header(page)}
  <main>${body}</main>
  ${footer()}
</body>
</html>`;

// ─── TASK 4: Home Page ────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send(layout('Home', `
    <div class="hero">
      <div class="hero-tag">⚡ Node.js + Express.js</div>
      <h1>Full Stack<br/>Programming Lab</h1>
      <p>Lab 10 — Air University BSSE-VI-A & B<br/>Instructor: Mr. Sharif Hussain</p>
    </div>

    <div class="grid">
      <a class="card" href="/students">
        <div class="card-icon">📚</div>
        <div class="card-task">Task 1</div>
        <h3>Student List</h3>
        <p>View all students stored in an array, displayed with HTML.</p>
        <span class="card-arrow">↗</span>
      </a>
      <a class="card" href="/home">
        <div class="card-icon">🗺️</div>
        <div class="card-task">Task 2</div>
        <h3>Message Routes</h3>
        <p>Navigate /home, /about, /contact — each with unique messages.</p>
        <span class="card-arrow">↗</span>
      </a>
      <a class="card" href="/user/Ali">
        <div class="card-icon">👤</div>
        <div class="card-task">Task 3</div>
        <h3>Dynamic User Page</h3>
        <p>Route /user/:name greets any user by their name dynamically.</p>
        <span class="card-arrow">↗</span>
      </a>
      <a class="card" href="/">
        <div class="card-icon">🌐</div>
        <div class="card-task">Task 4</div>
        <h3>HTML Renderer</h3>
        <p>This page itself — a full styled HTML page served by Express.</p>
        <span class="card-arrow">↗</span>
      </a>
    </div>

    <div class="route-pills" style="margin-top:40px">
      <span class="pill">GET /</span>
      <span class="pill">GET /students</span>
      <span class="pill">GET /home</span>
      <span class="pill">GET /about</span>
      <span class="pill">GET /contact</span>
      <span class="pill">GET /user/:name</span>
    </div>
  `, 'home'));
});

// ─── TASK 1: Student List ─────────────────────────────────────────────────────
const students = [
  { id: 1, name: "Ali Ahmed",    roll: "BSSE-01", course: "Full Stack" },
  { id: 2, name: "Sara Khan",    roll: "BSSE-02", course: "Full Stack" },
  { id: 3, name: "Usman Malik",  roll: "BSSE-03", course: "Full Stack" },
  { id: 4, name: "Ayesha Noor",  roll: "BSSE-04", course: "Full Stack" },
  { id: 5, name: "Bilal Hassan", roll: "BSSE-05", course: "Full Stack" },
  { id: 6, name: "Hina Tariq",   roll: "BSSE-06", course: "Full Stack" },
];

app.get('/students', (req, res) => {
  const cards = students.map(s => `
    <div class="student-card">
      <div class="student-avatar">${s.name.charAt(0)}</div>
      <div>
        <div class="student-name">${s.name}</div>
        <div class="student-roll">${s.roll} · ${s.course}</div>
      </div>
      <div class="student-id">#${s.id}</div>
    </div>`).join('');

  res.send(layout('Students', `
    <div class="page-header">
      <div class="breadcrumb"><a href="/">Home</a> → Students</div>
      <h1>📚 Student List</h1>
      <p>${students.length} students enrolled in BSSE-VI Full Stack Lab</p>
    </div>
    <div class="student-grid">${cards}</div>
  `, 'students'));
});

// ─── TASK 2: Message Routes ───────────────────────────────────────────────────
app.get('/home', (req, res) => {
  res.send(layout('Home Page', `
    <div class="page-header">
      <div class="breadcrumb"><a href="/">Dashboard</a> → Home</div>
      <h1>🏠 Home Page</h1>
    </div>
    <div class="message-box">
      <div class="message-icon">🏠</div>
      <h2>Welcome Home!</h2>
      <p>You have reached the Home route.<br/>This page is served by Express.js running on Node.js.</p>
      <a href="/" class="btn btn-primary">Back to Dashboard</a>
    </div>
  `, 'about-home'));
});

app.get('/about', (req, res) => {
  res.send(layout('About', `
    <div class="page-header">
      <div class="breadcrumb"><a href="/">Dashboard</a> → About</div>
      <h1>ℹ️ About Page</h1>
    </div>
    <div class="message-box">
      <div class="message-icon">🎓</div>
      <h2>About This Lab</h2>
      <p>Lab 10 — Full Stack Programming<br/>Node.js + Express.js · Air University FCAI<br/>Instructor: Mr. Sharif Hussain</p>
      <a href="/" class="btn btn-primary">Back to Dashboard</a>
    </div>
  `));
});

app.get('/contact', (req, res) => {
  res.send(layout('Contact', `
    <div class="page-header">
      <div class="breadcrumb"><a href="/">Dashboard</a> → Contact</div>
      <h1>📞 Contact Page</h1>
    </div>
    <div class="message-box">
      <div class="message-icon">✉️</div>
      <h2>Get In Touch</h2>
      <p>Instructor: Mr. Sharif Hussain<br/>Email: sharifali.aulecturer@gmail.com<br/>Air University · FCAI, Islamabad</p>
      <a href="/" class="btn btn-primary">Back to Dashboard</a>
    </div>
  `));
});

// ─── TASK 3: Dynamic User ─────────────────────────────────────────────────────
app.get('/user/:name', (req, res) => {
  const name = req.params.name;
  const initial = name.charAt(0).toUpperCase();
  res.send(layout(`Hello ${name}`, `
    <div class="page-header">
      <div class="breadcrumb"><a href="/">Dashboard</a> → User</div>
      <h1>👤 User Profile</h1>
    </div>
    <div class="user-profile">
      <div class="user-avatar-lg">${initial}</div>
      <h2>Hello, ${name}!</h2>
      <span class="user-tag">✅ Active Student</span>
      <div class="user-info">
        <div class="info-chip"><strong>${name}</strong>Name</div>
        <div class="info-chip"><strong>BSSE-VI</strong>Batch</div>
        <div class="info-chip"><strong>Air University</strong>Campus</div>
      </div>
      <div style="margin-top:40px;display:flex;gap:12px;justify-content:center">
        <a href="/" class="btn btn-primary">Dashboard</a>
        <a href="/students" class="btn btn-ghost">All Students</a>
      </div>
    </div>
  `, 'user'));
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(3000, () => {
  console.log('✅ Server chal raha hai: http://localhost:3000');
});