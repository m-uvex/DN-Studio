// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileNav();
    initSmoothScrolling();
    initScrollAnimations();
    initFloatingElements();
    initNavbarScroll();
    initLoadingAnimations();
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

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 1;
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5 * speed;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
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

// Loading Animations
function initLoadingAnimations() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after page loads
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    });
}

// Service Cards Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
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
        });
        
        item.addEventListener('mouseleave', function() {
            const dock = this.querySelector('.portfolio-dock');
            if (dock) {
                dock.style.transform = 'translateY(100%)';
            }
        });
    });
});

// 3D Tilt Effect for Cards
document.addEventListener('DOMContentLoaded', function() {
    const tiltCards = document.querySelectorAll('.tilt-card, .service-card, .tool-item, .contact-item');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
});

// YouTube Video Embed Functionality
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-youtube-id]');
    
    portfolioItems.forEach(item => {
        const playButton = item.querySelector('.play-button');
        const youtubeId = item.getAttribute('data-youtube-id');
        const thumbnail = item.querySelector('.portfolio-thumbnail');
        const videoContainer = item.querySelector('.video-container');
        const iframe = videoContainer.querySelector('iframe');
        
        if (playButton && youtubeId) {
            playButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Hide thumbnail and play button
                thumbnail.style.display = 'none';
                playButton.style.display = 'none';
                
                // Show video container and load YouTube embed
                videoContainer.style.display = 'block';
                const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
                iframe.src = embedUrl;
                
                // Add close button to video
                const closeVideoBtn = document.createElement('div');
                closeVideoBtn.className = 'close-video-btn';
                closeVideoBtn.innerHTML = '<i class="fas fa-times"></i>';
                videoContainer.appendChild(closeVideoBtn);
                
                // Close video functionality
                closeVideoBtn.addEventListener('click', function() {
                    // Hide video container
                    videoContainer.style.display = 'none';
                    iframe.src = '';
                    
                    // Show thumbnail and play button again
                    thumbnail.style.display = 'block';
                    playButton.style.display = 'flex';
                    
                    // Remove close button
                    videoContainer.removeChild(closeVideoBtn);
                });
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

// Console welcome message
console.log(`
🎥 DN Studio - AI-Powered Media & Content Creation
Built with ❤️ by the DN Studio team

Smart content. Real results.
`); 