if (sessionStorage.getItem('isAdmin') === 'true') {
    document.getElementById('admin').style.display = 'block'; // Muestra el botón de admin
}
const cerrar = document.getElementById('cerrar');
cerrar.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
    window.location.href = "login.html"; // Redirige al login

});