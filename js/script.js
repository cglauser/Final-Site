/* ============================================
   MINIMALIST WEBSITE - JAVASCRIPT FUNCTIONS
   ============================================ */

// ============================================
// IMAGE SLIDER FUNCTIONS
// ============================================

let currentSlideIndex = 1;
let autoSlideTimer = null;

/**
 * Function 1: Move to next or previous slide
 * @param {number} n - Direction: 1 for next, -1 for previous
 */
function moveSlide(n) {
    clearAutoSlide();
    showSlide((currentSlideIndex += n));
    startAutoSlide();
}

/**
 * Function 2: Move to specific slide
 * @param {number} n - Slide number
 */
function currentSlide(n) {
    clearAutoSlide();
    showSlide((currentSlideIndex = n));
    startAutoSlide();
}

/**
 * Function 3: Display the slide at the specified index
 * @param {number} n - Slide index
 */
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Wrap around if n is out of range
    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }

    // Hide all slides
    slides.forEach(slide => {
        slide.style.transform = 'translateX(0)';
    });

    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show current slide with smooth animation
    if (slides.length > 0) {
        const offset = -(currentSlideIndex - 1) * 100;
        const sliderElement = document.querySelector('.slider');
        if (sliderElement) {
            sliderElement.style.transform = `translateX(${offset}%)`;
        }
    }

    // Highlight current dot
    if (dots.length > 0 && currentSlideIndex <= dots.length) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
}

/**
 * Function 4: Start automatic slide carousel
 */
function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        currentSlideIndex++;
        const slides = document.querySelectorAll('.slide');
        if (currentSlideIndex > slides.length) {
            currentSlideIndex = 1;
        }
        showSlide(currentSlideIndex);
    }, 5000); // Change slide every 5 seconds
}

/**
 * Function 5: Stop automatic slide carousel
 */
function clearAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
    }
}

/**
 * Function 6: Update active navigation link
 * Updates the active nav link based on current page
 */
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Function 7: Handle contact form submission
 */
function handleFormSubmit(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    const form = document.getElementById('contactForm');
    if (!form) return;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Basic validation
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        alert('Please fill in all required fields.');
        return;
    }

    // Success message
    alert(`Thank you, ${name.value}! Your message has been received. We'll be in touch soon.`);

    // Reset form
    form.reset();
}

/**
 * Function 8: Add smooth scroll behavior
 */
function smoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

/**
 * Function 9: Add hover animation to portfolio items
 */
function addPortfolioHoverEffects() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            this.style.transform = 'scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.boxShadow = 'none';
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Function 10: Initialize all interactive elements
 */
function initializePageElements() {
    updateActiveNav();
    addPortfolioHoverEffects();
    smoothScroll();

    // Initialize slider on portfolio page
    const slider = document.querySelector('.slider');
    if (slider) {
        showSlide(currentSlideIndex);
        startAutoSlide();
    }

    // Attach form submission handler
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Add click animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// ============================================
// DOM CONTENT LOADED - INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    initializePageElements();
});

// ============================================
// PAGE VISIBILITY - PAUSE/RESUME SLIDER
// ============================================

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        clearAutoSlide();
    } else {
        const slider = document.querySelector('.slider');
        if (slider) {
            startAutoSlide();
        }
    }
});
