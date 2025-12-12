 // Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Button click animation
document.querySelector('.cta-button').addEventListener('click', function() {
    this.style.transform = 'scale(0.95) translateY(-5px)';
    setTimeout(() => {
        this.style.transform = 'scale(1) translateY(-5px)';
    }, 150);
});

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.glow-effect');
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;

    glows.forEach((glow, index) => {
        const speed = (index + 1) * 30;
        glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });

    // Parallax for content wrapper
    const content = document.querySelector('.content-wrapper');
    content.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
});

// Overview Section Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Process Steps Interaction
    const processSteps = document.querySelectorAll('.process-step');
    const processDetails = document.querySelectorAll('.process-detail');
    
    processSteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepId = this.getAttribute('data-step');
            
            // Remove active class from all steps
            processSteps.forEach(s => s.classList.remove('active'));
            // Add active class to clicked step
            this.classList.add('active');
            
            // Hide all details
            processDetails.forEach(detail => {
                detail.classList.remove('active');
            });
            
            // Show corresponding detail
            const targetDetail = document.getElementById(`detail-${stepId}`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });
    
    // Card hover effects with slight delay for smoother animation
    const overviewCards = document.querySelectorAll('.overview-card');
    
    overviewCards.forEach(card => {
        let hoverTimeout;
        
        card.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            this.style.transform = 'translateY(-15px)';
            this.style.borderColor = 'rgba(255, 50, 80, 0.3)';
            this.style.boxShadow = '0 20px 40px rgba(255, 50, 80, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                this.style.transform = 'translateY(0)';
                this.style.borderColor = 'rgba(255, 50, 80, 0.1)';
                this.style.boxShadow = 'none';
            }, 100);
        });
    });
    
    // Animate stats counting for cards on scroll
    function animateStats() {
        const stats = document.querySelectorAll('.stat-value');
        
        stats.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = finalValue / 50; // Adjust speed
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
            }, 30);
        });
    }
    
    // Trigger stats animation when overview section is in view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const overviewSection = document.querySelector('.overview-section');
    if (overviewSection) {
        observer.observe(overviewSection);
    }
    
    // Add parallax effect to overview cards on mouse move
    document.addEventListener('mousemove', (e) => {
        const overviewCards = document.querySelectorAll('.overview-card');
        
        overviewCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const distanceX = mouseX - cardCenterX;
            const distanceY = mouseY - cardCenterY;
            
            // Calculate rotation based on mouse position
            const rotateY = distanceX / 100;
            const rotateX = -distanceY / 100;
            
            // Apply transformation with smoothing
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
    });
    
    // Reset card transformations when mouse leaves window
    document.addEventListener('mouseleave', () => {
        const overviewCards = document.querySelectorAll('.overview-card');
        overviewCards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});