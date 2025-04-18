document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = "Inicio.html"; // Redirige al login si no está autenticado
        return; // evita que el resto del código se ejecute
    }
});

