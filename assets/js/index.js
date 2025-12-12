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

// Info Section Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Copy contact info functionality
    const copyButtons = document.querySelectorAll('.contact-action[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show success feedback
                const originalText = this.innerHTML;
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Copied!
                `;
                
                // Change button style temporarily
                this.style.background = 'rgba(50, 255, 100, 0.2)';
                this.style.borderColor = 'rgba(50, 255, 100, 0.5)';
                this.style.color = '#32ff64';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    this.style.borderColor = '';
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy text to clipboard');
            });
        });
    });
    
    // Map view button
    const mapButton = document.querySelector('.contact-action[data-action="map"]');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            // Zoom to studio on map
            const studioElement = document.querySelector('.studio');
            if (studioElement) {
                studioElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                
                // Add pulse effect
                studioElement.style.animation = 'none';
                setTimeout(() => {
                    studioElement.style.animation = 'pulse 0.5s 3';
                }, 10);
            }
        });
    }
    
    // Interactive map controls
    const mapVisual = document.querySelector('.map-visual');
    const mapGrid = document.querySelector('.map-grid');
    const zoomInBtn = document.querySelector('.zoom-in');
    const zoomOutBtn = document.querySelector('.zoom-out');
    const resetBtn = document.querySelector('.reset');
    
    let zoomLevel = 1;
    let panX = 0;
    let panY = 0;
    
    function updateMapTransform() {
        mapGrid.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
        mapGrid.style.transformOrigin = 'center center';
    }
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            if (zoomLevel < 2) {
                zoomLevel += 0.2;
                updateMapTransform();
            }
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            if (zoomLevel > 0.5) {
                zoomLevel -= 0.2;
                updateMapTransform();
            }
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            zoomLevel = 1;
            panX = 0;
            panY = 0;
            updateMapTransform();
        });
    }
    
    // Draggable map
    let isMapDragging = false;
    let startMapX = 0;
    let startMapY = 0;
    
    if (mapVisual) {
        mapVisual.addEventListener('mousedown', startMapDrag);
        mapVisual.addEventListener('touchstart', startMapDrag);
        
        function startMapDrag(e) {
            isMapDragging = true;
            const event = e.type === 'touchstart' ? e.touches[0] : e;
            startMapX = event.clientX - panX;
            startMapY = event.clientY - panY;
            
            mapVisual.style.cursor = 'grabbing';
            
            document.addEventListener('mousemove', dragMap);
            document.addEventListener('touchmove', dragMap);
            document.addEventListener('mouseup', stopMapDrag);
            document.addEventListener('touchend', stopMapDrag);
        }
        
        function dragMap(e) {
            if (!isMapDragging) return;
            
            e.preventDefault();
            const event = e.type === 'touchmove' ? e.touches[0] : e;
            panX = event.clientX - startMapX;
            panY = event.clientY - startMapY;
            
            updateMapTransform();
        }
        
        function stopMapDrag() {
            isMapDragging = false;
            mapVisual.style.cursor = 'grab';
            
            document.removeEventListener('mousemove', dragMap);
            document.removeEventListener('touchmove', dragMap);
            document.removeEventListener('mouseup', stopMapDrag);
            document.removeEventListener('touchend', stopMapDrag);
        }
        
        mapVisual.style.cursor = 'grab';
    }
    
    // Operating hours status
    function updateStatus() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const statusIndicator = document.getElementById('statusIndicator');
        const statusText = document.getElementById('statusText');
        
        let isOpen = false;
        
        // Check if it's a weekday (Monday-Friday)
        if (day >= 1 && day <= 5) {
            // Check if within business hours (9 AM - 6 PM)
            if (hour >= 9 && hour < 18) {
                isOpen = true;
            }
        } else if (day === 6) { // Saturday
            // Check if within business hours (10 AM - 4 PM)
            if (hour >= 10 && hour < 16) {
                isOpen = true;
            }
        }
        
        if (isOpen) {
            statusIndicator.style.background = '#32ff64';
            statusIndicator.style.boxShadow = '0 0 10px rgba(50, 255, 100, 0.8)';
            
            // Calculate closing time
            let closingHour, closingMinute;
            if (day >= 1 && day <= 5) {
                closingHour = 18;
                closingMinute = 0;
            } else {
                closingHour = 16;
                closingMinute = 0;
            }
            
            const timeUntilClose = (closingHour - hour) * 60 - minutes;
            const hoursLeft = Math.floor(timeUntilClose / 60);
            const minutesLeft = timeUntilClose % 60;
            
            statusText.textContent = `Open • Closes in ${hoursLeft}h ${minutesLeft}m`;
        } else {
            statusIndicator.style.background = '#ff3250';
            statusIndicator.style.boxShadow = '0 0 10px rgba(255, 50, 80, 0.8)';
            
            // Determine when it will open next
            let nextOpenDay, nextOpenTime;
            
            if (day === 0) { // Sunday
                nextOpenDay = "Monday";
                nextOpenTime = "9:00 AM";
            } else if (day === 6 && hour >= 16) { // Saturday after closing
                nextOpenDay = "Monday";
                nextOpenTime = "9:00 AM";
            } else if (day >= 1 && day <= 5 && hour >= 18) { // Weekday after closing
                if (day === 5) { // Friday
                    nextOpenDay = "Monday";
                    nextOpenTime = "9:00 AM";
                } else {
                    nextOpenDay = "Tomorrow";
                    nextOpenTime = "9:00 AM";
                }
            } else { // Before opening
                nextOpenDay = "Today";
                nextOpenTime = (day === 6) ? "10:00 AM" : "9:00 AM";
            }
            
            statusText.textContent = `Closed • Opens ${nextOpenDay} at ${nextOpenTime}`;
        }
    }
    
    // Update status immediately and then every minute
    updateStatus();
    setInterval(updateStatus, 60000);
    
    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormBtn = document.getElementById('resetForm');
    const charCount = document.getElementById('charCount');
    const messageTextarea = document.getElementById('message');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            if (length > 500) {
                charCount.style.color = '#ff3250';
                this.style.borderColor = '#ff3250';
            } else if (length > 400) {
                charCount.style.color = '#ffa500';
                this.style.borderColor = '#ffa500';
            } else {
                charCount.style.color = 'rgba(255, 255, 255, 0.5)';
                this.style.borderColor = 'rgba(255, 50, 80, 0.2)';
            }
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (message.length > 500) {
                alert('Message must be 500 characters or less');
                return;
            }
            
            // Simulate form submission
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted:', { name, email, subject, message });
        });
    }
    
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', function() {
            formSuccess.style.display = 'none';
            contactForm.style.display = 'block';
            contactForm.reset();
            charCount.textContent = '0';
            charCount.style.color = 'rgba(255, 255, 255, 0.5)';
        });
    }
    
    // Social media link interactions
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            
            // In a real application, these would open the actual social media pages
            // For demo purposes, we'll show a notification
            const platformNames = {
                'instagram': 'Instagram',
                'twitter': 'Twitter',
                'linkedin': 'LinkedIn',
                'dribbble': 'Dribbble'
            };
            
            alert(`Opening ${platformNames[platform]} page... (Demo)`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Simulate newsletter subscription
            emailInput.value = '';
            
            // Show success message
            const originalButtonText = this.querySelector('button').textContent;
            this.querySelector('button').textContent = 'Subscribed!';
            this.querySelector('button').style.background = 'linear-gradient(135deg, #32ff64 0%, #28e854 100%)';
            
            setTimeout(() => {
                this.querySelector('button').textContent = originalButtonText;
                this.querySelector('button').style.background = 'linear-gradient(135deg, #ff3250 0%, #ff1744 100%)';
                alert('Thank you for subscribing to our newsletter!');
            }, 2000);
            
            console.log('Newsletter subscription:', email);
        });
    }
    
    // Interactive building hover effects on map
    const mapBuildings = document.querySelectorAll('.map-building:not(.studio)');
    
    mapBuildings.forEach(building => {
        building.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 50, 80, 0.15)';
            this.style.borderColor = 'rgba(255, 50, 80, 0.4)';
        });
        
        building.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 50, 80, 0.05)';
            this.style.borderColor = 'rgba(255, 50, 80, 0.1)';
        });
    });
});

// Footer Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
                backToTop.style.transform = 'translateY(10px)';
            }
        });
        
        // Initialize
        backToTop.style.transition = 'all 0.3s ease';
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
        backToTop.style.transform = 'translateY(10px)';
    }
    
    // Animated statistics
    function animateFooterStats() {
        const visitorCount = document.getElementById('visitorCount');
        const projectCount = document.getElementById('projectCount');
        const responseTime = document.getElementById('responseTime');
        
        if (visitorCount) {
            animateCounter(visitorCount, 0, 142, 2000);
        }
        
        if (projectCount) {
            animateCounter(projectCount, 0, 23, 1500);
        }
        
        if (responseTime) {
            animateCounter(responseTime, 0, 4.2, 2500, true);
        }
    }
    
    function animateCounter(element, start, end, duration, isFloat = false) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            let currentValue;
            if (isFloat) {
                currentValue = start + (end - start) * progress;
                element.textContent = currentValue.toFixed(1);
            } else {
                currentValue = Math.floor(start + (end - start) * progress);
                element.textContent = currentValue;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Check for saved theme preference or default to dark
        const currentTheme = localStorage.getItem('theme') || 'dark';
        
        if (currentTheme === 'light') {
            themeToggle.checked = true;
            document.body.classList.add('light-theme');
        }
        
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                
                // Show theme change notification
                showThemeNotification('Light theme activated');
            } else {
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
                
                // Show theme change notification
                showThemeNotification('Dark theme activated');
            }
        });
    }
    
    function showThemeNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 50, 80, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 5px 20px rgba(255, 50, 80, 0.4);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Hide and remove notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Language selector functionality
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('language') || 'en';
        languageSelect.value = savedLanguage;
        
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('language', selectedLanguage);
            
            // In a real application, this would change the language of the entire site
            // For demo purposes, we'll show a notification
            const languageNames = {
                'en': 'English',
                'id': 'Bahasa Indonesia',
                'jp': 'Japanese',
                'cn': 'Chinese',
                'es': 'Spanish'
            };
            
            alert(`Language changed to ${languageNames[selectedLanguage]}. In a real application, this would translate the entire website.`);
            
            // You could add actual translation logic here
            // translateSite(selectedLanguage);
        });
    }
    
    // Footer newsletter form
    const footerNewsletterForm = document.querySelector('.footer-newsletter-form');
    
    if (footerNewsletterForm) {
        footerNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Simulate subscription
            emailInput.value = '';
            
            // Show success animation
            const submitBtn = this.querySelector('.footer-submit-btn');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #32ff64 0%, #28e854 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = 'linear-gradient(135deg, #ff3250 0%, #ff1744 100%)';
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.textContent = 'Thank you for subscribing!';
                successMsg.style.cssText = `
                    position: absolute;
                    top: -40px;
                    left: 0;
                    right: 0;
                    background: rgba(50, 255, 100, 0.9);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    text-align: center;
                    animation: slideDown 0.3s ease;
                `;
                
                this.appendChild(successMsg);
                
                setTimeout(() => {
                    if (successMsg.parentNode) {
                        successMsg.parentNode.removeChild(successMsg);
                    }
                }, 3000);
            }, 1500);
            
            console.log('Newsletter subscription (footer):', email);
        });
    }
    
    // Create particles effect for footer
    function createFooterParticles() {
        const particlesContainer = document.getElementById('footerParticles');
        if (!particlesContainer) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'footer-particle';
            
            // Random properties
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.3 + 0.1;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: #ff3250;
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                opacity: ${opacity};
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
                box-shadow: 0 0 10px rgba(255, 50, 80, 0.5);
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add CSS for particle animation
        if (!document.querySelector('#particleAnimationStyle')) {
            const style = document.createElement('style');
            style.id = 'particleAnimationStyle';
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    50% {
                        transform: translateY(-10px) translateX(-10px);
                    }
                    75% {
                        transform: translateY(10px) translateX(5px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Link hover effects
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px rgba(255, 50, 80, 0.8)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.8)';
        });
    });
    
    // Social media link interactions
    const socialCircles = document.querySelectorAll('.social-circle');
    
    socialCircles.forEach(circle => {
        circle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // In a real application, this would open the social media page
            const platform = this.getAttribute('aria-label').toLowerCase();
            alert(`Opening ${platform} page... (Demo)`);
        });
    });
    
    // Initialize footer components
    animateFooterStats();
    createFooterParticles();
    
    // Animate stats when footer comes into view
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFooterStats();
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const footerSection = document.querySelector('.main-footer');
    if (footerSection) {
        footerObserver.observe(footerSection);
    }
    
    // Add light theme CSS if needed
    if (!document.querySelector('#lightThemeStyle')) {
        const lightThemeStyle = document.createElement('style');
        lightThemeStyle.id = 'lightThemeStyle';
        lightThemeStyle.textContent = `
            .light-theme {
                background: #f5f5f7;
                color: #333;
            }
            
            .light-theme .content-wrapper,
            .light-theme .overview-card,
            .light-theme .contact-card,
            .light-theme .map-container,
            .light-theme .hours-container,
            .light-theme .contact-form-container,
            .light-theme .social-container,
            .light-theme .newsletter-container,
            .light-theme .visual-card,
            .light-theme .philosophy-card,
            .light-theme .gallery-container,
            .light-theme .main-footer {
                background: rgba(255, 255, 255, 0.9);
                color: #333;
                border-color: rgba(255, 50, 80, 0.2);
            }
            
            .light-theme h1,
            .light-theme h2,
            .light-theme h3,
            .light-theme h4,
            .light-theme .nav-links a,
            .light-theme .footer-title,
            .light-theme .link-title {
                color: #222;
                text-shadow: none;
            }
            
            .light-theme p,
            .light-theme .description,
            .light-theme .about-description,
            .light-theme .nav-links a:not(:first-child) {
                color: #555;
                text-shadow: none;
            }
            
            .light-theme .bg-overlay {
                background: linear-gradient(135deg, rgba(245, 245, 247, 0.9) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(245, 245, 247, 0.9) 100%);
            }
            
            .light-theme .glow-effect {
                opacity: 0.05;
            }
        `;
        document.head.appendChild(lightThemeStyle);
    }
});