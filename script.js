// ============================================
// 🚀 GitHub Profile README Generator
// Author: nezXproject
// ============================================

// Mapping nama teknologi ke badge
const TECH_BADGES = {
    // Languages
    'python': '![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)',
    'javascript': '![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)',
    'js': '![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)',
    'typescript': '![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)',
    'ts': '![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)',
    'php': '![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)',
    'html': '![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)',
    'html5': '![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)',
    'css': '![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)',
    'css3': '![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)',
    'shell': '![Shell Script](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)',
    'shell script': '![Shell Script](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)',
    'bash': '![Bash](https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white)',
    'java': '![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)',
    'c': '![C](https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white)',
    'c++': '![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)',
    'cpp': '![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)',
    'c#': '![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)',
    'go': '![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)',
    'golang': '![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)',
    'rust': '![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)',
    'ruby': '![Ruby](https://img.shields.io/badge/Ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white)',
    'kotlin': '![Kotlin](https://img.shields.io/badge/Kotlin-0095D5?style=for-the-badge&logo=kotlin&logoColor=white)',
    'swift': '![Swift](https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white)',
    'dart': '![Dart](https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white)',
    
    // Frameworks & Libraries
    'react': '![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)',
    'vue': '![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)',
    'angular': '![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)',
    'next.js': '![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)',
    'nextjs': '![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)',
    'node.js': '![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)',
    'nodejs': '![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)',
    'node': '![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)',
    'express': '![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)',
    'laravel': '![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)',
    'django': '![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)',
    'flask': '![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)',
    'fastapi': '![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)',
    'bootstrap': '![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)',
    'tailwind': '![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)',
    'tailwindcss': '![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)',
    'jquery': '![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)',
    
    // Tools & Platforms
    'git': '![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)',
    'github': '![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)',
    'gitlab': '![GitLab](https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white)',
    'linux': '![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)',
    'ubuntu': '![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)',
    'debian': '![Debian](https://img.shields.io/badge/Debian-A81D33?style=for-the-badge&logo=debian&logoColor=white)',
    'arch': '![Arch Linux](https://img.shields.io/badge/Arch_Linux-1793D1?style=for-the-badge&logo=arch-linux&logoColor=white)',
    'windows': '![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)',
    'termux': '![Termux](https://img.shields.io/badge/Termux-000000?style=for-the-badge&logo=termux&logoColor=white)',
    'vs code': '![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)',
    'vscode': '![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)',
    'visual studio code': '![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)',
    'docker': '![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)',
    'kubernetes': '![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)',
    'aws': '![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)',
    'gcp': '![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)',
    'azure': '![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white)',
    'firebase': '![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)',
    'mysql': '![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)',
    'postgresql': '![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)',
    'postgres': '![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)',
    'mongodb': '![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)',
    'redis': '![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)',
    'sqlite': '![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)',
    'figma': '![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)',
    'photoshop': '![Photoshop](https://img.shields.io/badge/Adobe_Photoshop-31A8FF?style=for-the-badge&logo=adobe-photoshop&logoColor=white)',
    'postman': '![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)',
    'vim': '![Vim](https://img.shields.io/badge/Vim-019733?style=for-the-badge&logo=vim&logoColor=white)',
    'neovim': '![Neovim](https://img.shields.io/badge/Neovim-57A143?style=for-the-badge&logo=neovim&logoColor=white)',
    'npm': '![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)',
    'yarn': '![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)',
    'composer': '![Composer](https://img.shields.io/badge/Composer-885630?style=for-the-badge&logo=composer&logoColor=white)',
    'pip': '![pip](https://img.shields.io/badge/pip-3776AB?style=for-the-badge&logo=pypi&logoColor=white)',
};

// Initialize
let projectCount = 0;

// Add project card
function addProject(name = '', desc = '', tech = '') {
    projectCount++;
    const container = document.getElementById('projectsContainer');
    const card = document.createElement('div');
    card.className = 'project-card';
    card.id = `project-${projectCount}`;
    card.innerHTML = `
        <button class="remove-btn" onclick="removeProject('project-${projectCount}')">✕</button>
        <div class="form-group">
            <label>Nama Repo</label>
            <input type="text" class="project-name" placeholder="Javascript-GenZ" value="${name}">
        </div>
        <div class="form-group">
            <label>Deskripsi</label>
            <input type="text" class="project-desc" placeholder="JS tapi versi GenZ?" value="${desc}">
        </div>
        <div class="form-group">
            <label>Tech (pisahkan dengan koma)</label>
            <input type="text" class="project-tech" placeholder="JavaScript, Node.js" value="${tech}">
        </div>
    `;
    container.appendChild(card);
}

