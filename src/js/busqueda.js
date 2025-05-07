import DataManager from "./DataManager.js";

// simulación de una base de datos de productos
let productsDatabase = [];

// mostrar mensaje
function showMessage(message, type = 'info') {
    const messageElement = document.getElementById('searchMessage');
    messageElement.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        const alert = messageElement.querySelector('.alert');
        if (alert) {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }
    }, 5000);
}

// cargar productos 
function loadProducts() {
    // llamar los productos desde la base de datos
    const datos = new DataManager('Articulos');
    productsDatabase = datos.readData(); // Obtener los datos de la base de datos

    console.log('Productos cargados:', productsDatabase);

}

// Función para buscar productos
function searchProducts(searchType, searchTerm) {
    const tbody = document.getElementById('resultsTableBody');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const resultsTable = document.getElementById('resultsTable');

    // Limpiar resultados anteriores
    tbody.innerHTML = '';
    noResultsMessage.style.display = 'none';
    resultsTable.style.display = 'table';

    // Verificar si la base de datos está vacía
    if (productsDatabase.length === 0) {
        showMessage('La base de datos de productos está vacía. No hay productos para buscar.', 'warning');
        noResultsMessage.style.display = 'block';
        resultsTable.style.display = 'none';
        return;
    }
    const term = searchTerm.toLowerCase();

    // Filtrar productos según el tipo de búsqueda
    let results = [];

    if (searchType === 'name') {
        results = productsDatabase.filter(product =>
            product.name.toLowerCase().includes(term)
        );
    } else if (searchType === 'id') {
        // Verificar si el término es un número (para búsqueda por ID)
        if (!isNaN(term)) {
            const id = term;

            results = productsDatabase.filter(product => product.id === id);
            console.log('Resultados de búsqueda por ID:', results);
        } else {
            showMessage('Para buscar por ID debe ingresar un número.', 'warning');
            return;
        }
    }

    // Mostrar resultados
    if (results.length === 0) {
        document.getElementById("resultsContainer").style.display = "block"; // Ocultar el contenedor de resultados
        showMessage(`No se encontraron productos que coincidan con "${searchTerm}"`, 'warning');
        noResultsMessage.style.display = 'block';
        resultsTable.style.display = 'none';
    } else {
        showMessage(`Se encontraron ${results.length} producto(s) que coinciden con "${searchTerm}"`, 'success');
        agregarFIlaTabla(results, tbody); // Llamar a la función para agregar filas a la tabla


        tbody.appendChild(row);

    }
}

// Manejador del formulario de búsqueda
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const searchType = document.getElementById('searchType').value;
    const searchTerm = document.getElementById('searchTerm').value.trim();

    if (!searchTerm) {
        showMessage('Por favor ingrese un término de búsqueda', 'warning');
        return;
    }

    searchProducts(searchType, searchTerm);
});

// Cargar productos cuando la página esté lista
document.addEventListener('DOMContentLoaded', function () {
    loadProducts();
});

const agregarFIlaTabla = (dataSession, tbody) => {
    tbody.textContent = ""; // Limpiar el contenido de la tabla antes de agregar nuevas filas

    for (const articulo of dataSession) {
        const newRow = document.createElement('tr');
        const propiedades = ["id", "nombre", "categoria", "precio", "descripcion", "stock"];
        propiedades.forEach(propiedad => {
            agregarCelda(newRow, articulo[propiedad]);
        });

        // Agregar la nueva fila al cuerpo de la tabla
        tbody.appendChild(newRow);
    }

};

// Función para agregar celda a fila
function agregarCelda(fila, valor) {
    const col = document.createElement('td');

    // Para valores normales de texto, limitar longitud si es necesario
    if (typeof valor === 'string' && valor.length > 50) {
        valor = valor.substring(0, 50) + '...';
    }
    col.textContent = valor;

    fila.appendChild(col);
}