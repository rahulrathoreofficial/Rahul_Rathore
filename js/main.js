/* ========================================
   RAHUL RATHORE PORTFOLIO — SCRIPTS
   ======================================== */

'use strict';

// ==================== PROJECT DATA ====================
// EDIT THIS ARRAY TO ADD/UPDATE YOUR PROJECTS
const projects = [
    {
        id: 1,
        title: "Mathnetic",
        category: "app",
        description: "A competitive math exam prep app with 11 themes, brain gym games, aptitude dojo, duel modes, and 20+ calculators. Built for SBI/IBPS and other competitive exams.",
        stack: ["Flutter", "Dart", "Firebase", "Provider"],
        status: "live",
        icon: "🧮",
        image: null, // TODO: Add screenshot path, e.g., "images/projects/mathnetic.png"
        demoLink: "#", // TODO: Add Play Store / App Store link
        codeLink: "#"  // TODO: Add GitHub repo link (if public)
    },
    {
        id: 2,
        title: "X-Ray Sensing Data Suite",
        category: "software",
        description: "MATLAB & Python toolkit for analyzing PMMA-MWCNT composite X-Ray sensing data from Delhi University research. Features visualization, curve fitting, and material characterization.",
        stack: ["Python", "MATLAB", "NumPy", "Matplotlib"],
        status: "live",
        icon: "☢️",
        image: null,
        demoLink: "#",
        codeLink: "#"
    },
    {
        id: 3,
        title: "Portfolio Website",
        category: "website",
        description: "Personal portfolio and blog built with vanilla web technologies featuring particle canvas animations, dual themes, custom cursor, and scroll reveal effects.",
        stack: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
        status: "live",
        icon: "🌐",
        image: null,
        demoLink: "https://rahulrathoreofficial.github.io/Rahul_Rathore",
        codeLink: "https://github.com/rahulrathoreofficial/Rahul_Rathore"
    },
    {
        id: 4,
        title: "Thin Film Deposition Simulator",
        category: "software",
        description: "Educational simulation of PVD sputtering and glow discharge processes for thin film deposition. Includes parameter tuning and real-time visualization.",
        stack: ["Python", "Tkinter", "SciPy"],
        status: "dev",
        icon: "🔬",
        image: null,
        demoLink: "#",
        codeLink: "#"
    },
    {
        id: 5,
        title: "Quantum Puzzle",
        category: "game",
        description: "A physics-based puzzle game where players manipulate electromagnetic fields to guide particles through experimental setups.",
        stack: ["Unity", "C#", "Physics2D"],
        status: "soon",
        icon: "⚛️",
        image: null,
        demoLink: "#",
        codeLink: "#"
    },
    {
        id: 6,
        title: "Physics Formula Hub",
        category: "app",
        description: "A comprehensive reference app for physics formulas, constants, and unit conversions tailored for students and researchers.",
        stack: ["Flutter", "Dart", "LaTeX"],
        status: "soon",
        icon: "📐",
        image: null,
        demoLink: "#",
        codeLink: "#"
    }
];

// ==================== THEME MANAGEMENT ====================
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const body = document.body;
let currentTheme = localStorage.getItem('rahul-theme') || 'mono';

function applyTheme(theme) {
    if (theme === 'mint') {
        body.setAttribute('data-theme', 'mint');
        themeLabel.textContent = 'Mint';
    } else {
        body.removeAttribute('data-theme');
        themeLabel.textContent = 'Mono';
    }
    currentTheme = theme;
    localStorage.setItem('rahul-theme', theme);
}
themeToggle.addEventListener('click', () => applyTheme(currentTheme === 'mono' ? 'mint' : 'mono'));
applyTheme(currentTheme);

// ==================== LOADER ====================
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1500);
});

// ==================== PARTICLE CANVAS ====================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [], mouseX = 0, mouseY = 0;

