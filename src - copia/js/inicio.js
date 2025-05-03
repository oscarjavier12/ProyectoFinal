

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
menu[4].addEventListener("click", function () {
    cargarContenido("/src/html/Contacto.html");
});
menu[3].addEventListener("click", function () {
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
        .then(response => response.text())
        .then(html => {
            document.getElementById('contenedor').innerHTML = html;
            // Buscar y ejecutar scripts dentro del HTML cargado (ejemplo básico)
            const scripts = document.getElementById('contenedor').querySelectorAll('script');
            scripts.forEach(script => {
                const scriptElement = document.createElement('script');
                if (script.type) {
                    scriptElement.type = script.type;
                }
                if (script.src) {
                    scriptElement.src = script.src;
                    // Para scripts externos, asegúrate de que se carguen antes de continuar si es necesario
                    scriptElement.onload = () => {
                        console.log(`Script cargado: ${script.src}`);
                        // Aquí podrías ejecutar alguna función después de cargar el script
                    };
                    document.head.appendChild(scriptElement);
                    script.remove(); // Opcional: eliminar el script original del HTML insertado
                } else {
                    scriptElement.textContent = script.textContent;
                    document.head.appendChild(scriptElement);
                    script.remove(); // Opcional
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar el HTML:', error);
        });
};


