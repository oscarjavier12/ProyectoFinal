import buttons from "./buttons.js";
document.addEventListener('DOMContentLoaded', function () {
    cargarBootstrapIcons();
    verificarTablaVacia();
});
// Configuración inicial - Input Range
const rango = document.getElementById('productCantidad');
rango.addEventListener('input', function () {
    this.nextElementSibling.textContent = this.value;
});

// Estado de edición
let datosCeldas = [];

// Ocultar tabla al iniciar
ocultarTablaProductos();

// Manejador de eventos para acciones en la tabla
const cuerpo = document.getElementById('productTable');
cuerpo.addEventListener('click', function (event) {
    // EDITAR FILA
    if (event.target.id === 'btnEditar' || event.target.closest('#btnEditar')) {
        const rowEditar = event.target.closest('tr');
        const cells = rowEditar.querySelectorAll('td');
        datosCeldas = [];

        cells.forEach((cell, index) => {
            if (index < cells.length - 1) {
                const valorcelda = cell.textContent;
                datosCeldas.push(valorcelda);

                const input = document.createElement('input');
                input.type = 'text';
                input.value = valorcelda;
                input.classList = 'form-control';
                cell.textContent = "";
                cell.appendChild(input);
            }
        });

        buttons.cambioBoton(
            event,
            buttons.botones.btnSave.id,
            buttons.botones.btnSave.iconClass,
            buttons.botones.btnSave.title,
            buttons.botones.btnSave.clase
        );
        const deleteButton = rowEditar.querySelector('#btnEliminar');
        buttons.cambioBtnSinEvent(
            deleteButton,
            buttons.botones.btnCancel.id,
            buttons.botones.btnCancel.iconClass,
            buttons.botones.btnCancel.title,
            buttons.botones.btnCancel.clase
        );

        return;
    }

    // GUARDAR CAMBIOS
    if (event.target.id === 'btnGuardar' || event.target.closest('#btnGuardar')) {
        const rowSave = event.target.closest('tr');
        const cajitaTexto = rowSave.querySelectorAll('input');

        cajitaTexto.forEach((input, index) => {
            const valorNuevo = input.value;
            input.parentNode.textContent = valorNuevo;
        });

        buttons.cambioBoton(
            event,
            buttons.botones.btnEdit.id,
            buttons.botones.btnEdit.iconClass,
            buttons.botones.btnEdit.title,
            buttons.botones.btnEdit.clase
        );
        const cancelarBoton = rowSave.querySelector('#btnCancelar');
        buttons.cambioBtnSinEvent(
            cancelarBoton,
            buttons.botones.btnDelete.id,
            buttons.botones.btnDelete.iconClass,
            buttons.botones.btnDelete.title,
            buttons.botones.btnDelete.clase
        );

        return;
    }

    // CANCELAR EDICIÓN
    if (event.target.id === 'btnCancelar' || event.target.closest('#btnCancelar')) {
        const rowCancel = event.target.closest('tr');
        const cells = rowCancel.querySelectorAll('input');
        if (datosCeldas.length != cells.length) {
            console.log('Error: No se puede cancelar la edición');
            return;
        }
        cells.forEach((cell, index) => {
            if (index < cells.length) {
                const valorcelda = datosCeldas[index];
                cell.parentNode.textContent = valorcelda;
            }
        });

        buttons.cambioBoton(
            event,
            buttons.botones.btnDelete.id,
            buttons.botones.btnDelete.iconClass,
            buttons.botones.btnDelete.title,
            buttons.botones.btnDelete.clase
        );
        const guardarBoton = rowCancel.querySelector('#btnGuardar');
        buttons.cambioBtnSinEvent(
            guardarBoton,
            buttons.botones.btnEdit.id,
            buttons.botones.btnEdit.iconClass,
            buttons.botones.btnEdit.title,
            buttons.botones.btnEdit.clase
        );
        return;
    }

    // ELIMINAR FILA
    if (event.target.id === 'btnEliminar' || event.target.closest('#btnEliminar')) {
        if (confirm('¿Está seguro que desea eliminar este producto?')) {
            const rowDelete = event.target.closest('tr');
            rowDelete.remove();

            // Verificar si la tabla está vacía y ocultarla si es así
            verificarTablaVacia();
            showAlert('Producto eliminado correctamente', 'warning');
        }
    }
});

