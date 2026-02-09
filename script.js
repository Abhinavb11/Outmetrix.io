console.log("Slider JS loaded");
document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => {
        observer.observe(el);
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Particle Background (Canvas) ---
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            // 🔼 Slightly bigger particles
            this.size = Math.random() * 2.5 + 0.5;

            // Smooth floating motion
            this.speedX = (Math.random() * 0.8) - 0.4;
            this.speedY = (Math.random() * 0.8) - 0.4;

            // Brighter colors
            this.color = Math.random() > 0.5
                ? 'rgba(0, 240, 255,'
                : 'rgba(0, 255, 221,';

            // 🔼 Higher opacity
            this.opacity = Math.random() * 0.6 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color + this.opacity + ')';

            // 🌟 Glow effect
            ctx.shadowColor = this.color + '1)';
            ctx.shadowBlur = 12;

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 0;
        }
    }

    function initParticles() {
        particlesArray = [];

        // 🔼 MORE PARTICLES (was /15000)
        const numberOfParticles = (canvas.width * canvas.height) / 8000;

        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {

                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = dx * dx + dy * dy;

                if (distance < 18000) {
                    const opacity = 1 - distance / 18000;

                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.25})`;
                    ctx.lineWidth = 1;

                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    initParticles();
    animateParticles();


    // --- Ultra Smooth 3D Tilt Effect ---
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        let rect = null;
        let mouseX = 0;
        let mouseY = 0;
        let rafId = null;

        const update = () => {
            if (!rect) return;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((mouseY - centerY) / centerY) * -8;
            const rotateY = ((mouseX - centerX) / centerX) * 8;

            card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.04, 1.04, 1.04)
    `;

            rafId = requestAnimationFrame(update);
        };

        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
            card.style.transition = 'transform 0.08s ease-out';
            rafId = requestAnimationFrame(update);
        });

        card.addEventListener('mousemove', (e) => {
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        card.addEventListener('mouseleave', () => {
            cancelAnimationFrame(rafId);
            rafId = null;
            rect = null;

            card.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)';
            card.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
        });
    });

    // const vrTrack = document.querySelector('.vr-track');

    // if (vrTrack) {
    //     vrTrack.innerHTML += vrTrack.innerHTML; // clone for infinite loop
    // }


    // const vrObserver = new IntersectionObserver(
    //     ([entry]) => {
    //         if (entry.isIntersecting) {
    //             vrTrack.classList.add('is-active');
    //         } else {
    //             vrTrack.classList.remove('is-active');
    //         }
    //     },
    //     {
    //         threshold: 0.2
    //     }
    // );

    // vrObserver.observe(vrSection);



    //--- showcase ---

    console.log("🔥 slider script loaded");

    const images = [
        "assets/download.jpg",
        "assets/download1.jpg",
        "assets/download.jpg",
        "assets/download1.jpg",
        "assets/download.jpg",
        "assets/download1.jpg"
    ];

    let index = 0;

    const img = document.getElementById("showcaseImage");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (!img || !nextBtn || !prevBtn) {
        console.error("❌ Element not found");
    }

    function updateImage() {
        img.src = images[index];
    }

    nextBtn.onclick = () => {
        index = (index + 1) % images.length;
        updateImage();
    };

    prevBtn.onclick = () => {
        index = (index - 1 + images.length) % images.length;
        updateImage();
    };

    setInterval(() => {
        index = (index + 1) % images.length;
        updateImage();
    }, 5000);

});