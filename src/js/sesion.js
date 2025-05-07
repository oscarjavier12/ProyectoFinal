document.addEventListener('DOMContentLoaded', function () {
    // Mostrar modal de términos y condiciones
    document.getElementById('showTerms').addEventListener('click', function (e) {
        e.preventDefault();
        var termsModal = new bootstrap.Modal(document.getElementById('termsModal'));
        termsModal.show();
    });

    // Cargar usuarios desde localStorage si existen
    if (localStorage.getItem('users')) {
        // Inicializar con usuarios predeterminados
        const defaultUsers = [
            { name: 'Usuario 1', email: 'usuario1@gmail.com', password: 'usuario1', role: 'user' },
            { name: 'Administrador', email: 'admin@gmail.com', password: 'administrador', role: 'admin' },
            { name: 'Programador', email: 'dev@gmail.com', password: 'programador', role: 'programmer' }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
});

const login = document.getElementById('login');
login.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');
    const userError = document.getElementById('loginUserError');
    const passwordError2 = document.getElementById('loginPasswordError2');


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

    // Si el formato es válido, verificar credenciales
    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(user =>
            user.email === email.value
        );
        const foundPassword = users.find(user =>
            user.password === password.value
        );
        console.log(foundUser)

        if (foundUser) {
            userError.style.display = 'none';
            if (foundPassword) {
                // Guardar información de sesión
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userRole', foundUser.role);
                sessionStorage.setItem('isAdmin', (foundUser.role === 'admin').toString()); // Mantener para compatibilidad
                sessionStorage.setItem('isProgrammer', (foundUser.role === 'programmer').toString());
                sessionStorage.setItem('currentUser', JSON.stringify({
                    name: foundUser.name,
                    email: foundUser.email,
                    role: foundUser.role
                }));

                // Redireccionar al índice
                window.location.href = "/src/Index.html";
            }else {
                // Mostrar error de contraseña incorrecta
                passwordError2.style.display = 'block';
            }
        } else {
            // Mostrar error de credenciales inválidas
            userError.style.display = 'block';
        } 
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
    const emailExistsError = document.getElementById('emailExistsError') ||
        createErrorElement('emailExistsError', 'Este correo ya está registrado.');

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

        // Verificar si el email ya existe
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.email === email.value)) {
            emailExistsError.style.display = 'block';
            isValid = false;
        } else {
            emailExistsError.style.display = 'none';
        }
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

    // Si todo es válido, registrar usuario
    if (isValid) {
        // Obtener usuarios existentes
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Crear nuevo usuario (por defecto como usuario normal)
        const newUser = {
            name: name.value.trim(),
            email: email.value,
            password: password.value,
            role: 'user'
        };

        // Agregar usuario
        users.push(newUser);

        // Guardar en localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Mostrar mensaje de éxito
        showSuccessMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');

        // Limpiar formulario
        register.reset();
    }
});

// Función para crear elementos de error si no existen
function createErrorElement(id, message) {
    const emailField = document.getElementById('registerEmail');
    const errorElement = document.createElement('div');
    errorElement.id = id;
    errorElement.className = 'invalid-feedback';
    errorElement.textContent = message;
    errorElement.style.display = 'none';
    emailField.parentNode.appendChild(errorElement);
    return errorElement;
}

// Función para mostrar mensaje de éxito
function showSuccessMessage(message) {
    // Si existe un contenedor de mensajes, usarlo
    const messageContainer = document.getElementById('messageContainer') || createMessageContainer();

    // Crear alerta
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-success alert-dismissible fade show';
    alertElement.role = 'alert';
    alertElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Agregar alerta al contenedor
    messageContainer.appendChild(alertElement);

    // Remover después de 5 segundos
    setTimeout(() => {
        alertElement.classList.remove('show');
        setTimeout(() => alertElement.remove(), 300);
    }, 5000);
}

// Función para crear contenedor de mensajes si no existe
function createMessageContainer() {
    const container = document.createElement('div');
    container.id = 'messageContainer';
    container.className = 'position-fixed top-0 end-0 p-3';
    container.style.zIndex = '1050';
    document.body.appendChild(container);
    return container;
}