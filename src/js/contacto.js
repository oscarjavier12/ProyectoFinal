
// Formularios de validación
const form = document.getElementById('contactForm');

form.addEventListener('submit', function (event) {
    const phoneInput = document.getElementById('phone');
    if (phoneInput.value.trim() === '') {
        phoneInput.setCustomValidity('Por favor ingresa tu número de teléfono');
    } else {
        phoneInput.setCustomValidity('');
    }

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault();
        showSuccessMessage();
        form.reset();
        form.classList.remove('was-validated');
    }

    form.classList.add('was-validated');
    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
        phoneInput.setCustomValidity('El número de teléfono debe tener al menos 10 dígitos');
    }
}, false);

// numero de telefono validacion
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

        // Limpiar validación personalizada mientras se escribe
        if (e.target.value.trim() !== '') {
            e.target.setCustomValidity('');
        }
    });
}

// mostrar mensaje de éxito
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('d-none');

    // Hide after 5 seconds
    setTimeout(() => {
        successMessage.classList.add('d-none');
    }, 5000);
}

// agregar animación al formulario
const formElements = document.querySelectorAll('.form-control, .form-select, .btn-send');
formElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
});
