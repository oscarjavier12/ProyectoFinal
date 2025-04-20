
fetch('../html/login.html') // Cambia la ruta al archivo HTML que deseas cargar
    .then(response => response.text()) // Convierte la respuesta a texto
    .then(html => {
        document.getElementById('contenedor').innerHTML = html; // Inserta el HTML en un elemento existente
    })
    .catch(error => {
        console.error('Error al cargar el HTML:', error);
    });