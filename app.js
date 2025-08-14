// Portfolio Website JavaScript - Enhanced Version with Fixed Social Links

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeExperienceTabs();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeHeroButtons();
    initializeProfilePicture();
    initializeSocialLinks();
});

// Fix social links functionality
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        // Ensure the links work properly
        link.addEventListener('click', function(e) {
            // Don't prevent default - let the link work normally
            const href = this.getAttribute('href');
            if (href && href.startsWith('http')) {
                // Force open in new tab if not already set
                if (!this.hasAttribute('target')) {
                    this.setAttribute('target', '_blank');
                }
                console.log('Opening social link:', href);
            }
        });

        // Add visual feedback without interfering with functionality
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
}

// Navigation functionality - Enhanced with compact design
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            navbar.style.background = 'rgba(19, 52, 59, 0.98)';
            navbar.style.boxShadow = '0 8px 25px -8px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(19, 52, 59, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Highlight active nav link based on scroll position
    window.addEventListener('scroll', debounce(function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navbarHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 30;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// Profile picture interactions
function initializeProfilePicture() {
    const profilePicture = document.querySelector('.profile-placeholder');
    
    if (profilePicture) {
        // Add click handler for potential future image upload
        profilePicture.addEventListener('click', function() {
            // Create a subtle shake animation to indicate interactivity
            this.style.animation = 'profileShake 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });

        // Add hover enhancement
        profilePicture.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) saturate(1.2)';
        });

        profilePicture.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
        });

        // Add CSS for shake animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes profileShake {
                0%, 100% { transform: translateY(-5px) scale(1.02) rotate(0deg); }
                25% { transform: translateY(-5px) scale(1.02) rotate(-1deg); }
                75% { transform: translateY(-5px) scale(1.02) rotate(1deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Hero buttons functionality - Enhanced
function initializeHeroButtons() {
    const getInTouchBtn = document.querySelector('.hero-cta .btn--primary');
    const resumeBtn = document.querySelector('.hero-cta .btn--outline');
    
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('contact');
        });
    }
    
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Create a mailto link with resume request
            const subject = encodeURIComponent('Resume Request - Gaurav Bharadwaj');
            const body = encodeURIComponent('Hi Gaurav,\n\nI would like to request a copy of your resume.\n\nBest regards');
            window.location.href = `mailto:gauravbharadwaj.bharadwaj@gmail.com?subject=${subject}&body=${body}`;
        });
    }

    // Add interaction to skill badges
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            this.style.transform = 'translateY(-4px) scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 200);
        });
    });

    // Add interaction to contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Experience tabs functionality - Enhanced
function initializeExperienceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length === 0 || tabPanels.length === 0) {
        console.log('Tab elements not found');
        return;
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            
            console.log('Tab clicked:', target);
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.opacity = '0';
                panel.style.transform = 'translateX(20px)';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Find and activate the corresponding panel with animation
            const targetPanel = document.getElementById(target);
            if (targetPanel) {
                setTimeout(() => {
                    targetPanel.classList.add('active');
                    targetPanel.style.opacity = '1';
                    targetPanel.style.transform = 'translateX(0)';
                }, 150);
                console.log('Panel activated:', target);
            } else {
                console.error('Panel not found:', target);
            }
        });
    });

    // Add smooth transitions to panels
    tabPanels.forEach(panel => {
        panel.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    });
}

// Mobile menu functionality - Enhanced
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.classList.toggle('mobile-active');
        this.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Re-enable body scroll
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a nav link
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('mobile-active');
            navToggle.classList.remove('active');
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Re-enable body scroll
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            if (navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                navToggle.classList.remove('active');
                
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                document.body.style.overflow = '';
            }
        }
    });
}

// Smooth scrolling for navigation links - Enhanced
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') {
                scrollToSection('home');
            } else {
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
}

