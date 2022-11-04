// libreria de node para leer y obtener archivos.
const fs = require('fs');
// libreria para concatenar y obtener rutas.
const path = require('path');


const mainControllers = {
    index : (req, res) => {
        res.render('./products/index');
    },

    carrito : (req, res) => {
        res.render('./products/carrito');
    },

    detalles : (req, res) => {
        res.render('./products/detalles');
    },


}

module.exports = mainControllers;