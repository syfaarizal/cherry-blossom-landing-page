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