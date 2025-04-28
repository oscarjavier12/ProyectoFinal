

document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = "login.html"; // Redirige al login si no está autenticado
        return; // evita que el resto del código se ejecute
    }
    
    if (sessionStorage.getItem('isAdmin') === 'true') {
        document.getElementById('admin').style.display = 'block'; // Muestra el botón de admin
    }
    cargarContenido("/src/html/Inicio.html");
    
});

const cerrar = document.getElementById('cerrar');
cerrar.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
    window.location.href = "login.html"; // Redirige al login
});
const menu = document.getElementsByClassName("menu");
menu[0].addEventListener("click", function () {
    cargarContenido("/src/html/Inicio.html");
});
menu[1].addEventListener("click", function () {
    cargarContenido("/src/html/Informacion.html");
});
menu[2].addEventListener("click", function () {
    cargarContenido("/src/html/Productos.html");
});
menu[3].addEventListener("click", function () {
    cargarContenido("/src/html/Contacto.html");
});
menu[4].addEventListener("click", function () {
    cargarContenido("/src/html/Servicios.html");
});
menu[5].addEventListener("click", function () {
    cargarContenido("/src/html/Carrito.html");
});
const seePrduct = document.getElementById('seePrduct');
seePrduct.addEventListener("click", function () {
    cargarContenido("/src/html/Productos.html");
});

function cargarContenido(ruta) {
    fetch(ruta)
        .then(response => response.text()) // Convierte la respuesta a texto
        .then(html => {
            document.getElementById('contenedor').innerHTML = html; // Inserta el HTML en un elemento existente

        })
        .catch(error => {
            console.error('Error al cargar el HTML:', error);
        });
};


