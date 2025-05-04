

document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = "login.html"; // Redirige al login si no está autenticado
        return; // evita que el resto del código se ejecute
    }

    if (sessionStorage.getItem('isAdmin') === 'true') {
        document.getElementById('admin').style.display = 'block'; // Muestra el botón de admin
    }

});


const cerrar = document.getElementById('cerrar');
cerrar.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
    window.location.href = "login.html"; // Redirige al login
});




