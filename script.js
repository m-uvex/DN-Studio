// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileNav();
    initSmoothScrolling();
    initScrollAnimations();
    initFloatingElements();
    initNavbarScroll();
    initLoadingAnimations();
    initThemeToggle();
});

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced floating elements with interactive effects
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = element.getAttribute('data-speed') || 1;
        
        // Add staggered animation delay
        element.style.animationDelay = `${index * 0.5}s`;
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5 * speed;
            element.style.transform = `translateY(${rate}px)`;
        });
        
        // Enhanced hover effects
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(15deg) translateZ(20px)';
            this.style.boxShadow = '0 20px 50px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)';
            this.style.filter = 'brightness(1.2)';
            
            // Add pulse animation
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg) translateZ(0px)';
            this.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
            this.style.filter = 'brightness(1)';
            this.style.animation = 'float 6s ease-in-out infinite';
        });
        
        // Add click effect
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.9) rotate(-5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            }, 150);
        });
    });
}

// Enhanced navbar scroll effect for dark mode
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        // Add/remove background on scroll with theme-specific colors
        if (scrollTop > 50) {
            if (isDark) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (isDark) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Enhanced loading animations for dark mode
function initLoadingAnimations() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after page loads
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero content with theme-specific timing
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const delay = isDark ? 400 : 300; // Slightly longer delay for dark mode
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, delay);
        }
        
        // Animate floating elements with staggered timing
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            }, 500 + (index * 100));
        });
    });
}

// Theme Toggle Functionality - Enhanced
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    // Add initial animation
    themeToggle.style.transform = 'scale(0.8)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 100);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add click animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        // Update theme with smooth transition
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon with rotation animation
        updateThemeIcon(newTheme);
        
        // Add theme change animation to body
        document.body.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.style.transform = 'scale(0.98)';
        setTimeout(() => {
            document.body.style.transform = 'scale(1)';
        }, 200);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    
    // Add rotation animation
    themeIcon.style.transform = 'rotate(180deg)';
    themeIcon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
        themeIcon.style.transform = 'rotate(0deg)';
    }, 150);
}

// Service Cards Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Add glow effect in dark mode
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                this.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px var(--shadow-color)';
        });
    });
});

// Portfolio Items Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const dock = this.querySelector('.portfolio-dock');
            if (dock) {
                dock.style.transform = 'translateY(0)';
            }
            
            // Add glow effect in dark mode
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const dock = this.querySelector('.portfolio-dock');
            if (dock) {
                dock.style.transform = 'translateY(100%)';
            }
            this.style.boxShadow = '0 10px 30px var(--shadow-color)';
        });
    });
});

