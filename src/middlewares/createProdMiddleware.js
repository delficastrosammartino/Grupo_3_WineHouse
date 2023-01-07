


const { body } = require("express-validator");

// validacion de express-validation con la funcion body.
const createProductvalidations = [
    body("name")
        .notEmpty().withMessage("Tienes que indicar el nombre del producto"),
    body("price")
        .notEmpty().withMessage("Tienes que indicar el precio del producto"),
    body("discount")
        .notEmpty().withMessage("Tienes que indicar si hay un descuento, en caso contrario indicar 0"),
    body("size")
        .notEmpty().withMessage("Tienes que indicar el tamaño del producto"),
    body("bodega")
        .notEmpty().withMessage("Tienes que indicar la bodega del producto"),
    body("province")
        .notEmpty().withMessage("Tienes que indicar la provincia del producto"),
    body("")
        .notEmpty().withMessage(),
    body("descripcion")
        .notEmpty().withMessage("Tienes que darle una descripción al producto"),
    body("")
        .notEmpty().withMessage()
 ]

module.exports = createProductvalidations