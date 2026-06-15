// ============================================
// CANVAS DOT BACKGROUND WITH MOUSE FOLLOW
// ============================================

const canvas = document.getElementById('dot-canvas');
const ctx = canvas.getContext('2d');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Dot grid configuration
const dotSpacing = 40;
const dotRadius = 2;
const dotColor = 'rgba(124, 58, 237, 0.3)';
const mouseInfluence = 80; // How far dots are affected by mouse

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.vx = 0;
        this.vy = 0;
    }

    update() {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInfluence) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - distance / mouseInfluence) * 2;
            this.vx -= Math.cos(angle) * force;
            this.vy -= Math.sin(angle) * force;
        }

        // Return to original position
        this.vx += (this.originalX - this.x) * 0.1;
        this.vy += (this.originalY - this.y) * 0.1;

        // Damping
        this.vx *= 0.9;
        this.vy *= 0.9;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
    }
}

let dots = [];

function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    dots = [];
    for (let y = 0; y < canvas.height; y += dotSpacing) {
        for (let x = 0; x < canvas.width; x += dotSpacing) {
            dots.push(new Dot(x, y));
        }
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(dot => {
        dot.update();
        dot.draw();
    });

    requestAnimationFrame(animateCanvas);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('resize', () => {
    initializeCanvas();
});

// ============================================
// CLICK CODE PARTICLE EFFECT
// ============================================

const codeCommands = [
    'git commit',
    'npm install',
    'console.log()',
    'import numpy',
    'SELECT *',
    'def train()',
    'for i in range',
    '<div class>',
    'print("Hello")',
    'return true;',
    'async function',
    'const arr = []',
    'if (x > 10)',
    'while (true)',
    'class MyClass',
    'try { } catch',
    'docker run',
    'python main.py',
    'npm test',
    'git push'
];

const particleColors = ['#7c3aed', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

function createCodeParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'code-particle';
    particle.textContent = codeCommands[Math.floor(Math.random() * codeCommands.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.color = particleColors[Math.floor(Math.random() * particleColors.length)];

    document.getElementById('particles-container').appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 1500);
}

document.addEventListener('click', (e) => {
    createCodeParticle(e.clientX, e.clientY);
});

// PROJECT SECTION EMOJI ANIMATIONS — devre dışı
function setupProjectEmojis() {}

// Add CSS animations for project emojis
const style = document.createElement('style');
style.textContent = `
    @keyframes emoji-swoosh-left {
        0% {
            opacity: 0;
            transform: translateX(-150px);
        }
        50% {
            opacity: 0.3;
        }
        100% {
            opacity: 0;
            transform: translateX(-250px);
        }
    }

    @keyframes emoji-swoosh-right {
        0% {
            opacity: 0;
            transform: translateX(150px);
        }
        50% {
            opacity: 0.3;
        }
        100% {
            opacity: 0;
            transform: translateX(250px);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SMOOTH SCROLL & ANIMATIONS
// ============================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.position = 'relative';
        section.style.zIndex = '1';
        observer.observe(section);
    });
}

// ============================================
// FAST SCROLL UP EFFECT ON PAGE LOAD
// ============================================

function setupFastScrollEffect() {
    // Scroll to bottom instantly (without animation)
    window.scrollTo(0, document.body.scrollHeight);

    // Then animate back to top
    let startY = window.scrollY;
    let startTime = null;
    const duration = 1.5; // seconds
    const startTimestamp = performance.now();

    function animateScrollUp(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000; // Convert to seconds
        const progress = Math.min(elapsed / duration, 1); // Clamp to 0-1

        // Easing function for fast scroll feel (ease-in)
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, startY * (1 - easeProgress));

        if (progress < 1) {
            requestAnimationFrame(animateScrollUp);
        } else {
            window.scrollTo(0, 0);
        }
    }

    requestAnimationFrame(animateScrollUp);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeCanvas();
    animateCanvas();
    setupSmoothScroll();
    setupScrollAnimation();
    setupProjectEmojis();
    setupFastScrollEffect();

    console.log('Portfolio initialized ✓');
});

window.addEventListener('resize', () => {
    initializeCanvas();
});
