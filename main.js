// Main JavaScript for portfolio website

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize 3D effects
    init3DEffects();
    
    // Initialize dark mode toggle
    initDarkMode();
    
    // Initialize form validation
    initContactForm();
    
    // Initialize scroll effects
    initScrollEffects();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Animation functionality
function initAnimations() {
    // Add animation class to elements when they come into view
    const animateElements = document.querySelectorAll('.section-title, .hero-content, .about-text, .skill-item, .project-card, .timeline-item, .contact-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Add staggered animation for grid items
                if (entry.target.classList.contains('skill-item') || entry.target.classList.contains('project-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                }
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
}

// 3D effects functionality
function init3DEffects() {
    // Add 3D tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = (mouseY / (cardRect.height / 2)) * -8;
            const rotateY = (mouseX / (cardRect.width / 2)) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            card.style.zIndex = '10';
            
            // Add shine effect
            const shine = card.querySelector('.shine') || document.createElement('div');
            if (!card.querySelector('.shine')) {
                shine.classList.add('shine');
                card.appendChild(shine);
            }
            
            const shineX = (e.clientX - cardRect.left) / cardRect.width * 100;
            const shineY = (e.clientY - cardRect.top) / cardRect.height * 100;
            
            shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.zIndex = '1';
            
            const shine = card.querySelector('.shine');
            if (shine) {
                shine.remove();
            }
        });
    });
    
    // Add floating animation to profile image
    const profileImage = document.querySelector('.profile-image-placeholder');
    if (profileImage) {
        profileImage.classList.add('floating');
    }
    
    // Add 3D depth to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'translateZ(20px)';
        });
        
        item.addEventListener('mouseout', () => {
            item.style.transform = 'translateZ(0)';
        });
    });
}

// Dark mode functionality
function initDarkMode() {
    // Create dark mode toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('div');
        themeToggle.classList.add('theme-toggle');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(themeToggle);
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Toggle dark mode
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Contact form validation
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (valid) {
                // Show success message (in a real app, you'd send the form data to a server)
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = 'Message sent successfully!';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }
}

// Scroll effects
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Staggered Animation for Lists
    document.addEventListener('DOMContentLoaded', () => {
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Add staggered animation to child elements
                    if (entry.target.classList.contains('skill-grid') || 
                        entry.target.classList.contains('projects-grid') ||
                        entry.target.classList.contains('timeline')) {
                        
                        const children = entry.target.children;
                        Array.from(children).forEach((child, index) => {
                            child.classList.add('staggered-item');
                            setTimeout(() => {
                                child.classList.add('animate');
                            }, 100 * index);
                        });
                    }
                }
            });
        }, { threshold: 0.1 });
        
        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
        
        // Observe grids
        document.querySelectorAll('.skill-grid, .projects-grid, .timeline').forEach(grid => {
            observer.observe(grid);
        });
    });
    
    // Parallax effect
    window.addEventListener('scroll', () => {
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
    
    // Progress bar for skills (optional)
    const addSkillBars = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            // Create a progress bar element
            const progressBar = document.createElement('div');
            progressBar.classList.add('skill-progress');
            
            // Random progress value between 75-95% for demonstration
            const progressValue = Math.floor(Math.random() * 20) + 75;
            
            const progressInner = document.createElement('div');
            progressInner.classList.add('skill-progress-inner');
            progressInner.style.width = `${progressValue}%`;
            
            progressBar.appendChild(progressInner);
            item.appendChild(progressBar);
        });
    };
    
    // Uncomment to add skill progress bars
    // addSkillBars();
    
    // Add scroll-to-top button
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.classList.add('scroll-top');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add loading animation
window.addEventListener('load', function() {
    // Create loader if it doesn't exist
    if (!document.querySelector('.loader')) {
        const loader = document.createElement('div');
        loader.classList.add('loader');
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Loading...</div>
            </div>
        `;
        document.body.prepend(loader);
        
        // Hide loader after a short delay
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    }
});

// Add particle background to hero section (optional)
function addParticleBackground() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-js');
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.prepend(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
        
        // Particle properties
        const particlesArray = [];
        const numberOfParticles = 100;
        
        // Create particles
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 5 + 1,
                speedX: Math.random() * 3 - 1.5,
                speedY: Math.random() * 3 - 1.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
        
        // Animation function
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                const particle = particlesArray[i];
                
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX = -particle.speedX;
                }
                
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY = -particle.speedY;
                }
            }
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        });
    }
}

// Uncomment to add particle background
// addParticleBackground();