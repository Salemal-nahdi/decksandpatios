// Premium JavaScript with animations, parallax, and interactions

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Script initialized');
    
    // Header scroll effect
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile navigation
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = this.classList.toggle('active');
            mainNav.classList.toggle('active');
            this.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            document.body.classList.toggle('menu-open', isActive);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!mainNav.contains(event.target) && !mobileToggle.contains(event.target)) {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('menu-open');
                }
            }
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('menu-open');
            });
        });
    } else {
        console.error('Mobile menu elements not found!');
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Subtle parallax effect for hero
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (heroContent && scrolled < window.innerHeight) {
            const opacity = Math.max(0.3, 1 - (scrolled / window.innerHeight) * 0.7);
            heroContent.style.opacity = opacity;
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Add stagger effect for multiple items
                const delay = entry.target.dataset.aosDelay || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Gallery scroll indicator
    const galleryScroll = document.getElementById('gallery-scroll');
    const scrollIndicator = document.querySelector('.gallery-scroll-indicator');
    
    if (galleryScroll && scrollIndicator) {
        // Hide indicator when scrolled to the end
        galleryScroll.addEventListener('scroll', () => {
            const isScrolledToEnd = galleryScroll.scrollLeft >= (galleryScroll.scrollWidth - galleryScroll.clientWidth - 10);
            
            if (isScrolledToEnd) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'none';
            }
        });
        
        // Optional: Click indicator to scroll
        scrollIndicator.addEventListener('click', () => {
            galleryScroll.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // Open lightbox
    document.querySelectorAll('.gallery-zoom').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const galleryItem = button.closest('.gallery-item');
            const img = galleryItem.querySelector('img');
            const caption = galleryItem.querySelector('h4').textContent;
            
            lightboxImage.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Escape key to close lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.nav-dot');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        if (!testimonials.length || !dots.length) return;
        
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.style.transform = `translateX(-${index * 100}%)`;
        }
    }
    
    // Initialize first testimonial
    if (testimonials.length > 0) {
        showTestimonial(0);
        
        // Auto-rotate testimonials
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Manual navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                currentTestimonial = index;
                showTestimonial(index);
                
                // Reset auto-rotation timer
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(() => {
                    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                    showTestimonial(currentTestimonial);
                }, 5000);
            });
        });
    }
    
    // Form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Add loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            // Success message
            submitBtn.textContent = '✓ Sent Successfully!';
            submitBtn.style.background = 'var(--gradient)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
    
    // Number counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.textContent);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                    }
                    
                    if (entry.target.textContent.includes('+')) {
                        entry.target.textContent = Math.floor(current) + '+';
                    } else if (entry.target.textContent.includes('%')) {
                        entry.target.textContent = Math.floor(current) + '%';
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 16);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
    
    // Enhance hero scroll indicator
    const heroScrollIndicator = document.querySelector('.scroll-indicator');
    if (heroScrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                heroScrollIndicator.style.opacity = '0';
                heroScrollIndicator.style.pointerEvents = 'none';
            } else {
                heroScrollIndicator.style.opacity = '1';
                heroScrollIndicator.style.pointerEvents = 'auto';
            }
        });
        
        heroScrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Add hover effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Preload images for better performance
    const imagesToPreload = [
        'image000000 4.JPG',
        'image000000 5.JPG',
        'image000001 4.JPG',
        'image000002 2.JPG',
        'image000003.JPG',
        'image000004 2.JPG'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Add page load animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger hero animations
        setTimeout(() => {
            document.querySelectorAll('.hero [data-aos]').forEach(el => {
                el.classList.add('aos-animate');
            });
        }, 100);
    });
    
    // Performance optimization - Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            // Handle scroll-based animations here
        });
    });
});
