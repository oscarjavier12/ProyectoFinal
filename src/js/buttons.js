// crear los botones con formato json
const botones = {
    btnEdit: {
        id: 'btnEditar',
        iconClass: 'bi bi-pencil-square',
        title: 'Editar',
        clase: 'btn-outline-primary'
    },
    btnSave: {
        id: 'btnGuardar',
        iconClass: 'bi bi-check2-circle',
        title: 'Guardar',
        clase: 'btn-outline-success'
    },
    btnDelete: {
        id: 'btnEliminar',
        iconClass: 'bi bi-trash',
        title: 'Eliminar',
        clase: 'btn-outline-danger'
    },
    btnCancel: {
        id: 'btnCancelar',
        iconClass: 'bi bi-x-circle',
        title: 'Cancelar',
        clase: 'btn-outline-secondary'
    }
}

function crearBotonesAcciones(celda, boton, id, iconClass, titulo, clase) {
    boton.id = id;
    boton.title = titulo;
    boton.className = `btn btn-sm ${clase}`;

    // Crear el icono como elemento DOM
    const iconElement = document.createElement('i');
    iconElement.className = iconClass;
    boton.appendChild(iconElement);

    celda.appendChild(boton);
}

function cambioBoton(event, id, iconClass, titulo, clase) {
    if (event.target) {
        const boton = event.target.closest('button');
        if (boton) {
            boton.id = id;
            boton.title = titulo;
            boton.className = `btn btn-sm ${clase}`;

            // Limpiar el botón y agregar el nuevo icono
            boton.innerHTML = '';  // Necesario para eliminar el icono previo
            const iconElement = document.createElement('i');
            iconElement.className = iconClass;
            boton.appendChild(iconElement);
        }
    }
}

function cambioBtnSinEvent(boton, id, iconClass, titulo, clase) {
    if (boton) {
        boton.id = id;
        boton.title = titulo;
        boton.className = `btn btn-sm ${clase}`;

        // Limpiar el botón y agregar el nuevo icono
        boton.innerHTML = '';  // Necesario para eliminar el icono previo
        const iconElement = document.createElement('i');
        iconElement.className = iconClass;
        boton.appendChild(iconElement);
    }
}

export default { botones, crearBotonesAcciones, cambioBoton, cambioBtnSinEvent };