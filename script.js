// ============================================
// 🚀 GitHub README Generator v2.0
// Auto-Detect + Wizard Step-by-Step
// ============================================

const LANG_COLORS = {
    'JavaScript': '#F7DF1E', 'TypeScript': '#3178C6', 'Python': '#3776AB',
    'PHP': '#777BB4', 'HTML': '#E34F26', 'CSS': '#1572B6', 'Shell': '#89E051',
    'Bash': '#4EAA25', 'Java': '#B07219', 'C': '#555555', 'C++': '#F34B7D',
    'C#': '#178600', 'Go': '#00ADD8', 'Rust': '#DEA584', 'Ruby': '#701516',
    'Kotlin': '#A97BFF', 'Swift': '#F05138', 'Dart': '#00B4AB', 'Vue': '#41B883',
    'Svelte': '#FF3E00', 'SCSS': '#C6538C', 'Less': '#1D365D', 'Lua': '#000080',
    'Perl': '#0298C3', 'R': '#198CE7', 'Scala': '#C22D40', 'Elixir': '#6E4A7E',
    'Haskell': '#5E5086', 'Clojure': '#DB5855', 'Jupyter Notebook': '#DA5B0B',
    'Dockerfile': '#384D54', 'Makefile': '#427819', 'PowerShell': '#012456',
    'Objective-C': '#438EFF', 'Assembly': '#6E4C13', 'MATLAB': '#E16737',
};

const THEMES = [
    { id: 'tokyonight', label: 'Tokyo', swatch: 'linear-gradient(135deg,#1a1b26,#7aa2f7)' },
    { id: 'radical',    label: 'Radical', swatch: 'linear-gradient(135deg,#141321,#fe428e)' },
    { id: 'dracula',    label: 'Dracula', swatch: 'linear-gradient(135deg,#282a36,#ff79c6)' },
    { id: 'gruvbox',    label: 'Gruvbox', swatch: 'linear-gradient(135deg,#282828,#fabd2f)' },
    { id: 'onedark',    label: 'One Dark', swatch: 'linear-gradient(135deg,#282c34,#61afef)' },
    { id: 'synthwave',  label: 'Synthwave', swatch: 'linear-gradient(135deg,#2b213a,#f92aad)' },
];

const COLOR_PRESETS = ['#36BCF7', '#8A2BE2', '#FF6B6B', '#3FB950', '#F7DF1E', '#FF8C00', '#00D9FF', '#FF3E9D'];

// DEFAULT FALLBACK DATA (jika API gagal / rate limit)
const FALLBACK = {
    login: 'nezXproject',
    name: 'nezX',
    bio: 'Currently sharpening full-stack coding fundamentals',
    location: 'Indonesia 🇮🇩',
    avatar_url: 'https://avatars.githubusercontent.com/u/0?v=4',
    public_repos: 7,
    followers: 0,
    following: 0,
    languages: ['JavaScript', 'PHP', 'Python', 'Shell', 'HTML'],
    repos: [
        { name: 'Javascript-GenZ', desc: 'JS tapi versi GenZ? 🤙', lang: 'JavaScript' },
        { name: 'PHP-genZIndonesia', desc: 'PHP pake bahasa Gen Z Indo 😎', lang: 'PHP' },
        { name: 'BypassFuz', desc: 'Security Research Tool', lang: 'Python' },
        { name: 'Ubuntu-Installer-Termux', desc: 'Install Ubuntu di Termux', lang: 'Shell' },
        { name: 'NarzX-Gov', desc: 'Government-related project', lang: 'HTML' },
    ]
};

const state = {
    user: null,
    languages: [],
    projects: [],
    theme: 'tokyonight',
    accent: '#36BCF7',
    typingLines: [],
    step: 1,
};