// Enhanced 3D tilt effect with mouse tracking and glow effects
document.addEventListener('DOMContentLoaded', function() {
    const tiltCards = document.querySelectorAll('.tilt-card, .service-card, .tool-item, .contact-item');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            // Calculate mouse position for glow effect
            const mouseX = ((x / rect.width) * 100);
            const mouseY = ((y / rect.height) * 100);
            
            // Add glow effect in dark mode
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const glowColor = isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(0, 0, 0, 0.05)';
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`;
            this.style.boxShadow = `0 25px 50px ${glowColor}`;
            
            // Update CSS custom properties for mouse tracking
            this.style.setProperty('--mouse-x', `${mouseX}%`);
            this.style.setProperty('--mouse-y', `${mouseY}%`);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            this.style.boxShadow = '0 10px 30px var(--shadow-color)';
        });
    });
    
    // Add floating animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add staggered animation to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
    });
});

// Enhanced Video Card Component with 3D Tilt and Audio Control
document.addEventListener('DOMContentLoaded', function() {
    const videoCards = document.querySelectorAll('.video-card[data-video]');
    
    videoCards.forEach(card => {
        const videoPath = card.getAttribute('data-video');
        const thumbnail = card.querySelector('.video-thumbnail');
        const videoPlayer = card.querySelector('.video-player');
        const video = videoPlayer.querySelector('video');
        const timelineProgress = videoPlayer.querySelector('.timeline-progress');
        let isPlaying = false;
        let rafId = null;
        
        // Remove controls and ensure muted by default
        video.removeAttribute('controls');
        video.muted = true;
        
        function updateTimeline() {
            if (video && timelineProgress) {
                const percent = (video.currentTime / video.duration) * 100;
                timelineProgress.style.width = isNaN(percent) ? '0%' : percent + '%';
            }
            if (!video.paused && !video.ended) {
                rafId = requestAnimationFrame(updateTimeline);
            }
        }
        
        // 3D tilt effect based on mouse movement
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            // Update mouse position for glow effect
            const mouseX = ((x / rect.width) * 100);
            const mouseY = ((y / rect.height) * 100);
            
            this.style.setProperty('--mouse-x', `${mouseX}%`);
            this.style.setProperty('--mouse-y', `${mouseY}%`);
            
            // Apply 3D tilt only when hovering
            if (isPlaying) {
                this.style.transform = `translateY(-20px) scale(1.08) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        if (videoPath && video) {
            // Mouse enter - start video with audio
            card.addEventListener('mouseenter', function() {
                if (!isPlaying) {
                    thumbnail.style.display = 'none';
                    videoPlayer.style.display = 'block';
                    video.currentTime = 0;
                    video.muted = false; // Enable audio on hover
                    video.play().then(() => {
                        isPlaying = true;
                        rafId = requestAnimationFrame(updateTimeline);
                    }).catch(error => {
                        console.log('Video autoplay failed:', error);
                        videoPlayer.style.display = 'block';
                        isPlaying = true;
                        rafId = requestAnimationFrame(updateTimeline);
                    });
                }
            });
            
            // Mouse leave - pause video and show thumbnail
            card.addEventListener('mouseleave', function() {
                if (isPlaying) {
                    video.pause();
                    video.muted = true; // Mute when not hovering
                    videoPlayer.style.display = 'none';
                    thumbnail.style.display = 'block';
                    isPlaying = false;
                    timelineProgress.style.width = '0%';
                    if (rafId) cancelAnimationFrame(rafId);
                    
                    // Reset transform
                    this.style.transform = 'translateY(0px) scale(1) rotateX(0deg) rotateY(0deg)';
                }
            });
            
            // Video ended - show thumbnail
            video.addEventListener('ended', function() {
                videoPlayer.style.display = 'none';
                thumbnail.style.display = 'block';
                isPlaying = false;
                timelineProgress.style.width = '0%';
                if (rafId) cancelAnimationFrame(rafId);
                video.muted = true;
            });
        }
    });
});

// Tool Items Animation
document.addEventListener('DOMContentLoaded', function() {
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeInUp 0.6s ease forwards';
    });
});

// Contact Form Validation (if needed in future)
function validateContactForm(form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    
    if (email && !isValidEmail(email.value)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    if (message && message.value.trim().length < 10) {
        showError('Message must be at least 10 characters long');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4757;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for error notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations can go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy Loading for Images (if needed in future)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are images
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelectorAll('img[data-src]').length > 0) {
        initLazyLoading();
    }
});

// Add theme change listener for dynamic updates
document.addEventListener('DOMContentLoaded', function() {
    // Listen for theme changes and update elements accordingly
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                // Update any theme-specific elements
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                
                // Update scrollbar colors
                if (isDark) {
                    document.body.style.setProperty('--scrollbar-thumb', 'linear-gradient(135deg, #8b5cf6, #a855f7)');
                } else {
                    document.body.style.setProperty('--scrollbar-thumb', 'linear-gradient(135deg, #667eea, #764ba2)');
                }
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
});

// Enhanced loading animations for dark mode
function initLoadingAnimations() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after page loads
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero content with theme-specific timing
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const delay = isDark ? 400 : 300; // Slightly longer delay for dark mode
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, delay);
        }
        
        // Animate floating elements with staggered timing
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            }, 500 + (index * 100));
        });
    });
}

// Console welcome message
console.log(`
🎥 DN Studio - AI-Powered Media & Content Creation
Built with ❤️ by the DN Studio team

Smart content. Real results.
`); 