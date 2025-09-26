/* State */
const html = document.documentElement;
const contentEl = document.getElementById('view');
const crumbsEl = document.getElementById('breadcrumbs');
const sidebarEl = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const themeToggle = document.getElementById('themeToggle');

const SITE = {
  title: 'WPE Journal · GE10',
  sections: ['church', 'classroom', 'court', 'cultural', 'community'],
};

/* Theme */
const THEME_KEY = 'wpe_theme';
function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}
function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return applyTheme(stored);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}
themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

/* Sidebar */
sidebarToggle.addEventListener('click', () => {
  const willOpen = !sidebarEl.classList.contains('open');
  sidebarEl.classList.toggle('open', willOpen);
  sidebarToggle.setAttribute('aria-expanded', String(willOpen));
});

// Close sidebar when navigating on small screens
function autoCloseSidebarForNarrow() {
  if (window.matchMedia('(max-width: 980px)').matches) {
    sidebarEl.classList.remove('open');
    sidebarToggle.setAttribute('aria-expanded', 'false');
  }
}

/* Routing */
function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const parts = raw.split('/').filter(Boolean);
  // routes:
  // home
  // journal/:section/:id
  // journal/advocacy
  return parts;
}

function setActiveLink() {
  document.querySelectorAll('a.nav-link[aria-current="page"]').forEach(a => a.removeAttribute('aria-current'));
  const hash = location.hash || '#/home';
  const link = document.querySelector(`a.nav-link[href="${hash}"]`);
  if (link) {
    link.setAttribute('aria-current', 'page');
    // Expand parent details
    let parent = link.closest('details');
    while (parent) {
      parent.open = true;
      parent = parent.parentElement?.closest?.('details');
    }
  }
}

function renderBreadcrumbs(parts) {
  const crumbs = [];
  crumbs.push(`<a href="#/home">HOME – GE 10</a>`);
  if (parts[0] === 'journal') {
    crumbs.push('Journal');
    if (SITE.sections.includes(parts[1])) {
      const sectionName = parts[1][0].toUpperCase() + parts[1].slice(1);
      crumbs.push(sectionName);
      if (parts[2]) crumbs.push(`Entry ${parts[2]}`);
    } else if (parts[1] === 'advocacy') {
      crumbs.push('Advocacy');
    }
  }
  crumbsEl.innerHTML = crumbs.join(' › ');
}

function renderHome() {
  document.title = SITE.title;
  contentEl.innerHTML = `
    <h2>WPE (Whole Person Education) Journal</h2>
    <p class="muted">Explore your learning journey across Church, Classroom, Court, Cultural, and Community.</p>
    <div class="grid" style="margin-top: 16px;">
      ${SITE.sections.map(s => `
        <article class="card">
          <h3 style="margin: 0 0 6px;">${s[0].toUpperCase() + s.slice(1)}</h3>
          <p class="muted" style="margin: 0 0 8px;">Reflect on experiences and insights in the ${s} domain.</p>
          <a class="nav-link" href="#/journal/${s}/1">Open Journal Entry 1 →</a>
        </article>
      `).join('')}
    </div>
  `;
}

function renderEntry(section, id) {
  const sectionName = section[0].toUpperCase() + section.slice(1);
  document.title = `${sectionName} · Entry ${id} – ${SITE.title}`;
  contentEl.innerHTML = `
    <h2>${sectionName} — Journal Entry ${id}</h2>
    <p class="muted">Date: <em>YYYY-MM-DD</em> · Author: <em>Your Name</em></p>
    <div class="card" style="margin-top: 12px;">
      <h3 style="margin-top: 0;">Prompt</h3>
      <p class="muted">What happened? What did you learn? How does it connect to WPE?</p>
      <h3>Reflection</h3>
      <p>Write your reflection here…</p>
      <h3>Key Takeaways</h3>
      <ul>
        <li>Insight 1</li>
        <li>Insight 2</li>
        <li>Insight 3</li>
      </ul>
    </div>
  `;
}

function renderAdvocacy() {
  document.title = `Advocacy – ${SITE.title}`;
  contentEl.innerHTML = `
    <h2>Advocacy</h2>
    <p class="muted">To be discussed during Midterm Period.</p>
  `;
}

function onRoute() {
  const parts = parseHash();
  if (parts.length === 0 || parts[0] === 'home') {
    renderBreadcrumbs(['home']);
    renderHome();
  } else if (parts[0] === 'journal') {
    renderBreadcrumbs(parts);
    if (parts[1] === 'advocacy') {
      renderAdvocacy();
    } else if (SITE.sections.includes(parts[1]) && parts[2]) {
      renderEntry(parts[1], parts[2]);
    } else {
      // default to journal root
      renderHome();
    }
  } else {
    renderBreadcrumbs([]);
    renderHome();
  }
  setActiveLink();
  autoCloseSidebarForNarrow();
  // focus main for a11y
  requestAnimationFrame(() => {
    document.getElementById('content')?.focus?.();
  });
}

// Initialize
initTheme();
window.addEventListener('hashchange', onRoute);
window.addEventListener('DOMContentLoaded', () => {
  if (!location.hash) location.hash = '#/home';
  onRoute();
});


const passwordBox = document.getElementById("Password");
const length = 16;


const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";

const number = "123456789";
const symbol = "~@!#$%^&*()_+{}[]~?< >";

const alChars = upperCase + lowerCase + number + symbol;

function createPassword(){
    let password ="";

    password = password + upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while(length > password.length){
        password += alChars[Math.floor(Math.random() * alChars.length)];
    }

    passwordBox.value = password;

    const historyItem = document.createElement("h2");
    historyItem.textContent = password;
    
    const historyContainer = document.querySelector(".history");
    historyContainer.appendChild(historyItem);


}