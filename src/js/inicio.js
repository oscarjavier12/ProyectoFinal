/**
document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = "login.html"; // Redirige al login si no está autenticado
        return; // evita que el resto del código se ejecute
    }
        
});
*/

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


