const { check, body } = require("express-validator");

const createProductMiddleware =

  // validacion de express-validation con la funcion body.
  [
    // recibe el nombre del campo a validar.
    body("name")
        .notEmpty()
        .withMessage("Tienes que escribir un producto")
        .bail()
        .isLength({ min: 3, max: 30 })
        .withMessage("El nombre no cumple con el largo permitido"),
    body("price")
        .notEmpty()
        .withMessage("El precio debe ser mayor a 0")
        .bail()
        .isFloat({ min: 0, max: 10000000 })
        .withMessage("El precio debe ser un número positivo y tener menos de 7 dígitos"),
    body("discount")
      // el bail () es para cortar si encuentra el error.
      .notEmpty()
      .withMessage("Tiene que ser un numero entre 0 y 100")
      .bail()
      .isNumeric()
      .withMessage("El descuento debe ser un número")
      .bail()
      .isFloat({ min: 0, max: 100 })
      .withMessage("El descuento debe ser un entero entre 0 y 100"),
    body("size")
      .notEmpty()
      .withMessage("Debe seleccionar el tamaño"),
    body("bodega")
      .notEmpty()
      .withMessage("Debe seleccionar la bodega"),
    body("province")
      .notEmpty()
      .withMessage("Debe seleccionar la provincia"),
    body("category")
      .notEmpty()
      .withMessage("Debe seleccionar la categoria"),
    body("descripcion")
      .notEmpty()
      .withMessage("Tienes que escribir una descripcion")
      .bail()
      .isLength({ min: 3, max: 200 })
      .withMessage("La descripcion no cumple con el largo permitido"),
    
  ];

module.exports = createProductMiddleware;


// OTRA OPCION; TAMPOCO FUNCIONA
/* const db = require("../database/models");

const createProdMiddleware = (req, res, next) => {
    const { name, price, discount, size, bodega, province, descripcion, image } = req.body;
    const errors = {};
  
    // Validaciones
    console.log("1")
    if (!name || name.length < 3) {
        console.log("2")
        errors.name = 'El nombre es requerido y debe tener al menos 3 caracteres';
    }
    if (isNaN(price) || price <= 0) {
        console.log("3")
        errors.price = 'El precio debe ser un número mayor a cero';
    }
    if (isNaN(discount) || discount < 0 || discount > 100) {
        console.log("4")
        errors.discount = 'El descuento debe ser un número entre 0 y 100';
    }
    if (!size) {
        console.log("5")
        errors.size = 'Debes seleccionar un tamaño';
    }
    if (!bodega) {
        console.log("6")
        errors.bodega = 'Debes seleccionar una bodega';
    }
    if (!province) {
        console.log("7")
        errors.province = 'Debes seleccionar una provincia';
    }
    if (!descripcion || descripcion.length < 6) {
        console.log("7")
        errors.descripcion = 'Debes describir el producto';
    }
    console.log(Object.keys(errors))
    // Si hay errores, redirigir a la página con los mensajes de error
    if (Object.keys(errors).length > 0) {
        console.log("9")
        console.log(errors)
         // guardo las busquedas que trabajan de manera asincronica.
    let bodegas = db.Bodega.findAll()
    let provinces = db.Province.findAll()
    let sizes = db.Size.findAll()
    let categories = db.ProductCategory.findAll()

    // el Promise sirve para que entre aca una vez que termina los findAll anteriores
    Promise.all([bodegas, provinces, sizes, categories])

      .then(([bodegas, provinces, sizes, categories]) => {
        return res.render("./products/crear-producto", {bodegas, provinces, sizes, categories, errors, oldData: req.body});
      })
 

    
    }
  
    // Si no hay errores, continuar con la ejecución de la ruta
    next();
  };

  module.exports = createProdMiddleware*/
  