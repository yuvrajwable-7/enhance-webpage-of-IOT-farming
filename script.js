/* ========================================
   SMART FARMING WITH IoT - JAVASCRIPT
   ======================================== */

// ============ Wait for DOM to Load ============
document.addEventListener('DOMContentLoaded', function() {
    
    // ============ Initialize All Features ============
    initLoadingScreen();
    initNavigation();
    initCustomCursor();
    initParticles();
    initScrollAnimations();
    initCounters();
    initBackToTop();
    initProgressBar();
    initSmoothScroll();
    initModalSystem();
    initCardAnimations();
    
    console.log('%c🌱 Smart Farming with IoT 🌱', 'color: #7fb539; font-size: 24px; font-weight: bold;');
    console.log('%cCultivating Innovation, Growing Sustainability', 'color: #4a7c2c; font-size: 14px;');
});

// ============ Loading Screen ============
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hide');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// ============ Navigation ============
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ============ Custom Cursor ============
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        const diffX = mouseX - followerX;
        const diffY = mouseY - followerY;
        
        followerX += diffX * 0.1;
        followerY += diffY * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .challenge-card, .solution-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ============ Particles Animation ============
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ============ Scroll Animations ============
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on element
                if (entry.target.classList.contains('challenge-card') || 
                    entry.target.classList.contains('solution-card') ||
                    entry.target.classList.contains('benefit-card') ||
                    entry.target.classList.contains('reference-card')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animateElements = document.querySelectorAll(
        '.challenge-card, .solution-card, .stack-layer, .timeline-item, .benefit-card, .reference-card'
    );
    
    animateElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// ============ Counters Animation ============
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        animateCounter(counter);
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }
}

