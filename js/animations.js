// Advanced animations and interactive effects for NestHouse

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.setupTypewriterEffect();
        this.setupMorphingShapes();
        this.setupFloatingElements();
    }

    setupScrollAnimations() {
        // Advanced scroll-triggered animations using Intersection Observer
        const observerOptions = {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '-50px 0px -50px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeInUp';
                const delay = element.dataset.delay || 0;
                
                if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
                    setTimeout(() => {
                        this.triggerAnimation(element, animationType);
                    }, delay);
                }
            });
        }, observerOptions);

        // Observe elements with animation data attributes
        const animatedElements = document.querySelectorAll('[data-animation]');
        animatedElements.forEach(el => animationObserver.observe(el));

        // Auto-detect elements for animation
        const autoAnimateElements = document.querySelectorAll(
            '.about-card, .feature-card, .listing-card, .testimonial-card, .stat-item'
        );
        autoAnimateElements.forEach((el, index) => {
            el.dataset.animation = 'fadeInUp';
            el.dataset.delay = index * 100;
            animationObserver.observe(el);
        });
    }

    triggerAnimation(element, animationType) {
        element.classList.add(`animate-${animationType}`);
        element.style.opacity = '1';
        element.style.transform = 'none';
    }

    setupHoverEffects() {
        // Advanced hover effects for cards
        const cards = document.querySelectorAll('.about-card, .feature-card, .listing-card, .testimonial-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
                this.addGlowEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeGlowEffect(card);
            });

            card.addEventListener('mousemove', (e) => {
                this.createMouseTrail(e);
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.animateButtonIcon(btn);
            });
        });
    }

    createRippleEffect(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    addGlowEffect(element) {
        element.style.boxShadow = '0 0 30px rgba(46, 139, 87, 0.3)';
        element.style.transform = 'translateY(-5px) scale(1.02)';
    }

    removeGlowEffect(element) {
        element.style.boxShadow = '';
        element.style.transform = '';
    }

    createMouseTrail(event) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${event.clientX - 3}px;
            top: ${event.clientY - 3}px;
            animation: trailFade 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
    }

    animateButtonIcon(button) {
        const icon = button.querySelector('i');
        if (icon) {
            icon.style.animation = 'wiggle 0.5s ease-in-out';
            setTimeout(() => {
                icon.style.animation = '';
            }, 500);
        }
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        const updateParallax = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        // Throttled scroll handler for better performance
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.counter);
            const duration = parseInt(element.dataset.duration) || 2000;
            const suffix = element.dataset.suffix || '';
            const prefix = element.dataset.prefix || '';
            
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    start = target;
                    clearInterval(timer);
                }
                
                element.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
            }, 16);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        const typeWriter = (element, text, speed = 100) => {
            let i = 0;
            element.textContent = '';
            
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    // Add blinking cursor
                    element.innerHTML += '<span class="cursor">|</span>';
                }
            }, speed);
        };

        const typewriterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const text = element.dataset.typewriter;
                    const speed = parseInt(element.dataset.speed) || 100;
                    
                    setTimeout(() => {
                        typeWriter(element, text, speed);
                    }, 500);
                    
                    typewriterObserver.unobserve(element);
                }
            });
        });

        typewriterElements.forEach(el => typewriterObserver.observe(el));
    }

    setupMorphingShapes() {
        // Create animated background shapes
        const createMorphingShape = (container) => {
            const shape = document.createElement('div');
            shape.className = 'morphing-shape';
            shape.style.cssText = `
                position: absolute;
                width: 100px;
                height: 100px;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                border-radius: 50%;
                opacity: 0.1;
                animation: morphFloat 10s ease-in-out infinite;
                z-index: -1;
            `;
            
            // Random position
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            
            // Random animation delay
            shape.style.animationDelay = Math.random() * 5 + 's';
            
            container.appendChild(shape);
            
            return shape;
        };

        // Add morphing shapes to hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            for (let i = 0; i < 5; i++) {
                createMorphingShape(hero);
            }
        }
    }

    setupFloatingElements() {
        // Create floating icons
        const floatingIcons = ['🏠', '🔑', '💡', '🌱', '⭐'];
        const hero = document.querySelector('.hero');
        
        if (hero) {
            floatingIcons.forEach((icon, index) => {
                const floatingElement = document.createElement('div');
                floatingElement.className = 'floating-icon';
                floatingElement.textContent = icon;
                floatingElement.style.cssText = `
                    position: absolute;
                    font-size: 2rem;
                    opacity: 0.3;
                    animation: float 6s ease-in-out infinite;
                    animation-delay: ${index * 1.2}s;
                    z-index: 1;
                    pointer-events: none;
                `;
                
                // Random position
                floatingElement.style.left = Math.random() * 80 + 10 + '%';
                floatingElement.style.top = Math.random() * 80 + 10 + '%';
                
                hero.appendChild(floatingElement);
            });
        }
    }

    // Utility methods for advanced animations
    createParticleExplosion(x, y, color = 'var(--primary-color)') {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 9999;
            `;
            
            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = Math.random() * 100 + 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
            
            document.body.appendChild(particle);
        }
    }

    createWaveEffect(element) {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: waveExpand 1s ease-out forwards;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(wave);
        
        setTimeout(() => wave.remove(), 1000);
    }

    // Performance optimization
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

// Add custom CSS animations dynamically
const addCustomAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes trailFade {
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
        
        @keyframes morphFloat {
            0%, 100% {
                transform: translateY(0) rotate(0deg) scale(1);
                border-radius: 50%;
            }
            25% {
                transform: translateY(-20px) rotate(90deg) scale(1.1);
                border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            }
            50% {
                transform: translateY(-10px) rotate(180deg) scale(0.9);
                border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
            }
            75% {
                transform: translateY(-30px) rotate(270deg) scale(1.2);
                border-radius: 40% 60% 60% 40% / 60% 40% 40% 60%;
            }
        }
        
        .cursor {
            animation: blink 1s infinite;
        }
        
        .mouse-trail {
            animation: trailFade 0.5s ease-out forwards;
        }
        
        .floating-icon {
            animation: float 6s ease-in-out infinite;
        }
        
        .morphing-shape {
            animation: morphFloat 10s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addCustomAnimations();
    new AnimationController();
});

// Export for use in other modules
window.AnimationController = AnimationController;