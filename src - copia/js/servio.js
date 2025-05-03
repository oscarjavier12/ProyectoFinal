
//scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Cierrar el menú móvil si está abierto
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        }
    });
});

// puntar el slider de testimonios
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.querySelector('.slider-dots');
let currentTestimonial = 0;
let testimonialInterval;

// Crear los puntos de navegación
if (testimonials.length > 0 && dotsContainer) {
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showTestimonial(index) {
        testimonials[currentTestimonial].classList.remove('active');
        dots[currentTestimonial].classList.remove('active');

        currentTestimonial = (index + testimonials.length) % testimonials.length;

        testimonials[currentTestimonial].classList.add('active');
        dots[currentTestimonial].classList.add('active');
    }

    // Iniciar el slider automáticamente
    // Cambia el intervalo a 5 segundos (5000 ms) para mayor claridad
    function startSlider() {
        testimonialInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    }

    startSlider();

    // Pausar
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        slider.addEventListener('mouseleave', startSlider);
    }

    //Botones de navegación
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
        });
    }
}

// Animacion de tarjetas al hacer scroll
const animateOnScroll = function () {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (cardPosition < screenPosition) {
            const delay = card.getAttribute('data-delay') || '0s';
            card.style.animationDelay = delay;
            card.classList.add('animate__fadeInUp');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // corre la animación al cargar la página

// Form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');

        // Simple validation
        if (emailInput.value && emailInput.value.includes('@')) {
            alert('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.');
            emailInput.value = '';
        } else {
            alert('Por favor ingresa un correo electrónico válido.');
        }
    });
}

// Buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
        console.log(`Button clicked: ${this.textContent.trim()}`);
    });
});