// Función para verificar si la tabla está vacía
function verificarTablaVacia() {
    const tbody = document.getElementById('productTableBody');
    if (tbody && tbody.children.length === 0) {
        ocultarTablaProductos();
    }
}

// Función para ocultar la tabla de productos
function ocultarTablaProductos() {
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        const emptyMessage = document.querySelector('.empty-table-message');

        if (!emptyMessage) {
            // Crear mensaje para cuando la tabla está vacía
            const message = document.createElement('div');
            message.className = 'empty-table-message alert alert-info text-center';

            // Crear icono para el mensaje
            const cartIcon = document.createElement('i');
            cartIcon.className = 'bi bi-clipboard-x';
            message.appendChild(cartIcon);

            // Espacio entre el icono y el texto
            message.appendChild(document.createTextNode(' '));

            const textNode = document.createTextNode('No hay productos');
            message.appendChild(textNode);

            // Insertar mensaje antes de la tabla
            tableContainer.insertBefore(message, tableContainer.querySelector('table'));
        } else {
            emptyMessage.style.display = 'block';
        }

        // Ocultar la tabla
        const table = document.querySelector('.product-table');
        if (table) table.style.display = 'none';
    }
}

// Función para mostrar la tabla de productos
function mostarTablaProductos() {
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        const emptyMessage = document.querySelector('.empty-table-message');
        if (emptyMessage) {
            emptyMessage.style.display = 'none';
        }

        // Mostrar la tabla
        const table = document.querySelector('.product-table');
        if (table) table.style.display = 'table';
    }
}