// ============ Back to Top Button ============
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============ Progress Bar ============
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============ Smooth Scroll ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============ Modal System ============
function initModalSystem() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal) return;
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Show modal function (called from HTML buttons)
function showModal(type) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    const modalContent = {
        precision: {
            title: 'Precision Agriculture',
            icon: 'fa-microscope',
            content: `
                <h2><i class="fas fa-microscope"></i> Precision Agriculture</h2>
                <p>Precision agriculture represents the cutting edge of farming technology, utilizing advanced IoT sensors and data analytics to optimize every aspect of crop production.</p>
                
                <h3>Key Technologies:</h3>
                <ul>
                    <li><strong>Soil Moisture Sensors:</strong> Monitor water content in real-time to optimize irrigation</li>
                    <li><strong>Temperature Probes:</strong> Track soil and air temperature for perfect planting conditions</li>
                    <li><strong>pH Sensors:</strong> Ensure optimal soil acidity for maximum nutrient absorption</li>
                    <li><strong>NPK Sensors:</strong> Measure nitrogen, phosphorus, and potassium levels</li>
                </ul>
                
                <h3>Benefits:</h3>
                <ul>
                    <li>45% increase in resource efficiency</li>
                    <li>30% reduction in water usage</li>
                    <li>25% improvement in crop yields</li>
                    <li>Reduced environmental impact</li>
                </ul>
                
                <div style="background: linear-gradient(135deg, #7fb539 0%, #9fcc3b 100%); padding: 20px; border-radius: 15px; color: white; margin-top: 20px;">
                    <h4>Ready to implement precision agriculture?</h4>
                    <p>Contact our team for a customized solution!</p>
                </div>
            `
        },
        monitoring: {
            title: 'Crop & Livestock Monitoring',
            icon: 'fa-video',
            content: `
                <h2><i class="fas fa-video"></i> Crop & Livestock Monitoring</h2>
                <p>24/7 intelligent surveillance powered by AI and IoT technology ensures the health and safety of your crops and livestock.</p>
                
                <h3>Monitoring Systems:</h3>
                <ul>
                    <li><strong>HD Camera Networks:</strong> High-resolution monitoring across all field sections</li>
                    <li><strong>Thermal Imaging:</strong> Detect temperature anomalies and stress indicators</li>
                    <li><strong>AI Disease Detection:</strong> Machine learning identifies diseases before visible symptoms</li>
                    <li><strong>Motion Sensors:</strong> Track livestock movement and behavior patterns</li>
                </ul>
                
                <h3>Advantages:</h3>
                <ul>
                    <li>95% early disease detection rate</li>
                    <li>Real-time alerts for immediate action</li>
                    <li>Reduced livestock mortality by 40%</li>
                    <li>Comprehensive data logging and analytics</li>
                </ul>
            `
        },
        automation: {
            title: 'Automated Systems',
            icon: 'fa-robot',
            content: `
                <h2><i class="fas fa-robot"></i> Automated Systems</h2>
                <p>Revolutionary automation technology transforms manual farming tasks into efficient, precise operations.</p>
                
                <h3>Automation Solutions:</h3>
                <ul>
                    <li><strong>Smart Irrigation:</strong> Automated watering based on soil moisture and weather data</li>
                    <li><strong>Robotic Harvesters:</strong> AI-powered machines for efficient crop collection</li>
                    <li><strong>Automated Feeding Systems:</strong> Precise livestock nutrition management</li>
                    <li><strong>Climate Control:</strong> Intelligent greenhouse environment management</li>
                </ul>
                
                <h3>Impact:</h3>
                <ul>
                    <li>60% reduction in labor costs</li>
                    <li>24/7 operation capability</li>
                    <li>Consistent quality and precision</li>
                    <li>Increased operational safety</li>
                </ul>
            `
        },
        weather: {
            title: 'Hyperlocal Weather Monitoring',
            icon: 'fa-cloud-showers-heavy',
            content: `
                <h2><i class="fas fa-cloud-showers-heavy"></i> Hyperlocal Weather Monitoring</h2>
                <p>Advanced weather stations provide ultra-precise, farm-specific forecasting for optimal decision-making.</p>
                
                <h3>Weather Technologies:</h3>
                <ul>
                    <li><strong>Micro-Climate Sensors:</strong> Monitor conditions specific to your farm location</li>
                    <li><strong>Rainfall Gauges:</strong> Precise precipitation measurement and prediction</li>
                    <li><strong>Wind Sensors:</strong> Track wind speed and direction for spray applications</li>
                    <li><strong>Solar Radiation Monitors:</strong> Optimize planting and harvest timing</li>
                </ul>
                
                <h3>Features:</h3>
                <ul>
                    <li>85% forecast accuracy at farm level</li>
                    <li>7-day advance predictions</li>
                    <li>Automated weather alerts</li>
                    <li>Integration with irrigation systems</li>
                </ul>
            `
        }
    };
    
    const content = modalContent[type];
    if (content) {
        modalBody.innerHTML = content.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============ Card Animations ============
function initCardAnimations() {
    // 3D Tilt effect for cards
    const cards = document.querySelectorAll('.challenge-card, .solution-card, .benefit-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ============ Parallax Effect ============
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============ Newsletter Form ============
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            this.querySelector('input[type="email"]').value = '';
        }
    });
}

// ============ CTA Button Ripple Effect ============
const ctaButtons = document.querySelectorAll('.btn, .btn-large, .learn-more');

ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.left = x - 50 + 'px';
        ripple.style.top = y - 50 + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============ Timeline Animation ============
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, 100);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// ============ Tech Stack Layer Animation ============
const stackLayers = document.querySelectorAll('.stack-layer');
stackLayers.forEach((layer, index) => {
    layer.style.opacity = '0';
    layer.style.transform = 'translateY(30px)';
    
    const layerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    layer.style.transition = 'all 0.6s ease';
                    layer.style.opacity = '1';
                    layer.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    layerObserver.observe(layer);
});

// ============ Keyboard Shortcuts ============
document.addEventListener('keydown', function(e) {
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
        if (!e.target.matches('input, textarea')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    // Press 'B' to go to bottom
    if (e.key === 'b' || e.key === 'B') {
        if (!e.target.matches('input, textarea')) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }
});

// ============ Performance Monitoring ============
console.log('✅ All interactive features initialized successfully!');
console.log('💡 Tip: Press "H" to scroll to top, "B" to scroll to bottom');

// ============ Dynamic Year in Footer ============
const copyrightText = document.querySelector('.footer-bottom p');
if (copyrightText) {
    const currentYear = new Date().getFullYear();
    copyrightText.innerHTML = copyrightText.innerHTML.replace('2025', currentYear);
}