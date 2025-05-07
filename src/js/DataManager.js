export default class DataManager {
    constructor(KeySession) {
        this.KeySession = KeySession
        this.dbSession = JSON.parse(sessionStorage.getItem(this.KeySession)) || []
        //this.data = this.dbSession ? JSON.parse(this.dbSession) : {}; // Inicializa data como un objeto vacío si no hay datos en sessionStorage
    }
    //grud
    // Create
    createData(objArticulo) {
        this.dbSession.push(objArticulo) // Agrega el nuevo objeto al array de datos
        sessionStorage.setItem(this.KeySession, JSON.stringify(this.dbSession)) // Guarda el array actualizado en sessionStorage
    }
    readData() {
        return this.dbSession // Devuelve el array de datos almacenado en sessionStorage
    } 
    // Update
    updateData(id, objArticulo) {
        this.dbSession = this.dbSession.map(articulo => {
            if (articulo.id === id) { // Si el id coincide, actualiza el objeto
                return { ...articulo, ...objArticulo } // Devuelve un nuevo objeto con las propiedades actualizadas
            }
            return articulo // Si no coincide, devuelve el objeto original
        })
        sessionStorage.setItem(this.KeySession, JSON.stringify(this.dbSession))
        /*
        const index = this.dbSession.findIndex(item => item.id === id) // Busca el índice del objeto con el id proporcionado
        if (index !== -1) { // Si se encuentra el objeto
            this.dbSession[index] = objArticulo // Actualiza el objeto en el array
            sessionStorage.setItem(this.KeySession, JSON.stringify(this.dbSession)) // Guarda el array actualizado en sessionStorage
        }
            */
    }

    // Delete   
    deleteData(id) {
        this.dbSession = this.dbSession.filter(articulo => articulo.id !== id) // Filtra el array para eliminar el objeto con el id proporcionado
        sessionStorage.setItem(this.KeySession, JSON.stringify(this.dbSession)) // Guarda el array actualizado en sessionStorage            

        /*
        const index = this.dbSession.findIndex(item => item.id === id) // Busca el índice del objeto con el id proporcionado
        if (index !== -1) { // Si se encuentra el objeto
            this.dbSession.splice(index, 1) // Elimina el objeto del array
            sessionStorage.setItem(this.KeySession, JSON.stringify(this.dbSession)) // Guarda el array actualizado en sessionStorage
        }
            */
    }

    clear() {
        sessionStorage.removeItem(this.KeySession); // Elimina el item del sessionStorage
        sessionStorage.setItem(this.KeySession, JSON.stringify(this.dbSession));
    }
}