// ============================================
// NAVIGATION
// ============================================
function goToStep(n) {
    state.step = n;
    document.querySelectorAll('.step-view').forEach(v => v.classList.remove('active'));
    document.getElementById('stepView' + n).classList.add('active');
    document.querySelectorAll('.nav-step').forEach(s => {
        const sn = parseInt(s.dataset.step);
        s.classList.toggle('active', sn === n);
        s.classList.toggle('done', sn < n);
    });
    if (n === 2) updatePreview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// DETECT GITHUB USER
// ============================================
async function detectUser() {
    const username = document.getElementById('ghUsername').value.trim();
    if (!username) return showToast('⚠️ Masukkan username GitHub dulu!', 'error');

    const btn = document.getElementById('btnDetect');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="btn-detect-text">Loading...</span>`;

    try {
        // Fetch user profile
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('User tidak ditemukan');
        const user = await userRes.json();

        // Fetch repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        const repos = reposRes.ok ? await reposRes.json() : [];

        // Calculate languages
        const langCount = {};
        repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
        const languages = Object.entries(langCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([l]) => l);

        // Get top repos (sorted by stars)
        const topRepos = repos
            .filter(r => !r.fork)
            .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
            .slice(0, 6)
            .map(r => ({ name: r.name, desc: r.description || '', lang: r.language || '' }));

        state.user = user;
        state.languages = languages.length ? languages : FALLBACK.languages;
        state.projects = topRepos.length ? topRepos : FALLBACK.repos;

        fillFormFromUser(user);
        renderChips();
        renderProjects();
        renderThemeGrid();
        renderColorPresets();
        renderDetectedCard(user);
        goToStep(2);
        showToast(`✅ Berhasil detect @${username}!`);
    } catch (err) {
        console.warn('API Error, using fallback:', err);
        showToast('⚠️ API limit / gagal. Pakai data contoh.', 'error');
        state.user = FALLBACK;
        state.languages = FALLBACK.languages;
        state.projects = FALLBACK.repos;
        fillFormFromUser(FALLBACK);
        renderChips();
        renderProjects();
        renderThemeGrid();
        renderColorPresets();
        renderDetectedCard(FALLBACK);
        goToStep(2);
    } finally {
        btn.disabled = false;
        btn.innerHTML = orig;
    }
}

function fillFormFromUser(user) {
    document.getElementById('f_displayName').value = user.name || user.login || '';
    document.getElementById('f_role').value = 'Full-Stack Developer in Progress';
    document.getElementById('f_location').value = user.location || 'Indonesia 🇮🇩';
    document.getElementById('f_email').value = user.email || '';
    document.getElementById('f_bio').value = user.bio || 'Focused on building clean, high-impact projects';
    document.getElementById('f_funFact').value = 'Suka membuat project dengan twist kreatif!';
    document.getElementById('f_motto').value = 'Belajar, Bangun, Bagikan 🚀';
    document.getElementById('f_typing').value = [
        'Welcome to My Digital Universe 🌌',
        'Full-Stack Developer in Progress 🚀',
        state.languages.slice(0, 3).join(' | '),
        'Building Clean & High-Impact Projects ✨'
    ].join('\n');
}

function renderDetectedCard(user) {
    document.getElementById('avatarImg').src = user.avatar_url;
    document.getElementById('detectedName').textContent = user.name || user.login;
    document.getElementById('detectedBio').textContent = user.bio || '—';
    document.getElementById('detectedRepos').textContent = `📦 ${user.public_repos} repos`;
    document.getElementById('detectedFollowers').textContent = `👥 ${user.followers} followers`;
    document.getElementById('detectedFollowing').textContent = `➡️ ${user.following} following`;
}

// ============================================
// CHIPS (LANGUAGES)
// ============================================
function renderChips() {
    const wrap = document.getElementById('techChips');
    const allLangs = [...new Set([...state.languages, ...FALLBACK.languages, 'JavaScript', 'Python', 'PHP', 'HTML', 'CSS', 'Shell', 'TypeScript', 'Go', 'Rust', 'Java', 'Kotlin', 'Swift', 'Dart', 'Ruby', 'C++', 'C#'])];
    wrap.innerHTML = '';
    allLangs.forEach(lang => {
        const isActive = state.languages.includes(lang);
        const chip = document.createElement('span');
        chip.className = 'chip' + (isActive ? ' active' : '');
        chip.innerHTML = `${lang}${isActive ? ' <span class="chip-x">✕</span>' : ''}`;
        chip.onclick = (e) => {
            e.stopPropagation();
            toggleLang(lang);
        };
        wrap.appendChild(chip);
    });
    document.getElementById('techCount').textContent = state.languages.length;
}

function toggleLang(lang) {
    const i = state.languages.indexOf(lang);
    if (i >= 0) state.languages.splice(i, 1);
    else state.languages.push(lang);
    renderChips();
    updatePreview();
}

document.addEventListener('input', e => {
    if (e.target.id === 'techCustomInput') return;
});

document.addEventListener('keydown', e => {
    if (e.target.id === 'techCustomInput' && e.key === 'Enter') {
        const val = e.target.value.trim();
        if (val && !state.languages.includes(val)) {
            state.languages.push(val);
            renderChips();
            updatePreview();
        }
        e.target.value = '';
    }
});

// ============================================
// PROJECTS
// ============================================
function renderProjects() {
    const list = document.getElementById('projectsList');
    list.innerHTML = '';
    state.projects.forEach((p, i) => {
        const item = document.createElement('div');
        item.className = 'project-item';
        item.innerHTML = `
            <button class="remove-btn" onclick="removeProject(${i})">✕</button>
            <input type="text" placeholder="Nama repo" value="${escapeHtml(p.name)}" onchange="updateProject(${i},'name',this.value)">
            <input type="text" placeholder="Deskripsi singkat" value="${escapeHtml(p.desc)}" onchange="updateProject(${i},'desc',this.value)">
            <input type="text" placeholder="Tech (pisah koma)" value="${escapeHtml(p.lang)}" onchange="updateProject(${i},'lang',this.value)">
        `;
        list.appendChild(item);
    });
    document.getElementById('projCount').textContent = state.projects.length;
}

function addProject() {
    state.projects.push({ name: '', desc: '', lang: '' });
    renderProjects();
}

function removeProject(i) {
    state.projects.splice(i, 1);
    renderProjects();
    updatePreview();
}

function updateProject(i, key, val) {
    state.projects[i][key] = val;
    updatePreview();
}

// ============================================
// THEME & COLOR
// ============================================
function renderThemeGrid() {
    const grid = document.getElementById('themeGrid');
    grid.innerHTML = '';
    THEMES.forEach(t => {
        const el = document.createElement('div');
        el.className = 'theme-opt' + (state.theme === t.id ? ' active' : '');
        el.innerHTML = `<span class="theme-swatch" style="background:${t.swatch}"></span>${t.label}`;
        el.onclick = () => { state.theme = t.id; renderThemeGrid(); updatePreview(); };
        grid.appendChild(el);
    });
}

function renderColorPresets() {
    const wrap = document.getElementById('colorPresets');
    wrap.innerHTML = '';
    COLOR_PRESETS.forEach(c => {
        const el = document.createElement('div');
        el.className = 'preset' + (state.accent.toLowerCase() === c.toLowerCase() ? ' active' : '');
        el.style.background = c;
        el.onclick = () => {
            state.accent = c;
            document.getElementById('f_accent').value = c;
            document.getElementById('f_accentHex').value = c;
            renderColorPresets();
            updatePreview();
        };
        wrap.appendChild(el);
    });
}

// ============================================
// PREVIEW TAB
// ============================================
function switchPreviewTab(tab) {
    document.querySelectorAll('.ptab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.getElementById('previewRender').style.display = tab === 'rendered' ? 'block' : 'none';
    document.getElementById('previewRaw').style.display = tab === 'raw' ? 'block' : 'none';
}

// ============================================
// BADGE HELPER
// ============================================
const BADGE_MAP = {
    'javascript': ['JavaScript', 'F7DF1E', 'javascript', 'black'],
    'typescript': ['TypeScript', '007ACC', 'typescript', 'white'],
    'python': ['Python', '3776AB', 'python', 'white'],
    'php': ['PHP', '777BB4', 'php', 'white'],
    'html': ['HTML5', 'E34F26', 'html5', 'white'],
    'html5': ['HTML5', 'E34F26', 'html5', 'white'],
    'css': ['CSS3', '1572B6', 'css3', 'white'],
    'css3': ['CSS3', '1572B6', 'css3', 'white'],
    'shell': ['Shell Script', '121011', 'gnu-bash', 'white'],
    'bash': ['Bash', '4EAA25', 'gnu-bash', 'white'],
    'java': ['Java', 'ED8B00', 'openjdk', 'white'],
    'kotlin': ['Kotlin', '0095D5', 'kotlin', 'white'],
    'swift': ['Swift', 'FA7343', 'swift', 'white'],
    'go': ['Go', '00ADD8', 'go', 'white'],
    'golang': ['Go', '00ADD8', 'go', 'white'],
    'rust': ['Rust', '000000', 'rust', 'white'],
    'ruby': ['Ruby', 'CC342D', 'ruby', 'white'],
    'dart': ['Dart', '0175C2', 'dart', 'white'],
    'c': ['C', '00599C', 'c', 'white'],
    'c++': ['C++', '00599C', 'c%2B%2B', 'white'],
    'c#': ['C%23', '239120', 'c-sharp', 'white'],
    'react': ['React', '20232A', 'react', '61DAFB'],
    'vue': ['Vue.js', '35495E', 'vue.js', '4FC08D'],
    'angular': ['Angular', 'DD0031', 'angular', 'white'],
    'next.js': ['Next.js', '000000', 'next.js', 'white'],
    'node.js': ['Node.js', '43853D', 'node.js', 'white'],
    'express': ['Express', '404D59', 'express', 'white'],
    'laravel': ['Laravel', 'FF2D20', 'laravel', 'white'],
    'django': ['Django', '092E20', 'django', 'white'],
    'flask': ['Flask', '000000', 'flask', 'white'],
    'tailwind': ['TailwindCSS', '38B2AC', 'tailwind-css', 'white'],
    'bootstrap': ['Bootstrap', '563D7C', 'bootstrap', 'white'],
    'git': ['Git', 'F05032', 'git', 'white'],
    'github': ['GitHub', '181717', 'github', 'white'],
    'linux': ['Linux', 'FCC624', 'linux', 'black'],
    'ubuntu': ['Ubuntu', 'E95420', 'ubuntu', 'white'],
    'docker': ['Docker', '2496ED', 'docker', 'white'],
    'kubernetes': ['Kubernetes', '326CE5', 'kubernetes', 'white'],
    'aws': ['AWS', '232F3E', 'amazon-aws', 'white'],
    'firebase': ['Firebase', 'FFCA28', 'firebase', 'black'],
    'mysql': ['MySQL', '00000F', 'mysql', 'white'],
    'postgresql': ['PostgreSQL', '316192', 'postgresql', 'white'],
    'mongodb': ['MongoDB', '4EA94B', 'mongodb', 'white'],
    'redis': ['Redis', 'DC382D', 'redis', 'white'],
    'sqlite': ['SQLite', '07405E', 'sqlite', 'white'],
    'figma': ['Figma', 'F24E1E', 'figma', 'white'],
    'vscode': ['VS Code', '007ACC', 'visual-studio-code', 'white'],
    'vs code': ['VS Code', '007ACC', 'visual-studio-code', 'white'],
    'termux': ['Termux', '000000', 'termux', 'white'],
    'postman': ['Postman', 'FF6C37', 'postman', 'white'],
    'vim': ['Vim', '019733', 'vim', 'white'],
    'npm': ['npm', 'CB3837', 'npm', 'white'],
    'yarn': ['Yarn', '2C8EBB', 'yarn', 'white'],
    'composer': ['Composer', '885630', 'composer', 'white'],
};

function getBadge(tech) {
    const key = tech.toLowerCase().trim();
    if (BADGE_MAP[key]) {
        const [label, color, logo, logoColor] = BADGE_MAP[key];
        return `![${tech}](https://img.shields.io/badge/${label}-${color}?style=for-the-badge&logo=${logo}&logoColor=${logoColor})`;
    }
    return `![${tech}](https://img.shields.io/badge/${encodeURIComponent(tech)}-555?style=for-the-badge)`;
}

function getSmallBadge(tech) {
    const key = tech.toLowerCase().trim();
    const c = LANG_COLORS[tech] || (BADGE_MAP[key] ? '#' + BADGE_MAP[key][1] : '#555');
    const color = c.replace('#', '');
    return `![${tech}](https://img.shields.io/badge/-${encodeURIComponent(tech)}-${color}?style=flat-square)`;
}

function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
}

