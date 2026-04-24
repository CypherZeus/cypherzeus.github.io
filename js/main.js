// ===========================
// Navigation
// ===========================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll to Top Button
// ===========================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Typing Effect for Hero Section
// ===========================
const typingElement = document.querySelector('.typing-effect');
if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 500);
}

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .cert-card, .timeline-item, .education-item');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===========================
// Language Progress Bars Animation
// ===========================
const languageBars = document.querySelectorAll('.language-progress');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, observerOptions);

languageBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ===========================
// Contact Form Handling - EmailJS
// ===========================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Disable button during sending
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

        // EmailJS template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'briceaymar63115729@gmail.com',
            reply_to: email
        };

        // Send via EmailJS
        emailjs.send('service_a99lug9', 'template_tejucaj', templateParams)
            .then(function(response) {
                formMessage.textContent = '✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, function(error) {
                // Fallback: mailto link
                formMessage.textContent = '⚠️ Erreur d\'envoi. Ouverture de votre client email...';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                
                const mailtoLink = `mailto:briceaymar63115729@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${encodeURIComponent(
                    `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                )}`;
                setTimeout(() => {
                    window.open(mailtoLink);
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
                }, 1500);
            });
    });
}

// ===========================
// Matrix Rain Effect (Enhanced)
// ===========================
function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    if (!matrixContainer) return;
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const numColumns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < numColumns; i++) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = `${i * 20}px`;
        column.style.top = `-${Math.random() * 500}px`;
        column.style.color = 'rgba(0, 240, 255, 0.3)';
        column.style.fontSize = '14px';
        column.style.fontFamily = 'monospace';
        column.style.whiteSpace = 'nowrap';
        column.style.animation = `matrixFall ${5 + Math.random() * 10}s linear infinite`;
        column.style.animationDelay = `${Math.random() * 5}s`;
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
    }
}

// Add matrix fall animation
const style = document.createElement('style');
style.textContent = `
    @keyframes matrixFall {
        0% {
            transform: translateY(0);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize matrix rain on load
window.addEventListener('load', createMatrixRain);

// ===========================
// Stats Counter Animation
// ===========================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ===========================
// Cursor Effect (Optional - Premium touch)
// ===========================
function createCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: none;
    `;
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = (e.clientX - 2.5) + 'px';
        cursorDot.style.top = (e.clientY - 2.5) + 'px';
    });
    
    // Scale cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, .nav-link, .project-card, .cert-card');
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize cursor effect on desktop only
if (window.innerWidth > 768) {
    createCursorEffect();
}

// ===========================
// Parallax Effect on Scroll
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===========================
// Dynamic Year in Footer
// ===========================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// ===========================
// Prevent Default on Empty Links
// ===========================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===========================
// Loading Screen (Optional)
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Console Message
// ===========================
console.log('%c👨‍💻 Développé par Brice Aymar YAMEOGO', 'color: #00f0ff; font-size: 16px; font-weight: bold;');
console.log('%c🔒 Expert en Cybersécurité | Systèmes & Réseaux', 'color: #7b2ff7; font-size: 14px;');
console.log('%c📧 briceaymar63115729@gmail.com', 'color: #00ff87; font-size: 12px;');