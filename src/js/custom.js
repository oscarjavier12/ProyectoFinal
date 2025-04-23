const contenedor = document.querySelector('.container');
const elementos = document.querySelector('.elementos');
const flechaIzquierda = document.querySelector('.izquierda');
const flechaDerecha = document.querySelector('.derecha');

let posicion = 0; // Posición actual del scroll

flechaIzquierda.addEventListener('click', () => {
    posicion -= 100; // Ajusta la cantidad de scroll
    if (posicion < 0) {
        posicion = 0;
    }
    elementos.style.transform = `translateX(-${posicion}px)`;
});

flechaDerecha.addEventListener('click', () => {
    posicion += 100; // Ajusta la cantidad de scroll
    if (posicion > elementos.scrollWidth - contenedor.offsetWidth) {
        posicion = elementos.scrollWidth - contenedor.offsetWidth;
    }
    elementos.style.transform = `translateX(-${posicion}px)`;

});
document.addEventListener('DOMContentLoaded', function () {
    // Carrusel de testimonios
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    // Mostrar el testimonio actual
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });

        testimonials[index].classList.add('active');
    }

    // Siguiente testimonio
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    // Testimonio anterior
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }

    // Event listeners para los botones
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);

    // Cambio automático cada 5 segundos
    setInterval(nextTestimonial, 5000);

    // Efecto de aparición al hacer scroll
    const serviceCards = document.querySelectorAll('.service-card');

    function checkScroll() {
        serviceCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }

    // Inicializar opacidad y posición
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
    });

    // Verificar al cargar y al hacer scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);

    // Verificar inmediatamente por si algunos elementos ya están visibles
    checkScroll();

    // Efecto hover para las imágenes de servicio
    const serviceImages = document.querySelectorAll('.service-image img');

    serviceImages.forEach(img => {
        img.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        img.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
});