// ============================================
// GENERATE README
// ============================================
function generateReadme() {
    const username = document.getElementById('ghUsername').value.trim() || 'username';
    const displayName = document.getElementById('f_displayName').value.trim() || username;
    const role = document.getElementById('f_role').value.trim();
    const location = document.getElementById('f_location').value.trim();
    const email = document.getElementById('f_email').value.trim();
    const bio = document.getElementById('f_bio').value.trim();
    const funFact = document.getElementById('f_funFact').value.trim();
    const motto = document.getElementById('f_motto').value.trim();
    const typing = document.getElementById('f_typing').value.split('\n').map(s => s.trim()).filter(Boolean);
    const accent = state.accent.replace('#', '');
    const theme = state.theme;
    const langs = state.languages;
    const projects = state.projects.filter(p => p.name);

    const langBadges = langs.map(getBadge).join('\n');

    // Typing lines
    const typingEncoded = typing.map(l => encodeURIComponent(l).replace(/%20/g, '+')).join(';');

    // Projects pins + table
    let projectPins = '';
    let projectCells = '';
    projects.forEach((p, i) => {
        projectPins += `<a href="https://github.com/${username}/${p.name}">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${p.name}&theme=${theme}&hide_border=true&bg_color=0D1117" />
</a>
`;
        if (i % 2 === 1) projectPins += '\n<br><br>\n';

        const techs = (p.lang || '').split(',').map(s => s.trim()).filter(Boolean);
        const smallBadges = techs.map(getSmallBadge).join(' ');
        const emoji = ['🟨','🐘','🛡️','🐧','🚀','⚡','🔥','💎','🎯','🌟'][i % 10];

        projectCells += `<td align="center" width="25%">

**${emoji} ${p.name}**
<br>
<sub>${p.desc || 'No description'}</sub>
<br>
${smallBadges}

</td>
`;
        if ((i + 1) % 4 === 0 && i !== projects.length - 1) projectCells += `</tr>\n<tr>\n`;
    });

    const readme = `<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:${accent},50:8A2BE2,100:FF6B6B&height=250&section=header&text=${encodeURIComponent(displayName)}&fontSize=90&fontColor=fff&animation=twinkling&fontAlignY=35&desc=${encodeURIComponent(role)}&descAlignY=55&descSize=20)

[![Typing SVG](https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=28&pause=1000&color=${accent}&center=true&vCenter=true&random=false&width=800&lines=${typingEncoded})](https://git.io/typing-svg)

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

</div>

---

<div align="center">

## 🌟 **Selamat Datang di Profil Saya!** 🌟

*"Code is not just syntax — it's art, logic, and impact combined."*

</div>

---

## 🚀 Tentang Saya

<img align="right" alt="Coding" width="400" src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif">

\`\`\`typescript
interface Developer {
    name: string;
    alias: string;
    location: string;
    role: string;
    languages: string[];
    motto: string;
}

const ${displayName.replace(/\s+/g, '')}: Developer = {
    name: "${displayName}",
    alias: "${username}",
    location: "${location}",
    role: "${role}",
    languages: [${langs.slice(0, 5).map(l => `"${l}"`).join(', ')}],
    motto: "${motto}"
};
\`\`\`

<br clear="both">

- 🔭 **Sedang Mengerjakan:** ${bio}
- 💬 **Tanya Saya Tentang:** ${langs.slice(0, 3).join(', ')}
- 🎯 **Fokus:** Membangun proyek yang bersih, efisien & berdampak tinggi
- ⚡ **Fun Fact:** ${funFact}
- 🌱 **Belajar:** Selalu! Karena teknologi tidak pernah berhenti berkembang

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🛠️ Tech Arsenal & Skills

<div align="center">

### 💻 **Languages & Tools**
${langBadges}

</div>

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 📌 Proyek Unggulan

<div align="center">

${projectPins}
</div>

${projects.length > 0 ? `### 🎨 **Detail Proyek**

<table align="center">
<tr>
${projectCells}</tr>
</table>` : ''}

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 📊 GitHub Analytics Dashboard

<div align="center">

<img height="200em" src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&include_all_commits=true&count_private=true&hide_border=true&bg_color=0D1117&title_color=${accent}&icon_color=${accent}&text_color=FFFFFF&ring_color=${accent}"/>
<img height="200em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&langs_count=10&theme=${theme}&hide_border=true&bg_color=0D1117&title_color=${accent}&text_color=FFFFFF"/>

</div>

<div align="center">

[![GitHub Streak](https://streak-stats.demolab.com?user=${username}&theme=${theme}&hide_border=true&background=0D1117&ring=${accent}&fire=FF6B6B&currStreakLabel=${accent}&sideLabels=${accent}&dates=FFFFFF&currStreakNum=FFFFFF&sideNums=FFFFFF)](https://git.io/streak-stats)

</div>

<div align="center">

![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=tokyo-night&hide_border=true&bg_color=0D1117&color=${accent}&line=${accent}&point=FFFFFF&area=true&area_color=${accent})

</div>

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🏆 Achievements & Trophies

<div align="center">

![Trophies](https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&no-frame=true&no-bg=true&column=4&row=2&margin-w=15&margin-h=15)

</div>

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🐍 Contribution Snake

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg">
  <img alt="github contribution grid snake animation" src="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg">
</picture>

</div>

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🎯 Roadmap 2026

\`\`\`
📚 Q1 2026  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  Belajar Framework Modern
🚀 Q2 2026  ░░░░░░░░░░░░░░░░░░░░  Bangun Full-Stack Project
🗄️ Q3 2026  ░░░░░░░░░░░░░░░░░░░░  Kontribusi ke Open Source
☁️ Q4 2026  ░░░░░░░░░░░░░░░░░░░░  Explore Cloud & DevOps
\`\`\`

---

## 📫 Mari Terhubung!

<div align="center">

<a href="https://github.com/${username}">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</a>
${email ? `<a href="mailto:${email}">
  <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
</a>` : ''}

<br><br>

**💬 Terbuka untuk kolaborasi, diskusi, atau sekadar ngobrol soal tech!**

</div>

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<div align="center">

### 💡 Quote of the Day

![Quote](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${theme})

</div>

---

<div align="center">

## ⭐ Dari ${displayName}

**Terima kasih sudah mampir ke profil saya! Jangan lupa follow & star repo yang menarik ya! 🌟**

![Profile Views](https://komarev.com/ghpvc/?username=${username}&color=${accent}&style=for-the-badge&label=PROFILE+VIEWS)
[![GitHub followers](https://img.shields.io/github/followers/${username}?label=Followers&style=for-the-badge&color=${accent}&labelColor=0D1117)](https://github.com/${username}?tab=followers)

<br>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:${accent},50:8A2BE2,100:FF6B6B&height=150&section=footer&text=Thanks%20for%20visiting!&fontSize=40&fontColor=fff&animation=twinkling&fontAlignY=65" width="100%"/>

</div>`;

    return readme;
}

