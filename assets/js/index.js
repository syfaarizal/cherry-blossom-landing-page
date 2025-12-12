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

// About Section Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats counting for about section
    function animateAboutStats() {
        const stats = document.querySelectorAll('.about-stat .stat-number');
        
        stats.forEach(stat => {
            const finalValue = parseInt(stat.getAttribute('data-count'));
            let currentValue = 0;
            const increment = finalValue / 30; // Adjust speed
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentValue);
            }, 40);
        });
    }
    
    // Horizontal Image Gallery
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryDots = document.querySelectorAll('.gallery-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryTrack) {
        let currentIndex = 0;
        let isDragging = false;
        let startPosition = 0;
        let currentTranslate = 0;
        let previousTranslate = 0;
        let animationID = 0;
        
        // Initialize gallery
        function initGallery() {
            updateGalleryPosition();
            updateDots();
            
            // Add event listeners for drag
            galleryTrack.addEventListener('mousedown', dragStart);
            galleryTrack.addEventListener('touchstart', dragStart);
            galleryTrack.addEventListener('mouseup', dragEnd);
            galleryTrack.addEventListener('touchend', dragEnd);
            galleryTrack.addEventListener('mousemove', drag);
            galleryTrack.addEventListener('touchmove', drag);
            
            // Prevent image drag default behavior
            galleryTrack.addEventListener('dragstart', (e) => e.preventDefault());
            
            // Navigation buttons
            prevBtn.addEventListener('click', goToPrev);
            nextBtn.addEventListener('click', goToNext);
            
            // Dot navigation
            galleryDots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    goToIndex(index);
                });
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') goToPrev();
                if (e.key === 'ArrowRight') goToNext();
            });
        }
        
        // Drag functions
        function dragStart(e) {
            isDragging = true;
            startPosition = getPositionX(e);
            animationID = requestAnimationFrame(animation);
            galleryTrack.classList.add('grabbing');
        }
        
        function drag(e) {
            if (isDragging) {
                const currentPosition = getPositionX(e);
                currentTranslate = previousTranslate + currentPosition - startPosition;
            }
        }
        
        function dragEnd() {
            cancelAnimationFrame(animationID);
            isDragging = false;
            
            const movedBy = currentTranslate - previousTranslate;
            
            // If moved enough, change slide
            if (movedBy < -100 && currentIndex < galleryItems.length - 1) {
                currentIndex += 1;
            }
            
            if (movedBy > 100 && currentIndex > 0) {
                currentIndex -= 1;
            }
            
            goToIndex(currentIndex);
            galleryTrack.classList.remove('grabbing');
        }
        
        function getPositionX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        }
        
        function animation() {
            setGalleryPosition();
            if (isDragging) requestAnimationFrame(animation);
        }
        
        function setGalleryPosition() {
            galleryTrack.style.transform = `translateX(${currentTranslate}px)`;
        }
        
        function updateGalleryPosition() {
            const itemWidth = galleryItems[0].offsetWidth + 30; // width + gap
            currentTranslate = -currentIndex * itemWidth;
            previousTranslate = currentTranslate;
            setGalleryPosition();
        }
        
        function goToIndex(index) {
            currentIndex = index;
            updateGalleryPosition();
            updateDots();
        }
        
        function goToPrev() {
            if (currentIndex > 0) {
                currentIndex--;
                updateGalleryPosition();
                updateDots();
            }
        }
        
        function goToNext() {
            if (currentIndex < galleryItems.length - 1) {
                currentIndex++;
                updateGalleryPosition();
                updateDots();
            }
        }
        
        function updateDots() {
            galleryDots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Auto-scroll gallery (optional)
        let autoScrollInterval;
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (!isDragging) {
                    if (currentIndex < galleryItems.length - 1) {
                        goToNext();
                    } else {
                        goToIndex(0);
                    }
                }
            }, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        
        // Start auto-scroll on mouse leave, stop on hover
        galleryTrack.addEventListener('mouseenter', stopAutoScroll);
        galleryTrack.addEventListener('mouseleave', startAutoScroll);
        
        // Initialize
        initGallery();
        startAutoScroll();
    }
    
    // Philosophy cards hover effect with tilt
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    
    philosophyCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            this.style.boxShadow = '0 30px 50px rgba(255, 50, 80, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            this.style.boxShadow = '0 20px 40px rgba(255, 50, 80, 0.1)';
        });
    });
    
    // CTA button animation
    const aboutCta = document.querySelector('.about-cta');
    if (aboutCta) {
        aboutCta.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // Simulate navigation to contact section
                alert('Redirecting to contact form...');
            }, 150);
        });
    }
    
    // Visual card 3D effect
    const visualCard = document.querySelector('.visual-card');
    if (visualCard) {
        visualCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        visualCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
    
    // Trigger about stats animation when section is in view
    const aboutObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAboutStats();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, aboutObserverOptions);
    
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
    
    // Image gallery items hover effect
    const galleryItemsHover = document.querySelectorAll('.gallery-item');
    galleryItemsHover.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
});