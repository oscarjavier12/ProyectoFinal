
document.addEventListener('DOMContentLoaded', function () {
    // Mostrar modal de términos y condiciones
    document.getElementById('showTerms').addEventListener('click', function (e) {
        e.preventDefault();
        var termsModal = new bootstrap.Modal(document.getElementById('termsModal'));
        termsModal.show();
    });
});

const login = document.getElementById('login');
login.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');
    const userError = document.getElementById('loginUserError');

    let isValid = true;
    let admin = false;
    // Validar email
    if (!validateEmail(email.value)) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
        if (email.value === "usuario1@gmail.com" && password.value === "usuario1") {
            isValid = true;
        } else if (email.value === "admin@gmail.com" && password.value === "administrador") {
            admin = true;
            isValid = true;
        } else {
            isValid = false;
            userError.style.display = 'block';
        }
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
        sessionStorage.setItem('isLoggedIn', 'true');
        if (admin) {
            sessionStorage.setItem('isAdmin', 'true');
        }else{
            sessionStorage.setItem('isAdmin', 'false');
        }

        window.location.href = "index.html";
    }
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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
    let admin = false;
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

