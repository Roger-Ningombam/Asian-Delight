document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // --- Smooth Scrolling for Internal Links ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Interior Image Slider (Only on Homepage) ---
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        let slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        firstClone.id = 'first-clone';
        lastClone.id = 'last-clone';
        sliderWrapper.appendChild(firstClone);
        sliderWrapper.insertBefore(lastClone, slides[0]);
        slides = document.querySelectorAll('.slide');

        let currentSlide = 1;
        const slideWidth = slides[0].clientWidth;
        sliderWrapper.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

        const updateDots = () => {
            const dotIndex = currentSlide - 1;
            dots.forEach(dot => dot.classList.remove('active'));
            if (dotIndex >= 0 && dotIndex < dots.length) {
                dots[dotIndex].classList.add('active');
            }
        };

        const moveToSlide = () => {
            sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
            sliderWrapper.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            updateDots();
        };

        const nextSlide = () => {
            if (currentSlide >= slides.length - 1) return;
            currentSlide++;
            moveToSlide();
        };

        const prevSlide = () => {
            if (currentSlide <= 0) return;
            currentSlide--;
            moveToSlide();
        };

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index + 1;
                moveToSlide();
            });
        });

        sliderWrapper.addEventListener('transitionend', () => {
            if (slides[currentSlide].id === 'first-clone') {
                sliderWrapper.style.transition = 'none';
                currentSlide = 1;
                sliderWrapper.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            }
            if (slides[currentSlide].id === 'last-clone') {
                sliderWrapper.style.transition = 'none';
                currentSlide = slides.length - 2;
                sliderWrapper.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            }
        });

        let startX = 0;
        sliderWrapper.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
        sliderWrapper.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
        });
        

        updateDots();
    }

    // --- Header Scroll Effect (Only on Homepage) ---
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(255, 107, 107, 0.95), rgba(255, 165, 0, 0.95))';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #ff6b6b, #ffa500)';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // --- CTA & Reservation Buttons (Only on Homepage) ---
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton && ctaButton.getAttribute('href') !== 'menu.html') {
         // This logic is now handled by the anchor tag, but kept for legacy
    }
    
    // --- Scroll Animations (Homepage & Menu page) ---
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate elements on the homepage
    const animatedElements = document.querySelectorAll('.menu-item, .interior, .evening');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animate images on the menu page
    const menuImages = document.querySelectorAll('.menu-image-item');
    menuImages.forEach(image => {
        observer.observe(image); // Re-use the same observer for the menu page
    });
    // --- Booking Modal Logic ---
    const bookingModal = document.getElementById('bookingModal');
    const openModalBtn = document.getElementById('openBookingModal');
    const closeModalBtn = document.querySelector('.modal-close');

    if (openModalBtn) {
        // Open the modal when the main reservation button is clicked
        openModalBtn.addEventListener('click', () => {
            bookingModal.style.display = 'flex';
        });

        // Close the modal when the 'x' is clicked
        closeModalBtn.addEventListener('click', () => {
            bookingModal.style.display = 'none';
        });

        // Close the modal if the user clicks outside of the content box
        window.addEventListener('click', (event) => {
            if (event.target == bookingModal) {
                bookingModal.style.display = 'none';
            }
        });
    }

}); // <-- Make sure this code is BEFORE the final closing brace of your script