// ============================================
// PREVIEW UPDATE (LIVE)
// ============================================
function updatePreview() {
    const md = generateReadme();
    document.getElementById('rawOutput').textContent = md;
    document.getElementById('previewRender').innerHTML = markdownToHtml(md);
}

// Simple markdown → HTML
function markdownToHtml(md) {
    let html = md
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background:#0d1117;padding:14px;border-radius:8px;overflow-x:auto;color:#36BCF7;font-family:JetBrains Mono,monospace;font-size:0.75rem;"><code>$2</code></pre>')
        .replace(/^### (.*$)/gim, '<h3 style="color:#36BCF7;margin:14px 0 8px;font-size:1rem;">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 style="color:#36BCF7;margin:18px 0 10px;font-size:1.15rem;border-bottom:1px solid rgba(54,188,247,0.2);padding-bottom:6px;">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 style="color:#36BCF7;margin:18px 0 10px;">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff;">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="margin:4px;vertical-align:middle;max-width:180px;"/>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:#36BCF7;text-decoration:none;">$1</a>')
        .replace(/<br\s*\/?>/g, '<br>')
        .replace(/\n\n/g, '<div style="height:8px;"></div>')
        .replace(/\n/g, '<br>');
    return html;
}

// ============================================
// COPY / DOWNLOAD
// ============================================
function copyReadme() {
    const md = generateReadme();
    navigator.clipboard.writeText(md).then(() => {
        showToast('📋 README berhasil dicopy!');
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = md; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
        showToast('📋 README berhasil dicopy!');
    });
}

function downloadReadme() {
    const md = generateReadme();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'README.md'; a.click();
    URL.revokeObjectURL(url);
    showToast('⬇️ README.md berhasil didownload!');
}

function copyRepoName() {
    const name = document.getElementById('ghUsername').value.trim() || 'username';
    navigator.clipboard.writeText(name).then(() => showToast(`📋 "${name}" dicopy!`));
}

// ============================================
// TOAST
// ============================================
function showToast(msg, type = 'success') {
    const wrap = document.getElementById('toastWrap');
    const el = document.createElement('div');
    el.className = 'toast ' + (type === 'error' ? 'error' : type === 'info' ? 'info' : '');
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => {
        el.style.transition = 'opacity 0.3s, transform 0.3s';
        el.style.opacity = '0';
        el.style.transform = 'translateX(100px)';
        setTimeout(() => el.remove(), 300);
    }, 2800);
}

// ============================================
// INPUT LISTENERS (LIVE PREVIEW)
// ============================================
['f_displayName','f_role','f_location','f_email','f_bio','f_funFact','f_motto','f_typing'].forEach(id => {
    document.addEventListener('input', e => {
        if (e.target.id === id) updatePreview();
    });
});

document.getElementById('f_accent').addEventListener('input', e => {
    state.accent = e.target.value;
    document.getElementById('f_accentHex').value = e.target.value;
    renderColorPresets();
    updatePreview();
});

document.getElementById('f_accentHex').addEventListener('input', e => {
    const v = e.target.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
        state.accent = v;
        document.getElementById('f_accent').value = v;
        renderColorPresets();
        updatePreview();
    }
});

// ENTER on username input
document.getElementById('ghUsername').addEventListener('keydown', e => {
    if (e.key === 'Enter') detectUser();
});

// ============================================
// INIT
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    renderThemeGrid();
    renderColorPresets();
    updatePreview();
});
