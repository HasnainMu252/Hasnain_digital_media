

// ============================
// INIT (OPTIMIZED)
// ============================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initSideNav();
    initTyping();
    initCounters();
    initProgressBar();
    initBackToTop();
    initFilter();
    initSkillBars();
    initContactForm();
    initHireModal();
    initWhatsApp();
    initTestimonials();
    initRadarChart();

    runWhenIdle(() => initAOS(), 120);
    runWhenIdle(() => initParticles(), 220);
   

    setTimeout(() => {
        showToast('info', 'Welcome!', 'Thanks for visiting my portfolio.', 3200);
    }, 1000);
});


function runWhenIdle(callback, timeout = 200) {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(callback, { timeout });
    } else {
        setTimeout(callback, timeout);
    }
}

// ============================
// PARTICLES
// ============================

function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    particlesJS('particles-js', {
        particles: {
            number: { value: 16, density: { enable: true, value_area: 1000 } },
            color: { value: '#7c3aed' },
            shape: { type: 'circle' },
            opacity: { value: 0.22, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 120, color: '#7c3aed', opacity: 0.12, width: 1 },
            move: { enable: true, speed: 0.45, direction: 'none', random: true, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: false, mode: 'grab' },
                onclick: { enable: false, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 100, line_linked: { opacity: 0.25 } },
                push: { particles_nb: 2 }
            }
        },
        retina_detect: false
    });
}

// ============================
// AOS
// ============================

function initAOS() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
        duration: 450,
        easing: 'ease-out-cubic',
        once: true,
        offset: 30,
        disable: window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
}

// ============================
// THEME
// ============================
function initTheme() {
    const btns = document.querySelectorAll('.theme-btn');
    const saved = localStorage.getItem('p-theme') || 'dark';
    applyTheme(saved);
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const t = btn.getAttribute('data-theme');
            applyTheme(t);
            localStorage.setItem('p-theme', t);
        });
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-theme') === theme);
    });
}

// ============================
// NAVBAR
// ============================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navbar || !hamburger || !navMenu || !navLinks.length) return;

    let navTicking = false;
    window.addEventListener('scroll', () => {
        if (navTicking) return;
        navTicking = true;
        requestAnimationFrame(() => {
            navbar.classList.toggle('scrolled', window.scrollY > 70);
            updateActiveNav();
            navTicking = false;
        });
    }, { passive: true });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const target = document.querySelector(link.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 65, behavior: 'smooth' });
        });
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) current = s.id; });
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
}

// ============================
// TYPING EFFECT
// ============================
function initTyping() {
    const el = document.querySelector('.typed-text');
    if (!el) return;
    const words = ['Shopify Developer', 'WordPress Expert', 'eCommerce Builder', 'Full Stack Developer', 'Dropshipping Setup Expert'];
    let wIdx = 0, cIdx = 0, del = false;

    function type() {
        const word = words[wIdx];
        el.textContent = del ? word.substring(0, cIdx--) : word.substring(0, ++cIdx);
        let speed = del ? 38 : 62;
        if (!del && cIdx === word.length) { speed = 1800; del = true; }
        else if (del && cIdx === 0) { del = false; wIdx = (wIdx + 1) % words.length; speed = 350; }
        setTimeout(type, speed);
    }
    type();
}

// ============================
// COUNTERS
// ============================
function initCounters() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target, target = +el.getAttribute('data-target');
            let c = 0;
            const step = Math.ceil(target / 55);
            const t = setInterval(() => {
                c = Math.min(c + step, target);
                el.textContent = c;
                if (c >= target) { el.textContent = target + '+'; clearInterval(t); }
            }, 22);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(c => obs.observe(c));
}

// ============================
// PROGRESS BAR
// ============================
function initProgressBar() {
    const bar = document.getElementById('progressBar');
    let progressTicking = false;
    window.addEventListener('scroll', () => {
        if (progressTicking) return;
        progressTicking = true;
        requestAnimationFrame(() => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
            progressTicking = false;
        });
    }, { passive: true });
}

// ============================
// BACK TO TOP
// ============================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 350), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================
// PROJECT FILTER
// ============================
function initFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.getAttribute('data-filter');
            cards.forEach(c => {
                const show = f === 'all' || c.getAttribute('data-category') === f;
                c.style.display = show ? 'block' : 'none';
                if (show) c.style.animation = 'fadeIn 0.35s ease';
            });
        });
    });
}