// Remove project card
function removeProject(id) {
    const card = document.getElementById(id);
    if (card) card.remove();
}

// Get badge HTML from tech name
function getBadge(tech) {
    const key = tech.toLowerCase().trim();
    return TECH_BADGES[key] || `![${tech}](https://img.shields.io/badge/${encodeURIComponent(tech)}-555?style=for-the-badge)`;
}

// Generate README
function generateReadme() {
    const username = document.getElementById('username').value.trim() || 'username';
    const displayName = document.getElementById('displayName').value.trim() || username;
    const role = document.getElementById('role').value.trim();
    const location = document.getElementById('location').value.trim();
    const email = document.getElementById('email').value.trim();
    const bio = document.getElementById('bio').value.trim();
    const funFact = document.getElementById('funFact').value.trim();
    const motto = document.getElementById('motto').value.trim();
    const languages = document.getElementById('languages').value.split(',').map(s => s.trim()).filter(Boolean);
    const tools = document.getElementById('tools').value.split(',').map(s => s.trim()).filter(Boolean);
    const theme = document.getElementById('theme').value;
    const accent = document.getElementById('accentColor').value.replace('#', '');

    // Get projects
    const projects = [];
    document.querySelectorAll('.project-card').forEach(card => {
        const name = card.querySelector('.project-name').value.trim();
        const desc = card.querySelector('.project-desc').value.trim();
        const tech = card.querySelector('.project-tech').value.split(',').map(s => s.trim()).filter(Boolean);
        if (name) projects.push({ name, desc, tech });
    });

    // Build languages & tools badges
    const langBadges = languages.map(getBadge).join('\n');
    const toolBadges = tools.map(getBadge).join('\n');

    // Build tech table for projects
    let projectPins = '';
    let projectTable = '';

    projects.forEach((p, i) => {
        projectPins += `<a href="https://github.com/${username}/${p.name}">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${p.name}&theme=${theme}&hide_border=true&bg_color=0D1117" />
</a>
`;
        if (i % 2 === 1) projectPins += '\n<br><br>\n';
        
        const techBadgesSmall = p.tech.map(t => {
            const key = t.toLowerCase().trim();
            const colors = {
                'python': '3776AB', 'javascript': 'F7DF1E', 'php': '777BB4',
                'html': 'E34F26', 'html5': 'E34F26', 'css': '1572B6',
                'shell': '121011', 'shell script': '121011', 'java': 'ED8B00'
            };
            const color = colors[key] || '555';
            return `![${t}](https://img.shields.io/badge/-${encodeURIComponent(t)}-${color}?style=flat-square)`;
        }).join(' ');
        
        const emoji = ['🟨', '🐘', '🛡️', '🐧', '🚀', '⚡', '🔥', '💎', '🎯', '🌟'][i % 10];
        
        projectTable += `<td align="center" width="25%">

**${emoji} ${p.name}**
<br>
<sub>${p.desc || 'No description'}</sub>
<br>
${techBadgesSmall}

</td>
`;
        if ((i + 1) % 4 === 0 && i !== projects.length - 1) {
            projectTable += `</tr>\n<tr>\n`;
        }
    });

    // Compose README
    const readme = `<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:${accent},50:8A2BE2,100:FF6B6B&height=250&section=header&text=${encodeURIComponent(displayName)}&fontSize=90&fontColor=fff&animation=twinkling&fontAlignY=35&desc=${encodeURIComponent(role)}&descAlignY=55&descSize=20)

[![Typing SVG](https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=28&pause=1000&color=${accent}&center=true&vCenter=true&random=false&width=800&lines=Welcome+to+My+Digital+Universe+%F0%9F%8C%8C;${encodeURIComponent(role).replace(/%20/g, '+')}+%F0%9F%9A%80;${languages.map(l => encodeURIComponent(l).replace(/%20/g, '+')).join('+%7C+')};Building+Clean+%26+High-Impact+Projects+%E2%9C%A8;Code+with+Passion%2C+Ship+with+Purpose+%F0%9F%8E%AF)](https://git.io/typing-svg)

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

const ${displayName}: Developer = {
    name: "${displayName}",
    alias: "${username}",
    location: "${location}",
    role: "${role}",
    languages: [${languages.map(l => `"${l}"`).join(', ')}],
    motto: "${motto}"
};
\`\`\`

<br clear="both">

- 🔭 **Sedang Mengerjakan:** ${bio || 'Project menarik!'}
- 💬 **Tanya Saya Tentang:** ${languages.slice(0, 3).join(', ')}
- 🎯 **Fokus:** Membangun proyek yang bersih, efisien & berdampak tinggi
- ⚡ **Fun Fact:** ${funFact || 'Suka ngoding!'}
- 🌱 **Belajar:** Selalu! Karena teknologi tidak pernah berhenti berkembang

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🛠️ Tech Arsenal & Skills

<div align="center">

### 💻 **Programming Languages**
${langBadges}

### ⚙️ **Tools & Platforms**
${toolBadges}

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
${projectTable}</tr>
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
<a href="mailto:${email}">
  <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
</a>

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

    document.getElementById('output').value = readme;
    
    // Render preview
    renderPreview(readme);
    
    showToast('✅ README berhasil di-generate!');
}

// Simple markdown to HTML renderer
function renderPreview(md) {
    let html = md
        // Escape HTML
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        // Code blocks
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background:#161B22;padding:15px;border-radius:8px;overflow-x:auto;color:#36BCF7;"><code>$2</code></pre>')
        // Headers
        .replace(/^### (.*$)/gim, '<h3 style="color:#36BCF7;margin:15px 0;">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 style="color:#36BCF7;margin:20px 0 10px;">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 style="color:#36BCF7;margin:20px 0;">$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Images
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="margin:5px;vertical-align:middle;"/>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:#36BCF7;">$1</a>')
        // Line breaks
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
    
    document.getElementById('renderedPreview').innerHTML = html;
}

// Switch tab
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'raw') {
        document.getElementById('output').style.display = 'block';
        document.getElementById('renderedPreview').style.display = 'none';
    } else {
        document.getElementById('output').style.display = 'none';
        document.getElementById('renderedPreview').style.display = 'block';
    }
}

// Copy to clipboard
function copyReadme() {
    const output = document.getElementById('output');
    if (!output.value) {
        showToast('⚠️ Generate README dulu!', '#F85149');
        return;
    }
    output.select();
    document.execCommand('copy');
    showToast('📋 README berhasil dicopy!');
}

// Download README
function downloadReadme() {
    const content = document.getElementById('output').value;
    if (!content) {
        showToast('⚠️ Generate README dulu!', '#F85149');
        return;
    }
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
    showToast('⬇️ README berhasil didownload!');
}

// Show toast
function showToast(msg, color = '#3FB950') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.background = color;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Clear form
function clearForm() {
    if (!confirm('Yakin ingin reset semua data?')) return;
    document.getElementById('username').value = '';
    document.getElementById('displayName').value = '';
    document.getElementById('role').value = '';
    document.getElementById('location').value = '';
    document.getElementById('email').value = '';
    document.getElementById('bio').value = '';
    document.getElementById('funFact').value = '';
    document.getElementById('motto').value = '';
    document.getElementById('languages').value = '';
    document.getElementById('tools').value = '';
    document.getElementById('projectsContainer').innerHTML = '';
    document.getElementById('output').value = '';
    document.getElementById('renderedPreview').innerHTML = '';
    projectCount = 0;
    showToast('🗑️ Form berhasil direset!');
}

// Initialize with default projects
window.addEventListener('DOMContentLoaded', () => {
    // Tambahkan project default kamu
    addProject('Javascript-GenZ', 'JS tapi versi GenZ? 🤙', 'JavaScript');
    addProject('PHP-genZIndonesia', 'PHP pake bahasa Gen Z Indo 😎', 'PHP');
    addProject('BypassFuz', 'Security Research Tool', 'Python');
    addProject('Ubuntu-Installer-Termux', 'Install Ubuntu di Termux', 'Shell Script');
    addProject('NarzX-Gov', 'Government-related project', 'HTML5');
});
