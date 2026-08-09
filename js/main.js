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

// ==================== QUANTUM NEURAL NETWORK CANVAS ====================
(function() {
    'use strict';

    const canvas = document.getElementById('particle-canvas');
    if (!canvas) { console.error('QNN: Canvas not found'); return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) { console.error('QNN: Context not found'); return; }

    let mouseX = 0, mouseY = 0;
    let qnnNodes = [];
    let qnnConnections = [];
    let qnnPulses = [];
    let shockwaves = [];
    let camera = { rotX: 0, rotY: 0, zoom: 1 };
    let isDragging = false;
    let dragStartX = 0, dragStartY = 0;
    let cameraRotYStart = 0, cameraRotXStart = 0;
    let time = 0;
    let animationId = null;

    function getParticleColor() {
        try {
            const style = getComputedStyle(document.body);
            return {
                r: parseInt(style.getPropertyValue('--particle-r')) || 255,
                g: parseInt(style.getPropertyValue('--particle-g')) || 255,
                b: parseInt(style.getPropertyValue('--particle-b')) || 255
            };
        } catch (e) { return { r: 255, g: 255, b: 255 }; }
    }

    function resizeCanvas() {
        try {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initQNN();
        } catch (e) { console.error('QNN resize error:', e); }
    }

    class QNNNode {
        constructor(x, y, z, idx) {
            this.ox = x; this.oy = y; this.oz = z;
            this.x = x; this.y = y; this.z = z;
            this.idx = idx;
            this.size = 0.8 + Math.random() * 1.8;
            this.phase = Math.random() * Math.PI * 2;
            this.energy = 0;
        }

        project() {
            let x = this.x, y = this.y, z = this.z;
            let cosY = Math.cos(camera.rotY), sinY = Math.sin(camera.rotY);
            let x1 = x * cosY - z * sinY;
            let z1 = x * sinY + z * cosY;
            let cosX = Math.cos(camera.rotX), sinX = Math.sin(camera.rotX);
            let y2 = y * cosX - z1 * sinX;
            let z2 = y * sinX + z1 * cosX;
            let scale = camera.zoom * (900 / (900 + z2));
            return {
                x: canvas.width / 2 + x1 * scale,
                y: canvas.height / 2 + y2 * scale,
                z: z2,
                scale: scale,
                visible: z2 > -900
            };
        }

        draw(proj, color) {
            if (!proj || !proj.visible) return;
            let breathe = Math.sin(time * 1.5 + this.phase) * 0.3 + 0.7;
            let s = this.size * proj.scale * breathe;
            let alpha = Math.max(0, Math.min(1, (1 - (proj.z + 300) / 1200))) * 0.6;

            // Glow
            let g = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, s * 5);
            g.addColorStop(0, `rgba(${color.r},${color.g},${color.b},${alpha * 0.3})`);
            g.addColorStop(0.5, `rgba(${color.r},${color.g},${color.b},${alpha * 0.05})`);
            g.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, s * 5, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, s, 0, Math.PI * 2);
            ctx.fill();

            // Energy highlight
            if (this.energy > 0.01) {
                ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${this.energy * alpha})`;
                ctx.beginPath();
                ctx.arc(proj.x, proj.y, s * (1 + this.energy * 6), 0, Math.PI * 2);
                ctx.fill();
                this.energy *= 0.92;
            }
        }
    }

    class QNNPulse {
        constructor(startIdx) {
            this.path = [startIdx];
            this.progress = 0;
            this.speed = 0.08;
            this.current = startIdx;
            this.dead = false;
        }
        step() {
            if (this.dead) return;
            this.progress += this.speed;
            let candidates = qnnConnections.filter(c => c.a === this.current || c.b === this.current);
            if (candidates.length === 0 || this.path.length > 8) { this.dead = true; return; }
            let next = candidates[Math.floor(Math.random() * candidates.length)];
            let ni = next.a === this.current ? next.b : next.a;
            if (!this.path.includes(ni)) {
                this.path.push(ni);
                if (qnnNodes[this.current]) qnnNodes[this.current].energy = 1;
                this.current = ni;
            } else this.dead = true;
        }
        draw(color) {
            if (this.path.length < 2) return;
            let idx = Math.min(Math.floor(this.progress), this.path.length - 1);
            let from = qnnNodes[this.path[idx]];
            let to = qnnNodes[this.path[Math.min(idx + 1, this.path.length - 1)]];
            if (!from || !to) return;
            let p1 = from.project(), p2 = to.project();
            if (!p1 || !p2 || !p1.visible || !p2.visible) return;
            let t = this.progress - idx;
            let x = p1.x + (p2.x - p1.x) * t;
            let y = p1.y + (p2.y - p1.y) * t;

            let g = ctx.createRadialGradient(x, y, 0, x, y, 14);
            g.addColorStop(0, `rgba(${color.r},${color.g},${color.b},0.85)`);
            g.addColorStop(0.3, `rgba(${color.r},${color.g},${color.b},0.15)`);
            g.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},1)`;
            ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();

            ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},0.35)`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(x, y); ctx.stroke();
        }
    }

    // SHOCKWAVE: radial burst from click point
    class Shockwave {
        constructor(ox, oy) {
            this.ox = ox; this.oy = oy;
            this.radius = 0;
            this.maxRadius = Math.max(canvas.width, canvas.height) * 0.9;
            this.speed = 10;
            this.dead = false;
            this.radialLines = [];
            this.age = 0;
        }

        step() {
            this.age++;
            this.radius += this.speed;
            if (this.radius > this.maxRadius) { this.dead = true; return; }

            let ringInner = this.radius - 40;
            let ringOuter = this.radius + 40;

            qnnNodes.forEach((n, i) => {
                let p = n.project();
                if (!p || !p.visible) return;
                let dx = p.x - this.ox;
                let dy = p.y - this.oy;
                let dist = Math.sqrt(dx*dx + dy*dy);

                if (dist >= ringInner && dist <= ringOuter) {
                    let intensity = Math.max(0, 1 - dist / this.maxRadius);
                    n.energy = Math.max(n.energy, intensity);

                    this.radialLines.push({
                        tx: p.x, ty: p.y,
                        intensity: intensity,
                        life: 1.0
                    });
                }
            });
        }

        draw(color) {
            let colorStr = `${color.r},${color.g},${color.b}`;
            let globalFade = Math.max(0, 1 - this.age / 80);

            // Expanding ring
            let ringAlpha = globalFade * 0.25;
            ctx.strokeStyle = `rgba(${colorStr},${ringAlpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.ox, this.oy, this.radius, 0, Math.PI * 2);
            ctx.stroke();

            // Secondary ring (echo)
            let echoR = this.radius * 0.7;
            if (echoR > 0) {
                ctx.strokeStyle = `rgba(${colorStr},${ringAlpha * 0.4})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(this.ox, this.oy, echoR, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Radial lines from click point to hit nodes
            this.radialLines.forEach(line => {
                line.life -= 0.025;
                if (line.life <= 0) return;
                let a = line.intensity * line.life * globalFade * 0.9;
                if (a <= 0.01) return;

                ctx.strokeStyle = `rgba(${colorStr},${a})`;
                ctx.lineWidth = 1.2 * line.life;
                ctx.beginPath();
                ctx.moveTo(this.ox, this.oy);
                ctx.lineTo(line.tx, line.ty);
                ctx.stroke();

                // Small glow at the node end
                let g = ctx.createRadialGradient(line.tx, line.ty, 0, line.tx, line.ty, 6);
                g.addColorStop(0, `rgba(${colorStr},${a * 0.5})`);
                g.addColorStop(1, `rgba(${colorStr},0)`);
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(line.tx, line.ty, 6, 0, Math.PI * 2);
                ctx.fill();
            });

            this.radialLines = this.radialLines.filter(l => l.life > 0);
        }
    }

    function initQNN() {
        try {
            qnnNodes = [];
            qnnConnections = [];
            qnnPulses = [];
            shockwaves = [];

            // DENSER: up to 220 nodes
            let count = Math.min(Math.floor(window.innerWidth / 8), 220);
            // Larger radius to cover full viewport
            let r = Math.max(canvas.width, canvas.height) * 0.65;
            if (r < 150) r = 150;

            // Spherical distribution
            for (let i = 0; i < count; i++) {
                let phi = Math.acos(-1 + (2 * i) / count);
                let theta = Math.sqrt(count * Math.PI) * phi;
                let x = r * Math.cos(theta) * Math.sin(phi);
                let y = r * Math.sin(theta) * Math.sin(phi);
                let z = r * Math.cos(phi);
                qnnNodes.push(new QNNNode(x, y, z, i));
            }

            // DENSER connections: wider threshold
            for (let i = 0; i < qnnNodes.length; i++) {
                for (let j = i + 1; j < qnnNodes.length; j++) {
                    let dx = qnnNodes[i].ox - qnnNodes[j].ox;
                    let dy = qnnNodes[i].oy - qnnNodes[j].oy;
                    let dz = qnnNodes[i].oz - qnnNodes[j].oz;
                    let dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                    if (dist < r * 0.42) {
                        qnnConnections.push({ a: i, b: j });
                    }
                }
            }
        } catch (e) { console.error('QNN init error:', e); }
    }

    function isInteractive(el) {
        if (!el || !el.tagName) return false;
        const tag = el.tagName.toLowerCase();
        return tag === 'a' || tag === 'button' || tag === 'input' || tag === 'textarea' ||
               tag === 'select' || tag === 'label' ||
               (el.closest && (el.closest('a') || el.closest('button') || el.closest('.lab-card') ||
                el.closest('.nav-links') || el.closest('.menu-toggle') ||
                el.closest('.theme-toggle') || el.closest('.contact-form')));
    }

    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    // CLICK: create shockwave + pulse
    window.addEventListener('click', (e) => {
        if (isInteractive(e.target)) return;

        try {
            // Always create shockwave at click point
            shockwaves.push(new Shockwave(e.clientX, e.clientY));

            // Also find nearest node for network pulse
            let best = -1, bestDist = Infinity;
            qnnNodes.forEach((n, i) => {
                let p = n.project();
                if (!p || !p.visible) return;
                let dx = e.clientX - p.x, dy = e.clientY - p.y;
                let d = Math.sqrt(dx*dx + dy*dy);
                if (d < bestDist && d < 150) { bestDist = d; best = i; }
            });

            if (best >= 0) {
                qnnPulses.push(new QNNPulse(best));
                qnnNodes[best].energy = 1;
            } else {
                let visible = qnnNodes.map((n, i) => ({ idx: i, proj: n.project() }))
                    .filter(n => n.proj && n.proj.visible);
                if (visible.length > 0) {
                    let closest = visible.reduce((a, b) => {
                        let da = Math.sqrt((e.clientX - a.proj.x)**2 + (e.clientY - a.proj.y)**2);
                        let db = Math.sqrt((e.clientX - b.proj.x)**2 + (e.clientY - b.proj.y)**2);
                        return da < db ? a : b;
                    });
                    qnnPulses.push(new QNNPulse(closest.idx));
                    qnnNodes[closest.idx].energy = 1;
                }
            }
        } catch (err) { console.error('QNN click error:', err); }
    });

    // Drag to rotate
    window.addEventListener('mousedown', (e) => {
        if (isInteractive(e.target)) return;
        isDragging = true;
        dragStartX = e.clientX; dragStartY = e.clientY;
        cameraRotYStart = camera.rotY; cameraRotXStart = camera.rotX;
    });
    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            camera.rotY = cameraRotYStart + (e.clientX - dragStartX) * 0.004;
            camera.rotX = cameraRotXStart + (e.clientY - dragStartY) * 0.004;
        }
    });
    window.addEventListener('mouseup', () => isDragging = false);

    // Touch
    window.addEventListener('touchstart', (e) => {
        if (isInteractive(e.target)) return;
        let t = e.touches[0];
        isDragging = true;
        dragStartX = t.clientX; dragStartY = t.clientY;
        cameraRotYStart = camera.rotY; cameraRotXStart = camera.rotX;
        shockwaves.push(new Shockwave(t.clientX, t.clientY));

        let visible = qnnNodes.map((n, i) => ({ idx: i, proj: n.project() }))
            .filter(n => n.proj && n.proj.visible);
        if (visible.length > 0) {
            let closest = visible.reduce((a, b) => {
                let da = Math.sqrt((t.clientX - a.proj.x)**2 + (t.clientY - a.proj.y)**2);
                let db = Math.sqrt((t.clientX - b.proj.x)**2 + (t.clientY - b.proj.y)**2);
                return da < db ? a : b;
            });
            qnnPulses.push(new QNNPulse(closest.idx));
            qnnNodes[closest.idx].energy = 1;
        }
    });
    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            let t = e.touches[0];
            camera.rotY = cameraRotYStart + (t.clientX - dragStartX) * 0.004;
            camera.rotX = cameraRotXStart + (t.clientY - dragStartY) * 0.004;
        }
    });
    window.addEventListener('touchend', () => isDragging = false);

    function animateQNN() {
        try {
            time += 0.016;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let color = getParticleColor();

            if (!isDragging) {
                camera.rotY += 0.0006;
                camera.rotX = Math.sin(time * 0.12) * 0.05;
            }

            // Draw connections
            qnnConnections.forEach(c => {
                let p1 = qnnNodes[c.a] ? qnnNodes[c.a].project() : null;
                let p2 = qnnNodes[c.b] ? qnnNodes[c.b].project() : null;
                if (!p1 || !p2 || !p1.visible || !p2.visible) return;
                let alpha = Math.max(0, Math.min(1, (1 - (p1.z + p2.z + 500) / 1800))) * 0.06;
                let eb = ((qnnNodes[c.a] && qnnNodes[c.a].energy) || 0) +
                         ((qnnNodes[c.b] && qnnNodes[c.b].energy) || 0) * 0.15;
                alpha += eb;
                ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
                ctx.lineWidth = 0.5 + eb;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            });

            // Draw nodes
            qnnNodes.forEach(n => n.draw(n.project(), color));

            // Update and draw pulses
            qnnPulses = qnnPulses.filter(p => !p.dead);
            qnnPulses.forEach(p => { p.step(); p.draw(color); });

            // Update and draw shockwaves
            shockwaves = shockwaves.filter(s => !s.dead);
            shockwaves.forEach(s => { s.step(); s.draw(color); });

            animationId = requestAnimationFrame(animateQNN);
        } catch (e) {
            console.error('QNN animation error:', e);
            if (animationId) cancelAnimationFrame(animationId);
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animateQNN();

})();

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
