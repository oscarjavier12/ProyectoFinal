import buttons from "./buttons.js";
document.addEventListener('DOMContentLoaded', function () {
    const rango = document.getElementById('productCantidad');
    rango.addEventListener('input', function () {
        // net es el siguiente elemento
        this.nextElementSibling.value = this.value;
    });
    let datosCeldas = [];

    const cuerpo = document.getElementById('productTable')
    cuerpo.addEventListener('click', function (event) {

        if (event.target.id === 'btnEditar') {
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
                buttons.botones.btnSave.ruta,
                buttons.botones.btnSave.title
            );
            const deleteButton = rowEditar.querySelector('#btnEliminar');
            buttons.cambioBtnSinEvent(
                deleteButton,
                buttons.botones.btnCancel.id,
                buttons.botones.btnCancel.ruta,
                buttons.botones.btnCancel.title
            );

            return;
        }
        if (event.target.id === 'btnGuardar') {
            const rowSave = event.target.closest('tr');
            const cajitaTexto = rowSave.querySelectorAll('input');

            cajitaTexto.forEach((input, index) => {
                if (index < cajitaTexto.length) {
                    const valorNuevo = input.value;
                    input.parentNode.textContent = valorNuevo;
                }
            });

            buttons.cambioBoton(
                event,
                buttons.botones.btnEdit.id,
                buttons.botones.btnEdit.ruta,
                buttons.botones.btnEdit.title
            );
            const cancelarBoton = rowSave.querySelector('#btnCancelar');
            buttons.cambioBtnSinEvent(
                cancelarBoton,
                buttons.botones.btnDelete.id,
                buttons.botones.btnDelete.ruta,
                buttons.botones.btnDelete.title
            );

            return;
        };
        if (event.target.id === 'btnCancelar') {
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
                buttons.botones.btnDelete.ruta,
                buttons.botones.btnDelete.title

            );
            const guardarBoton = rowCancel.querySelector('#btnGuardar');
            buttons.cambioBtnSinEvent(
                guardarBoton,
                buttons.botones.btnEdit.id,
                buttons.botones.btnEdit.ruta,
                buttons.botones.btnEdit.title
            );
            return;
        }
        if (event.target.id.startsWith('btnEliminar')) {
            const rowDelete = event.target.closest('tr');
            rowDelete.remove();

            if (cuerpo.children.length === 0) {
                ocultarTablaProductos();
            }
        };
    });
});

function ocultarTablaProductos() {
    const listProduct = document.getElementById('productTable')
    listProduct.style.display = 'none';
};

function mostarTablaProductos() {
    const product = document.getElementById('productTable')
    product.style.display = 'block';
};


const form = document.getElementById('productForm');
form.addEventListener('submit', function (event) {
    //validacion de envio
    event.preventDefault();
    //boostrop
    if (!this.checkVisibility()) {
        this.classList.add('was-validated');
        return;
    }
    //recuperar los datos del formulario
    const formData = new FormData(this);
    //acceder al dom del tbodu
    const tbody = document.getElementById('productTableBody');
    mostarTablaProductos();
    agregarFIlaTabla(formData, tbody);


})

const agregarFIlaTabla = (formData, tbody) => {
    
    const fila = document.createElement('tr');
    agregarCelda(fila, formData.get('productName'));
    agregarCelda(fila, formData.get('productCategory'));
    agregarCelda(fila, formData.get('productPrice'));
    agregarCelda(fila, formData.get('productDate'));
    agregarCelda(fila, formData.get('productDescription'));
    agregarCelda(fila, formData.get('productCantidad'));

    agregarCelda(fila, formData.get('productFeatured'));

    agregarCelda(fila, formData.get('productAvailability'));

    const actionCell = document.createElement('td');
    const editButton = document.createElement('img');
    const deleteButton = document.createElement('img')


    buttons.crearBotonesAcciones(
        actionCell,
        editButton,
        buttons.botones.btnEdit.id,
        buttons.botones.btnEdit.ruta,
        buttons.botones.btnEdit.title
    );
    buttons.crearBotonesAcciones(
        actionCell,
        deleteButton,
        buttons.botones.btnDelete.id,
        buttons.botones.btnDelete.ruta,
        buttons.botones.btnDelete.title
    );

    fila.appendChild(actionCell)
    tbody.appendChild(fila);
};

function agregarCelda(fila, valor) {
    const col = document.createElement('td');
    if (valor === 'Si') {
        valor = '✔️';
    }
    if (valor === null) {
        valor = '❌';
    }
    col.textContent = valor;
    fila.appendChild(col);
}
