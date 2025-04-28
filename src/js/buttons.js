// crear los botones con formato json
const botones = {
    btnEdit: {
        'id': 'btnEditar',
        'clasName': 'btn-img',
        'ruta': './src/assets/icon/edit.png',
        'title': 'Editar',
        'alt': 'Editar'
    },
    btnDelete: {
        'id': 'btnEliminar',
        'clasName': 'btn-img',
        'ruta': './src/assets/icon/delete.png',
        'title': 'Eliminar',
        'alt': 'Eliminar'
    },
    btnSave: {
        'id': 'btnGuardar',
        'clasName': 'btn-img',
        'ruta': './src/assets/icon/update.png',
        'title': 'Guardar',
        'alt': 'Guardar'
    },
    btnCancel: {
        'id': 'btnCancelar',
        'clasName': 'btn-img',
        'ruta': './src/assets/icon/cancel.png',
        'title': 'Cancelar',
        'alt': 'Cancelar'
    }

}

function crearBotonesAcciones(celda, nameImg, id, ruta, titulo) {
    nameImg.id = id;
    nameImg.src = ruta;
    nameImg.title = titulo;
    nameImg.alt = titulo;
    nameImg.clasName = 'btn-img';
    celda.appendChild(nameImg);

};
function cambioBoton(event, id, ruta, titulo) {
    if (event.target) {
        event.target.id = id;
        event.target.src = ruta;
        event.target.title = titulo;
        event.target.alt = titulo;
    }
}
function cambioBtnSinEvent(boton, id, ruta, titulo) {
    if (boton) {
        boton.id = id;
        boton.src = ruta;
        boton.title = titulo;
        boton.alt = titulo;
    }

}

export default { botones, crearBotonesAcciones, cambioBoton, cambioBtnSinEvent };


