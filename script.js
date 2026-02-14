document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow Atmosphere
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        }
    });

    // 2. Advanced 3D Tilt with Inner Depth
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Dramatic rotation for containers
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;

            // Subtle parallax for child elements inside cards
            const inner = el.querySelector('.project-inner');
            if (inner) {
                const moveX = ((x - centerX) / centerX) * 10;
                const moveY = ((y - centerY) / centerY) * 10;
                inner.style.transform = `translateZ(50px) translateX(${moveX}px) translateY(${moveY}px)`;
            }
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            const inner = el.querySelector('.project-inner');
            if (inner) {
                inner.style.transform = `translateZ(0px) translateX(0px) translateY(0px)`;
            }
        });
    });

    // 3. Parallax Scroll Engine
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Hero Parallax
        const parallaxShapes = document.querySelectorAll('.shape');
        parallaxShapes.forEach(shape => {
            const speed = shape.getAttribute('data-speed') || 0.5;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Navbar effect
        const navbar = document.getElementById('navbar');
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 5. Intersection Observer 3D Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    const revealTargets = document.querySelectorAll('.section, .exp-item, .project-card, .edu-card');
    revealTargets.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });
});
