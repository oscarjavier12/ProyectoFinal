

// Cambiar entre formularios
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
});

// Ventana modal de términos y condiciones
const termsModal = document.getElementById('termsModal');
const showTerms = document.getElementById('showTerms');
const closeTerms = document.getElementById('closeTerms');

showTerms.addEventListener('click', (e) => {
    e.preventDefault();
    termsModal.style.display = 'block';
});

closeTerms.addEventListener('click', () => {
    termsModal.style.display = 'none';
});

// Cerrar la ventana modal al hacer clic fuera de ella
window.addEventListener('click', (e) => {
    if (e.target === termsModal) {
        termsModal.style.display = 'none';
    }
});

// Validación del formulario de inicio de sesión
const login = document.getElementById('login');
login.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');

    let isValid = true;

    // Validar email
    if (!validateEmail(email.value)) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Validar contraseña
    if (password.value.length < 6) {
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    // Si todo es válido, enviar formulario
    if (isValid) {
        // Aquí puedes manejar el inicio de sesión (por ejemplo, con una API)
        alert('Inicio de sesión exitoso!');
        // En un caso real, aquí harías la petición al servidor
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = "Natural.html";
    }
});

// Validación del formulario de registro
const register = document.getElementById('register');
register.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName');
    const email = document.getElementById('registerEmail');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('registerConfirmPassword');
    const terms = document.getElementById('terms');

    const nameError = document.getElementById('registerNameError');
    const emailError = document.getElementById('registerEmailError');
    const passwordError = document.getElementById('registerPasswordError');
    const confirmError = document.getElementById('registerConfirmPasswordError');
    const termsError = document.getElementById('termsError');

    let isValid = true;

    // Validar nombre
    if (name.value.trim() === '') {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    // Validar email
    if (!validateEmail(email.value)) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Validar contraseña
    if (password.value.length < 6) {
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    // Validar confirmación de contraseña
    if (password.value !== confirmPassword.value) {
        confirmError.style.display = 'block';
        isValid = false;
    } else {
        confirmError.style.display = 'none';
    }

    // Validar aceptación de términos
    if (!terms.checked) {
        termsError.style.display = 'block';
        isValid = false;
    } else {
        termsError.style.display = 'none';
    }

    // Si todo es válido, enviar formulario
    if (isValid) {
        
    }
});

// Función para validar email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


