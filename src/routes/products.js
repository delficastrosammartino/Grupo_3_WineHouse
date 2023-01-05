// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Middlewares ***********
const uploadProductFile = require("../middlewares/multerProductos");
const adminPageMiddleware = require("../middlewares/adminPageMiddleware");
// validacion de express-validation con la funcion body.
// const validations = [
//     body("name")
//         .notEmpty().withMessage("Tienes que indicar el nombre del producto"),
//     body("price")
//         .notEmpty().withMessage("Tienes que indicar el precio del producto"),
//     body("discount")
//         .notEmpty().withMessage("Tienes que indicar si hay un descuento, en caso contrario indicar 0"),
//     body("size")
//         .notEmpty().withMessage("Tienes que indicar el tamaño del producto"),
//     body("bodega")
//         .notEmpty().withMessage("Tienes que indicar la bodega del producto"),
//     body("provincia")
//         .notEmpty().withMessage("Tienes que indicar la provincia del producto"),
//     body("")
//         .notEmpty().withMessage(),
//     body("description")
//         .notEmpty().withMessage("Tienes que darle una descripción al producto"),
//     body("")
//         .notEmpty().withMessage()
// ]

// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const productsControllers = require("../controllers/productsControllers");

router.get("/", productsControllers.products);

router.put(
  "/:id",
  uploadProductFile.single("image"),
  productsControllers.update
);

router.get("/detalles/:id", productsControllers.detalles);

router.get("/crear", 
//adminPageMiddleware, 
productsControllers.create);

router.post(
  "/",
  //uploadProductFile.single("image"),
  productsControllers.store
);

router.get("/edit/:id", adminPageMiddleware, productsControllers.edit);

router.delete("/:id", productsControllers.destroy);

module.exports = router;
