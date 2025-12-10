/**
 * UI Interactions
 * Handles magnetic buttons and advanced scroll effects
 */

export function initUIInteractions() {
    initMagneticButtons();
    initTextReveals();
    initHeroParallax();
}

/**
 * Magnetic Button Effect
 * Buttons that stick to the mouse cursor slightly
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Magnetic pull strength
            const strength = 0.5;

            btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/**
 * Text Reveal Animations
 * Adds 'visible' class to elements when they enter viewport
 * (Used in conjunction with CSS clip-path/transform animations)
 */
function initTextReveals() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to reveal
    const revealElements = document.querySelectorAll('.reveal-text');
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Hero Parallax Effect
 * Subtle mouse-tracking movement for depth perception
 */
function initHeroParallax() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    // Parallax intensity (lower = more subtle)
    const intensity = 0.015;

    // Track mouse position with smooth interpolation
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        // Calculate mouse position relative to center of screen
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        targetX = (e.clientX - centerX) * intensity;
        targetY = (e.clientY - centerY) * intensity;
    });

    // Smooth animation loop
    function animate() {
        // Lerp towards target (smooth interpolation)
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        // Apply transform (moves opposite to mouse for depth effect)
        heroContent.style.transform = `translate(calc(-50% + ${-currentX}px), calc(-50% + ${-currentY}px))`;

        requestAnimationFrame(animate);
    }

    animate();
}

// Auto-init if document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUIInteractions);
} else {
    initUIInteractions();
}
