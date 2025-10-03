/* ===================================
   Smart Farming Website - JavaScript
   =================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== NAVIGATION FUNCTIONALITY ==========
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Change navbar style on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    
    // ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    // ========== SCROLL ANIMATIONS ==========
    
    // Add scroll animation class to all major sections
    const animateElements = document.querySelectorAll('.challenge-card, .solution-card, .stack-layer, .timeline-item, .benefit-item, .references-list li');
    
    animateElements.forEach(element => {
        element.classList.add('scroll-animate');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after animation triggers once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(element => {
        observer.observe(element);
    });

    
    // ========== BACK TO TOP BUTTON ==========
    
    const backToTopButton = document.getElementById('backToTop');

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    
    // ========== CARD HOVER EFFECTS ==========
    
    // Add 3D tilt effect to challenge cards
    const cards = document.querySelectorAll('.challenge-card, .solution-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    
    // ========== COUNTER ANIMATION FOR BENEFITS ==========
    
    // Add data attributes for counting (you can customize these values)
    const benefitItems = document.querySelectorAll('.benefit-item');
    let countersActivated = false;

    function animateCounters() {
        if (countersActivated) return;
        
        benefitItems.forEach((item, index) => {
            const icon = item.querySelector('i');
            let count = 0;
            const target = (index + 1) * 25; // Example: 25%, 50%, 75%
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const counter = setInterval(() => {
                count += increment;
                if (count >= target) {
                    count = target;
                    clearInterval(counter);
                }
                // You can add counter display here if needed
            }, 16);
        });
        
        countersActivated = true;
    }

    // Trigger counter animation when conclusion section is visible
    const conclusionSection = document.querySelector('.conclusion');
    if (conclusionSection) {
        const conclusionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });
        
        conclusionObserver.observe(conclusionSection);
    }

    
    // ========== TIMELINE ANIMATION ==========
    
    // Add progressive reveal animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    
    // ========== CTA BUTTON INTERACTIONS ==========
    
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.left = e.offsetX - 50 + 'px';
            ripple.style.top = e.offsetY - 50 + 'px';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Optional: Add alert or action
            console.log('CTA Button Clicked - Ready to transform farming!');
        });
    });

    
    // ========== DYNAMIC YEAR IN FOOTER ==========
    
    const copyrightElement = document.querySelector('.footer-copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = `&copy; ${currentYear} Smart Farming Initiative. All rights reserved.`;
    }

    
    // ========== ACTIVE NAVIGATION LINK HIGHLIGHT ==========
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    
    // ========== PARALLAX EFFECT FOR HERO SECTION ==========
    
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    
    // ========== LAZY LOADING FOR IMAGES ==========
    
    // If you add images later, this will handle lazy loading
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    
    // ========== SCROLL PROGRESS INDICATOR ==========
    
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.background = 'linear-gradient(90deg, #7fb539, #9fcc3b)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    
    // ========== CONSOLE MESSAGE ==========
    
    console.log('%c🌱 Smart Farming with IoT 🌱', 'color: #7fb539; font-size: 20px; font-weight: bold;');
    console.log('%cCultivating Innovation, Growing Sustainability', 'color: #4a7c2c; font-size: 14px;');
    console.log('%cWebsite loaded successfully!', 'color: #2d5016; font-size: 12px;');

    
    // ========== KEYBOARD NAVIGATION ==========
    
    // Add keyboard shortcuts for navigation
    document.addEventListener('keydown', function(e) {
        // Press 'T' to go to top
        if (e.key === 't' || e.key === 'T') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Press 'B' to go to bottom
        if (e.key === 'b' || e.key === 'B') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });

    
    // ========== PERFORMANCE OPTIMIZATION ==========
    
    // Debounce function for scroll events
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Apply debounce to scroll-heavy functions
    window.addEventListener('scroll', debounce(function() {
        // Optimized scroll handling
    }, 15));

    
    // ========== ACCESSIBILITY ENHANCEMENTS ==========
    
    // Add focus visible for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    
    console.log('All interactive features initialized successfully! 🚀');
});


// ========== CSS ANIMATION KEYFRAMES (Added via JavaScript) ==========

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
    
    .keyboard-nav *:focus {
        outline: 3px solid #7fb539 !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);