// ============================
// SKILL BARS
// ============================
function initSkillBars() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.width = e.target.getAttribute('data-width') + '%';
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-fill').forEach(b => obs.observe(b));
}

// ============================
// GITHUB API - FETCH PROJECTS
// ============================
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slider = document.querySelector('.slider');
let slideIndex = 0;

const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}

nextButton.addEventListener('click', () => {
  slideIndex++;
  showSlide(slideIndex);
});

prevButton.addEventListener('click', () => {
  slideIndex--;
  showSlide(slideIndex);
});

// Auto slide every 5 seconds
setInterval(() => {
  slideIndex++;
  showSlide(slideIndex);
}, 5000);

// ============================
// CONTACT FORM
// ============================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const msg = document.getElementById('formMsg');
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        toggleBtn(btn, true);
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                showMsg(msg, 'success', '✅ Message sent! I will reply within 24 hours.');
                showToast('success', 'Message sent!', 'I will reply within 24 hours.', 3200);
                form.reset();
            } else throw new Error();
        } catch {
            showMsg(msg, 'error', '❌ Failed. Please email: Hasnainmuneer@gmail.com');
        } finally {
            toggleBtn(btn, false);
        }
    });
}

// ============================
// HIRE MODAL - MULTI STEP
// ============================
function initHireModal() {
    const modal = document.getElementById('hireModal');
    const closeBtn = document.getElementById('closeModal');
    const closeSuccess = document.getElementById('closeSuccess');
    const form = document.getElementById('hireForm');
    const msg = document.getElementById('hireFormMsg');
    const successScreen = document.getElementById('modalSuccess');
    if (!modal || !closeBtn || !form) return;

    // Open all hire buttons
    document.querySelectorAll('.hire-btn').forEach(btn => {
        btn.addEventListener('click', () => openModal());
    });

    // Close
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    if (closeSuccess) closeSuccess.addEventListener('click', closeModal);

    // Multi-step navigation
    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStep = btn.getAttribute('data-next');
            const currentStep = btn.closest('.form-step').id.replace('step', '');

            // Validate current step
            if (currentStep === '1') {
                const name = document.getElementById('hire_name');
                const email = document.getElementById('hire_email');
                if (!name.value.trim() || !email.value.trim()) {
                    name.style.borderColor = !name.value.trim() ? 'var(--error)' : 'var(--border)';
                    email.style.borderColor = !email.value.trim() ? 'var(--error)' : 'var(--border)';
                    return;
                }
                name.style.borderColor = 'var(--border)';
                email.style.borderColor = 'var(--border)';
            }

            if (currentStep === '2') {
                const selected = form.querySelector('input[name="service"]:checked');
                if (!selected) {
                    document.querySelector('.service-grid').style.outline = '2px solid var(--error)';
                    document.querySelector('.service-grid').style.borderRadius = '10px';
                    setTimeout(() => {
                        document.querySelector('.service-grid').style.outline = 'none';
                    }, 2000);
                    return;
                }
            }

            goToStep(parseInt(nextStep));
        });
    });

    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', () => goToStep(parseInt(btn.getAttribute('data-prev'))));
    });

    // Form submit
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('.modal-submit');
        toggleBtn(btn, true);
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                // Hide form, show success
                form.style.display = 'none';
                document.querySelector('.modal-steps').style.display = 'none';
                successScreen.classList.add('show');
            } else throw new Error();
        } catch {
            showMsg(msg, 'error', '❌ Failed. Please WhatsApp or email me directly.');
        } finally {
            toggleBtn(btn, false);
        }
    });

    function goToStep(step) {
        document.querySelectorAll('.form-step').forEach(s => s.classList.add('hidden'));
        document.getElementById(`step${step}`).classList.remove('hidden');

        // Update step indicators
        document.querySelectorAll('.step').forEach(s => {
            const num = parseInt(s.getAttribute('data-step'));
            s.classList.remove('active', 'done');
            if (num < step) s.classList.add('done');
            else if (num === step) s.classList.add('active');
        });

        // Update step lines
        document.querySelectorAll('.step-line').forEach((line, idx) => {
            line.classList.toggle('done', idx < step - 1);
        });

        // Scroll modal to top
        const box = document.querySelector('.modal-box');
        if (box) box.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openModal() {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        // Reset to step 1
        goToStep(1);
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        successScreen.classList.remove('show');
        document.querySelector('.modal-steps').style.display = 'flex';
        if (msg) msg.className = 'form-msg';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// ============================
// WHATSAPP FLOAT
// ============================
function initWhatsApp() {
    const btn = document.getElementById('waFloat');
    if (!btn) return;
    setTimeout(() => btn.classList.add('show'), 2500);
}

// ============================
// HELPERS
// ============================
function toggleBtn(btn, loading) {
    if (!btn) return;
    const text = btn.querySelector('.btn-text');
    const load = btn.querySelector('.btn-loading');
    if (text) text.style.display = loading ? 'none' : 'inline-flex';
    if (load) load.style.display = loading ? 'inline-flex' : 'none';
    btn.disabled = loading;
}

function showMsg(el, type, text) {
    if (!el) return;
    el.className = `form-msg ${type}`;
    el.textContent = text;
    setTimeout(() => { el.className = 'form-msg'; }, 6000);
}




// ============================
// SIDE NAV
// ============================
function initSideNav() {
    const dots = document.querySelectorAll('.side-dot');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!dots.length || !sections.length) return;

    function setActiveDot() {
        const scrollMid = window.scrollY + window.innerHeight * 0.35;
        let current = sections[0].id;

        for (const section of sections) {
            if (scrollMid >= section.offsetTop) current = section.id;
        }

        dots.forEach(dot => {
            dot.classList.toggle('active', dot.getAttribute('href') === `#${current}`);
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(dot.getAttribute('href'));
            if (!target) return;
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            setActiveDot();
            ticking = false;
        });
    }, { passive: true });

    window.addEventListener('resize', setActiveDot, { passive: true });
    setActiveDot();
}

