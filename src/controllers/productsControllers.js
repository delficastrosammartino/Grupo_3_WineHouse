// libreria de node para leer y obtener archivos.
const fs = require('fs');
// libreria para concatenar y obtener rutas.
const path = require('path');


const productsControllers = {
    products : (req, res) => {
        res.render('/products/products');
    },

    detalles : (req, res) => {
        res.render('./products/detalles');
    }

}

module.exports = productsControllers;