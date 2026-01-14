document.addEventListener('DOMContentLoaded', function () {
    // --- Navbar Scroll Logic ---
    const navbar = document.querySelector('.custom-navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling for Internal Links ---
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.custom-navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- CTA Cursor Follow Effect ---
    const allCtaButtons = document.querySelectorAll('.btn-cta, .btn-primary-custom');
    allCtaButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;

            btn.style.setProperty('--x', `${x}px`);
        });
    });

    // --- Infinite Sliding Gallery ---
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        const slides = Array.from(sliderWrapper.children);

        // Clone slides for seamless looping
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            sliderWrapper.appendChild(clone);
        });

        let scrollAmount = 0;
        const speed = 1; // Speed of the auto-scroll

        function scrollGallery() {
            scrollAmount += speed;
            const slideWidth = slides[0].offsetWidth;
            const totalWidth = slideWidth * slides.length;

            if (scrollAmount >= totalWidth) {
                scrollAmount = 0;
            }

            sliderWrapper.style.transform = `translateX(-${scrollAmount}px)`;
            requestAnimationFrame(scrollGallery);
        }

        // Start scrolling after a small delay to ensure dimensions are ready
        window.addEventListener('load', () => {
            requestAnimationFrame(scrollGallery);
        });

        // Pause on hover
        sliderWrapper.addEventListener('mouseenter', () => {
            // Speed could be set to 0 here if pause is desired
        });
    }

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.interior-text, .about-header, .about-col-left, .about-col-right, .team-header, .team-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(el);
    });

    // --- Dynamic Scaling for About Section Wings ---
    const aboutWings = document.querySelector('.about-wings-main');
    const aboutSection = document.querySelector('.premium-about');

    window.addEventListener('scroll', function () {
        if (aboutWings && aboutSection) {
            const rect = aboutSection.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            if (rect.top < viewHeight && rect.bottom > 0) {
                let progress = (viewHeight - rect.top) / (viewHeight + rect.height);
                progress = Math.max(0, Math.min(1, progress));
                const scale = 1.5 - (progress * 0.4);
                aboutWings.parentElement.style.transform = `scale(${scale})`;
            }
        }

        // --- Menu Slide & Shrink Animation ---
        const vh = window.innerHeight;
        const menuItems = document.querySelectorAll('.menu-stack-item');
        menuItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const wrapper = item.querySelector('.menu-plate-wrapper');
            if (!wrapper) return;

            if (rect.top > vh * 0.7) {
                // Intro: Slide Up
                let prog = (vh - rect.top) / (vh * 0.3);
                prog = Math.max(0, Math.min(1, prog));
                wrapper.style.transform = `translateY(${50 * (1 - prog)}px) scale(1)`;
                wrapper.style.opacity = prog;
            } else if (rect.top < vh * 0.2) {
                // Outro: Shrink Up & Out
                const exit = -rect.height;
                let prog = (rect.top - exit) / (vh * 0.2 - exit);
                prog = Math.max(0, Math.min(1, prog));
                wrapper.style.transform = `translateY(${-20 * (1 - prog)}px) scale(${0.8 + (prog * 0.2)})`;
                wrapper.style.opacity = prog;
            } else {
                // Middle: Steady
                wrapper.style.transform = 'translateY(0) scale(1)';
                wrapper.style.opacity = '1';
            }
        });
    });

});