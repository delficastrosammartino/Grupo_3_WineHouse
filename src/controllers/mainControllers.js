// libreria de node para leer y obtener archivos.
const fs = require('fs');
// libreria para concatenar y obtener rutas.
const path = require('path');
const db = require('../database/models');


const mainControllers = {
    bodegas: function(req, res) {
        res.render('./products/bodegas-info');
        },

    nosotros: function(req, res) {
        res.render('./users/nosotros');
        },

    index : (req, res) => {
    db.Product.findAll({
        include: [
            { association: "products_categories" },
            { association: "bodega" },
            { association: "province" },
            { association: "size" },
            { association: "images" },
          ],
        order : [['price', 'DESC']],
        limit: 4
    })
    .then((products) => {
        res.render("./products/index", { products });
        });

    }

    
}

module.exports = mainControllers;