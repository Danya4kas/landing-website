// Main JavaScript functionality for NestHouse landing page

class NestHouseApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupParticles();
        this.setupModal();
        this.setupForm();
        this.animateStats();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle?.addEventListener('click', () => this.toggleTheme());

        // Navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        navToggle?.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile menu
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });

        // Hero buttons
        const startQuestBtn = document.getElementById('start-quest-btn');
        const watchDemoBtn = document.getElementById('watch-demo-btn');
        
        startQuestBtn?.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });

        watchDemoBtn?.addEventListener('click', () => {
            this.showVRDemo();
        });

        // Download brochure
        const downloadBtn = document.getElementById('download-brochure');
        downloadBtn?.addEventListener('click', () => this.downloadBrochure());

        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
    }

    setupTheme() {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateThemeIcon(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Update active nav link based on scroll position
        const updateActiveNavLink = () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    activeLink?.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveNavLink);
    }

    setupScrollEffects() {
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        // Scroll reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe elements for scroll reveal
        const revealElements = document.querySelectorAll('.about-card, .feature-card, .listing-card, .testimonial-card');
        revealElements.forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
    }

    setupAnimations() {
        // Animate elements on page load
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            heroContent?.classList.add('animate-fade-in-up');
        }, 500);

        // Stagger animation for hero features
        const heroFeatures = document.querySelectorAll('.hero-feature');
        heroFeatures.forEach((feature, index) => {
            setTimeout(() => {
                feature.classList.add('animate-fade-in-up');
            }, 1000 + (index * 200));
        });
    }

    setupParticles() {
        const particlesContainer = document.getElementById('particles-container');
        if (!particlesContainer) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const colors = ['', 'accent', 'secondary'];
            const colorClass = colors[Math.floor(Math.random() * colors.length)];
            if (colorClass) particle.classList.add(colorClass);
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 5000);
        };

        // Create particles periodically
        setInterval(createParticle, 2000);
    }

    setupModal() {
        const modal = document.getElementById('vr-modal');
        const closeBtn = modal?.querySelector('.modal-close');
        
        closeBtn?.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }

    setupForm() {
        const form = document.getElementById('signup-form');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        const scrollTop = window.pageYOffset;
        
        // Add scrolled class to navbar
        if (scrollTop > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Parallax effect for hero
        const hero = document.querySelector('.hero-content');
        if (hero && scrollTop < window.innerHeight) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
        }
    }

    handleResize() {
        // Handle responsive adjustments
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (window.innerWidth > 768) {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
        }
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateNumber = (element) => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target > 1000) {
                    element.textContent = (current / 1000).toFixed(0) + 'K+';
                } else {
                    element.textContent = Math.floor(current) + (target === 98 ? '%' : '');
                }
            }, 16);
        };

        // Animate stats when they come into view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    animateNumber(statNumber);
                    statsObserver.unobserve(statNumber);
                }
            });
        });

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    showVRDemo() {
        const modal = document.getElementById('vr-modal');
        if (modal) {
            modal.style.display = 'block';
            
            // Add some interactive effects
            const vrImage = modal.querySelector('.vr-image');
            if (vrImage) {
                vrImage.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    vrImage.style.transform = 'scale(1)';
                }, 300);
            }
        }
    }

    downloadBrochure() {
        // Simulate PDF download
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKE5lc3RIb3VzZSBCcm9jaHVyZSkKL0NyZWF0b3IgKE5lc3RIb3VzZSkKL1Byb2R1Y2VyIChOZXN0SG91c2UpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyNDAxMDEwMDAwMDBaKQo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMyAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFs0IDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAzIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0xlbmd0aCA0NAo+PgpzdHJlYW0KQlQKL0YxIDEyIFRmCjcyIDcyMCBUZAooTmVzdEhvdXNlIEJyb2NodXJlKSBUagpFVApzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMTU4IDAwMDAwIG4gCjAwMDAwMDAyMDggMDAwMDAgbiAKMDAwMDAwMDI2MyAwMDAwMCBuIAowMDAwMDAwMzQ4IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAyIDAgUgo+PgpzdGFydHhyZWYKNDQwCiUlRU9G';
        link.download = 'nesthouse-brochure.pdf';
        link.click();
        
        // Show success message
        this.showNotification('Brochure downloaded successfully!', 'success');
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="loading"></div> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Save to localStorage (simulate user preferences)
            localStorage.setItem('userPreferences', JSON.stringify(data));
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            this.showNotification('Welcome to NestHouse! Your quest begins now!', 'success');
            
            // Add confetti effect
            this.createConfetti();
            
        }, 2000);
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `${type}-message`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation-triangle'}"></i>
            ${message}
        `;
        
        // Position notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '2000';
        notification.style.maxWidth = '300px';
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    createConfetti() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '2000';
            confetti.style.pointerEvents = 'none';
            confetti.style.borderRadius = '50%';
            
            const animationDuration = Math.random() * 3 + 2;
            confetti.style.animation = `particleFloat ${animationDuration}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, animationDuration * 1000);
        }
    }

    // Utility methods
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NestHouseApp();
});

// Add some global utility functions
window.NestHouse = {
    // Smooth scroll to element
    scrollTo: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    // Show loading state
    showLoading: (element) => {
        if (element) {
            element.classList.add('loading');
        }
    },
    
    // Hide loading state
    hideLoading: (element) => {
        if (element) {
            element.classList.remove('loading');
        }
    },
    
    // Format number with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Generate random ID
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    }
};