// Helper function for smooth scrolling - Enhanced
function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    
    if (targetElement) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const offset = sectionId === 'home' ? 0 : navbarHeight + 15;
        const targetPosition = targetElement.offsetTop - offset;
        
        // Add a subtle indication that scrolling is happening
        const scrollIndicator = document.createElement('div');
        scrollIndicator.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            width: 4px;
            height: 60px;
            background: var(--color-teal-300);
            border-radius: 2px;
            z-index: 1001;
            opacity: 0.7;
            animation: scrollPulse 1s ease-out;
        `;
        
        document.body.appendChild(scrollIndicator);
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            if (scrollIndicator.parentNode) {
                scrollIndicator.parentNode.removeChild(scrollIndicator);
            }
        }, 1000);
    }
}

// Scroll animations - Enhanced
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for multiple elements
                if (entry.target.classList.contains('project-card') || 
                    entry.target.classList.contains('skill-category') ||
                    entry.target.classList.contains('fact-item')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const delay = siblings.indexOf(entry.target) * 80;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                
                // Special animation for profile picture
                if (entry.target.classList.contains('profile-picture')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'scale(1) rotate(0deg)';
                        entry.target.style.opacity = '1';
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Add fade-in class to elements we want to animate
    const animateElements = document.querySelectorAll(`
        .hero-content,
        .profile-picture,
        .quick-facts,
        .hero-skills,
        .about-text,
        .section-header,
        .experience-content,
        .skills-grid,
        .project-card,
        .skill-category,
        .contact-content,
        .fact-item
    `);

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add initial state for profile picture
    const profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
        profilePicture.style.transform = 'scale(0.8) rotate(-10deg)';
        profilePicture.style.opacity = '0';
        profilePicture.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
}

// Contact form functionality - Enhanced
// Contact form functionality - Netlify integrated
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.createElement('p');
    successMsg.id = 'formSuccess';
    successMsg.style.display = 'none';
    successMsg.style.color = '#00ff88';
    successMsg.style.marginTop = '10px';
    successMsg.style.fontWeight = 'bold';
    contactForm.parentNode.appendChild(successMsg);

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop default browser reload

            // Validate
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Send to Netlify
            fetch('/', {
                method: 'POST',
                body: new URLSearchParams(formData).toString(),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
                .then(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;

                    // Custom success message
                    successMsg.textContent = '✅ I have received your email and will get back to you soon!';
                    successMsg.style.display = 'block';

                    showNotification('Message sent successfully!', 'success');
                })
                .catch((err) => {
                    console.error(err);
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    showNotification('Something went wrong, please try again later.', 'error');
                });
        });
    }
}

// Field validation helper
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    }

    if (!isValid) {
        field.style.borderColor = 'var(--color-error)';
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            color: var(--color-error);
            font-size: var(--font-size-xs);
            margin-top: var(--space-4);
        `;
        errorElement.textContent = errorMessage;
        field.parentNode.appendChild(errorElement);
    } else {
        field.style.borderColor = 'var(--color-success)';
    }

    return isValid;
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? 'var(--color-error)' : 'var(--color-success)'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        max-width: 300px;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.4;
        backdrop-filter: blur(10px);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// Performance optimization: Debounce function
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

// Add interactive enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add enhanced animations and styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes scrollPulse {
            0% { transform: scaleY(0); opacity: 0; }
            50% { transform: scaleY(1); opacity: 0.7; }
            100% { transform: scaleY(0); opacity: 0; }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .contact-icon {
            transition: transform 0.3s ease-out;
        }
        
        /* Ensure social links work properly */
        .social-link {
            pointer-events: auto !important;
            position: relative;
            z-index: 10;
            display: inline-block;
            transition: all 0.3s ease-out;
        }
        
        .social-link:hover {
            transform: translateY(-2px) scale(1.05);
        }
        
        /* Enhanced mobile menu styles */
        @media (max-width: 768px) {
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(19, 52, 59, 0.98);
                backdrop-filter: blur(15px);
                flex-direction: column;
                padding: 20px;
                transform: translateY(-100vh);
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                border-top: 1px solid var(--color-border);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .nav-links.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-link {
                padding: 14px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: block;
                text-align: center;
                transform: translateY(-20px);
                opacity: 0;
                transition: all 0.3s ease-out;
            }
            
            .nav-links.mobile-active .nav-link {
                transform: translateY(0);
                opacity: 1;
            }
            
            .nav-link:nth-child(1) { transition-delay: 0.1s; }
            .nav-link:nth-child(2) { transition-delay: 0.15s; }
            .nav-link:nth-child(3) { transition-delay: 0.2s; }
            .nav-link:nth-child(4) { transition-delay: 0.25s; }
            .nav-link:nth-child(5) { transition-delay: 0.3s; }
            
            .nav-link:last-child {
                border-bottom: none;
            }
        }
        
        /* Enhanced hover states */
        .fact-item {
            transition: all 0.3s ease-out;
        }
        
        .fact-item:hover {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
    
    // Debug: Log tab elements
    console.log('Tab buttons found:', document.querySelectorAll('.tab-btn').length);
    console.log('Tab panels found:', document.querySelectorAll('.tab-panel').length);
    console.log('Social links found:', document.querySelectorAll('.social-link').length);
    
    // Add intersection observer for performance
    if ('IntersectionObserver' in window) {
        console.log('Intersection Observer supported');
    } else {
        console.log('Intersection Observer not supported, using fallback');
    }
});

// Initialize everything when DOM is ready
window.addEventListener('load', function() {
    // Ensure all elements are loaded before initializing
    setTimeout(() => {
        initializeExperienceTabs();
        initializeSocialLinks();
        
        // Add a subtle loading complete indication
        document.body.style.opacity = '1';
        console.log('Portfolio fully loaded and initialized');
        
        // Final check for social links
        const socialLinks = document.querySelectorAll('.social-link');
        console.log('Final social link check - found:', socialLinks.length);
        socialLinks.forEach((link, index) => {
            console.log(`Social link ${index + 1}:`, link.href, link.target);
        });
    }, 100);
});

// Add loading state
document.body.style.opacity = '0.9';
document.body.style.transition = 'opacity 0.3s ease-out';