// ============================
// TOASTS
// ============================
function showToast(type, title, message = '', duration = 4000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-times-circle',
        info: 'fas fa-info-circle',
        whatsapp: 'fab fa-whatsapp'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="${icons[type] || icons.info}"></i></div>
        <div class="toast-text">
            <div class="toast-title">${title}</div>
            ${message ? `<div class="toast-msg">${message}</div>` : ''}
        </div>
        <button class="toast-close" type="button" aria-label="Close notification"><i class="fas fa-times"></i></button>
        <div class="toast-progress" style="animation-duration:${duration}ms"></div>
    `;

    container.appendChild(toast);

    const remove = () => removeToast(toast);
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) closeBtn.addEventListener('click', remove, { once: true });

    window.setTimeout(remove, duration);
    return toast;
}

function removeToast(toast) {
    if (!toast || toast.classList.contains('removing')) return;
    toast.classList.add('removing');
    window.setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 280);
}

// ============================
// TESTIMONIALS
// ============================
function initTestimonials() {
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('testDots');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    if (!track || !dotsContainer || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    if (!cards.length) return;

    let current = 0;
    const getPerView = () => window.innerWidth > 768 ? 3 : 1;

    function buildDots() {
        dotsContainer.innerHTML = '';
        const total = Math.ceil(cards.length / getPerView());
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'test-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goTo(index) {
        const perView = getPerView();
        const total = Math.ceil(cards.length / perView);
        current = Math.max(0, Math.min(index, total - 1));
        const cardWidth = cards[0].getBoundingClientRect().width + 20;
        track.style.transform = `translateX(-${current * cardWidth * perView}px)`;
        dotsContainer.querySelectorAll('.test-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => {
        const total = Math.ceil(cards.length / getPerView());
        goTo(current + 1 >= total ? 0 : current + 1);
    });

    window.addEventListener('resize', () => {
        buildDots();
        goTo(0);
    }, { passive: true });

    buildDots();
    goTo(0);
}

// ============================
// RADAR CHART
// ============================
function initRadarChart() {
    const canvas = document.getElementById('skillsRadar');
    if (!canvas || typeof Chart === 'undefined') return;

    new Chart(canvas, {
        type: 'radar',
        data: {
            labels: ['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'React Native', 'NestJS'],
            datasets: [{
                label: 'Skill Level',
                data: [90, 85, 85, 82, 80, 80],
                backgroundColor: 'rgba(124, 58, 237, 0.15)',
                borderColor: '#7c3aed',
                borderWidth: 2,
                pointBackgroundColor: '#f59e0b',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#7c3aed',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: { display: false },
                    grid: { color: 'rgba(255,255,255,0.07)' },
                    angleLines: { color: 'rgba(255,255,255,0.07)' },
                    pointLabels: {
                        color: '#94a3b8',
                        font: { size: 12, family: 'Poppins' }
                    }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}