// Función para mostrar alertas
function showAlert(message, type) {
    // Crear elemento de alerta
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type} alert-dismissible fade show`;
    alertElement.role = 'alert';

    // Agregar icono según el tipo de alerta
    const alertIcon = document.createElement('i');

    if (type === 'success') {
        alertIcon.className = 'bi bi-check-circle';
    } else if (type === 'danger') {
        alertIcon.className = 'bi bi-exclamation-triangle';
    } else if (type === 'warning') {
        alertIcon.className = 'bi bi-exclamation-circle';
    } else {
        alertIcon.className = 'bi bi-info-circle';
    }

    alertElement.appendChild(alertIcon);

    // Espacio entre el icono y el texto
    alertElement.appendChild(document.createTextNode(' '));

    // Crear el texto de la alerta
    const textNode = document.createTextNode(message);
    alertElement.appendChild(textNode);

    // Crear botón de cierre
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');

    // Añadir botón de cierre a la alerta
    alertElement.appendChild(closeButton);

    // Insertar alerta al principio del contenedor
    const container = document.querySelector('.admin-container');
    const tabla = document.querySelector('#productTable');
    container.insertBefore(alertElement, tabla);

    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
        alertElement.classList.remove('show');
        setTimeout(() => alertElement.remove(), 150);
    }, 3000);
}

// Función para validar el formulario
function validateForm(form) {
    // Validar campos requeridos
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.checkValidity()) {
            isValid = false;
            // Resaltar campo inválido
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Manejador de eventos para envío del formulario
const form = document.getElementById('productForm');
form.addEventListener('submit', function (event) {
    // Prevenir el envío del formulario
    event.preventDefault();

    // Añadir clase para activar estilos de validación de Bootstrap
    this.classList.add('was-validated');

    // Validar el formulario
    if (!validateForm(this)) {
        // Mostrar mensaje de error
        showAlert('Por favor, complete todos los campos obligatorios correctamente.', 'danger');
        return; // Detener la ejecución
    }

    // Si la validación es exitosa, proceder con la creación de la fila
    // Recuperar los datos del formulario
    const formData = new FormData(this);

    // Agregar fila a la tabla
    const tbody = document.getElementById('productTableBody');
    agregarFIlaTabla(formData, tbody);

    // Mostrar la tabla (ahora que tiene elementos)
    mostarTablaProductos();

    // Mostrar mensaje de éxito
    showAlert('Producto agregado correctamente.', 'success');

    // Resetear el formulario
    this.reset();
    this.classList.remove('was-validated');
    rango.nextElementSibling.textContent = '100'; // Resetear el valor mostrado del rango
});

// Función para agregar fila a la tabla
const agregarFIlaTabla = (formData, tbody) => {
    const fila = document.createElement('tr');

    // Agregar celdas con datos
    agregarCelda(fila, formData.get('productName'));
    agregarCelda(fila, formData.get('productCategory'));

    // Formatear precio
    const precio = parseFloat(formData.get('productPrice')).toFixed(2);
    agregarCelda(fila, `$${precio}`);

    // Formatear fecha
    const fecha = formData.get('productDate');
    const fechaFormateada = formatearFecha(fecha);
    agregarCelda(fila, fechaFormateada);

    agregarCelda(fila, formData.get('productDescription'));
    agregarCelda(fila, formData.get('productCantidad'));

    // Manejar el checkbox
    const featured = formData.get('productFeatured') ? 'Si' : 'No';
    agregarCeldaBooleana(fila, featured);

    // Obtener el valor del radio button seleccionado
    const availability = formData.get('productAvailability');
    let availabilityText;

    switch (availability) {
        case 'now':
            availabilityText = 'Ahora';
            break;
        case 'soon':
            availabilityText = 'Próximamente';
            break;
        case 'preorder':
            availabilityText = 'Por Pedido';
            break;
        default:
            availabilityText = availability;
    }

    agregarCelda(fila, availabilityText);

    // Crear celda para acciones con botones con texto
    const actionCell = document.createElement('td');
    actionCell.className = 'd-flex gap-2';

    // Botón de editar con icono
    const editButton = document.createElement('button');
    editButton.id = 'btnEditar';
    editButton.className = 'btn btn-sm btn-outline-primary';
    editButton.title = 'Editar';

    // Crear el icono como elemento DOM
    const editIcon = document.createElement('i');
    editIcon.className = 'bi bi-pencil-square';
    editButton.appendChild(editIcon);

    // Botón de eliminar con icono
    const deleteButton = document.createElement('button');
    deleteButton.id = 'btnEliminar';
    deleteButton.className = 'btn btn-sm btn-outline-danger';
    deleteButton.title = 'Eliminar';

    // Crear el icono como elemento DOM
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'bi bi-trash';
    deleteButton.appendChild(deleteIcon);

    // Agregar botones a la celda
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    // Agregar celda de acciones a la fila
    fila.appendChild(actionCell);

    // Agregar fila al cuerpo de la tabla
    tbody.appendChild(fila);
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

// Función para agregar celda booleana (Si/No)
function agregarCeldaBooleana(fila, valor) {
    const col = document.createElement('td');

    // Texto simple para valores booleanos
    col.textContent = valor;

    // Aplicar estilo según el valor
    if (valor === 'Si') {
        col.className = 'text-success';
    } else if (valor === 'No') {
        col.className = 'text-danger';
    }

    fila.appendChild(col);
}

// Función para formatear fecha
function formatearFecha(fechaStr) {
    if (!fechaStr) return '';

    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Cargar Bootstrap Icons si no está cargado
function cargarBootstrapIcons() {
    if (!document.querySelector('link[href*="bootstrap-icons"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css';
        document.head.appendChild(link);
    }
}


// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function () {
    cargarBootstrapIcons();
    verificarTablaVacia();
});