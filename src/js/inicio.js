

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



function cargarContenido(ruta) {
    const contenedor = document.getElementById('contenedor');

    // Limpiar el contenedor antes de cargar nuevo contenido
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }

    return fetch(ruta)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {

            contenedor.innerHTML = html;

            const scripts = Array.from(contenedor.querySelectorAll('script'));
            const scriptPromises = [];

            scripts.forEach(script => {
                const scriptElement = document.createElement('script');
                Array.from(script.attributes).forEach(attr => {
                    scriptElement.setAttribute(attr.name, attr.value);
                });

                const loadPromise = new Promise((resolve, reject) => {
                    scriptElement.onload = resolve;
                    scriptElement.onerror = reject;
                });

                if (script.src) {
                    // Cache busting (opcional)
                    const cacheBustUrl = script.src + '?t=' + Date.now();
                    scriptElement.src = cacheBustUrl;
                    scriptPromises.push(loadPromise);
                } else {
                    try {
                        new Function(script.textContent)(); // Ejecutar script inline
                        scriptPromises.push(Promise.resolve());
                    } catch (error) {
                        console.error('Error al ejecutar script inline:', error);
                        scriptPromises.push(Promise.resolve()); // Resuelve para continuar
                    }
                }

                script.parentNode.replaceChild(scriptElement, script);
            });

            return Promise.all(scriptPromises)
                .then(() => {
                    console.log('Contenido cargado y scripts procesados.');
                    // Llamar a una función de inicialización global si existe
                    if (typeof inicializarContenidoDinamico === 'function') {
                        inicializarContenidoDinamico();
                    }
                    return contenedor;
                });
        })
        .catch(error => {
            console.error('Error al cargar contenido:', error);
            throw error;
        });
}

