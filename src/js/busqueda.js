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
            const id = parseInt(term);
            results = productsDatabase.filter(product => product.id === id);
        } else {
            showMessage('Para buscar por ID debe ingresar un número.', 'warning');
            return;
        }
    }

    // Mostrar resultados
    if (results.length === 0) {
        showMessage(`No se encontraron productos que coincidan con "${searchTerm}"`, 'warning');
        noResultsMessage.style.display = 'block';
        resultsTable.style.display = 'none';
    } else {
        showMessage(`Se encontraron ${results.length} producto(s) que coinciden con "${searchTerm}"`, 'success');

        // Mostrar los resultados en la tabla
        results.forEach(product => {
            const row = document.createElement('tr');

            // Agregar celdas con los datos del producto
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.description}</td>
                <td>${product.stock}</td>
            `;

            tbody.appendChild(row);
        });
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