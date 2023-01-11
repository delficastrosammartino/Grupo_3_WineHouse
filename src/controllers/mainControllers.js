// libreria de node para leer y obtener archivos.
const fs = require('fs');
// libreria para concatenar y obtener rutas.
const path = require('path');


const mainControllers = {
    index : (req, res) => {
        res.render('./products/index');
    }

}

module.exports = mainControllers;