function getParticleColor() {
    const style = getComputedStyle(body);
    return {
        r: parseInt(style.getPropertyValue('--particle-r')) || 255,
        g: parseInt(style.getPropertyValue('--particle-g')) || 255,
        b: parseInt(style.getPropertyValue('--particle-b')) || 255
    };
}
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas(); window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        const dx = mouseX - this.x, dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
            const force = (150 - distance) / 150;
            this.x -= dx * force * 0.02;
            this.y -= dy * force * 0.02;
        }
    }
    draw() {
        const c = getParticleColor();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(window.innerWidth / 10, 100);
    for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();

function connectParticles() {
    const c = getParticleColor();
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${0.1 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
}
animate();
window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

// ==================== CUSTOM CURSOR ====================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursorDot.style.left = e.clientX - 3 + 'px';
    cursorDot.style.top = e.clientY - 3 + 'px';
});
document.querySelectorAll('a, button, .lab-card, .skill-tag, .stat-item, input, textarea, .lab-filter, .lab-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ==================== TYPING EFFECT ====================
const words = ['Physicist', 'Researcher', 'Developer', 'Innovator', 'Explorer'];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typingElement = document.getElementById('typing');
function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentWord.length) { typeSpeed = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500; }
    setTimeout(typeEffect, typeSpeed);
}
typeEffect();

// ==================== SCROLL REVEAL ====================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ==================== COUNTER ANIMATION ====================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) { entry.target.textContent = target + '+'; clearInterval(timer); }
                else entry.target.textContent = Math.floor(current) + '+';
            }, 30);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// ==================== NAVBAR SCROLL ====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ==================== MOBILE MENU ====================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ==================== BUILD LAB RENDERING ====================
function renderProjects(filter = 'all') {
    const grid = document.getElementById('labGrid');
    if (!grid) return;
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="lab-empty">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔧</div>
                <p>Projects loading soon. Check back later!</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filtered.map(p => `
        <div class="lab-card" data-category="${p.category}">
            <div class="lab-thumb">
                ${p.image ? `<img src="${p.image}" alt="${p.title}" loading="lazy">` : `<div class="lab-thumb-icon">${p.icon}</div>`}
                <span class="lab-status status-${p.status}">${p.status}</span>
            </div>
            <div class="lab-content">
                <div class="lab-category">${p.category}</div>
                <h3 class="lab-title">${p.title}</h3>
                <p class="lab-desc">${p.description}</p>
                <div class="lab-stack">
                    ${p.stack.map(s => `<span class="lab-tag">${s}</span>`).join('')}
                </div>
                <div class="lab-actions">
                    ${p.demoLink && p.demoLink !== '#' ? `<a href="${p.demoLink}" class="lab-btn lab-btn-primary" target="_blank" rel="noopener">Live Demo</a>` : ''}
                    ${p.codeLink && p.codeLink !== '#' ? `<a href="${p.codeLink}" class="lab-btn lab-btn-secondary" target="_blank" rel="noopener">Source</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    if (window.innerWidth > 968) {
        document.querySelectorAll('.lab-card, .lab-btn').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
}

document.querySelectorAll('.lab-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.lab-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

renderProjects();

// ==================== CONTACT FORM (Formspree) ====================
// TODO: Replace YOUR_FORM_ID with your Formspree form ID. Get one at https://formspree.io
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.submit-btn');
        const original = btn.textContent;
        btn.textContent = 'Transmitting...';
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                btn.textContent = 'Message Transmitted!';
                btn.style.background = 'var(--success)';
                contactForm.reset();
            } else {
                btn.textContent = 'Error. Try again.';
            }
        } catch (error) {
            btn.textContent = 'Error. Try again.';
        }
        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
        }, 3000);
    });
}

// ==================== PARALLAX HERO ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.innerWidth > 968) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        heroContent.style.opacity = Math.max(0.3, 1 - (scrolled / 900));
    }
});

// ==================== GLITCH REFRESH ====================
const glitchEl = document.querySelector('.glitch');
if (glitchEl) {
    setInterval(() => {
        glitchEl.style.animation = 'none';
        void glitchEl.offsetWidth;
        glitchEl.style.animation = '';
    }, 10000);
}

// ==================== ACTIVE SECTION HIGHLIGHT ====================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (scrollY >= top) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});

// ==================== DYNAMIC FOOTER YEAR ====================
document.getElementById('year').textContent = new Date().getFullYear();