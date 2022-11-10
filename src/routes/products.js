// ************ Require's ************
const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const { body } = require("express-validator");

// ************ Proceso para manejar archivos ************
// creo el storage donde se va a guardar la info.
const storage = multer.diskStorage({
  // Ubicacion
  destination: (req, file, cb) => {
    cb(null, "./public/images/productImages");
  },
  // Nombre
  filename: (req, file, cb) => {
    // numero unico con el Date.now, un _img y la extension del archivo original.
    let fileName = Date.now() + "_img" + path.extname(file.originalname);
    cb(null, fileName);
  },
});

// Constatnte donde genero el metodo a usar para manejar archivos
const uploadFile = multer({ storage });

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

router.put("/:id", uploadFile.single("image"), productsControllers.update);

router.get("/detalles/:id", productsControllers.detalles);

router.get("/crear", productsControllers.create);

router.post("/", uploadFile.single("image"), productsControllers.store);

router.get("/edit/:id", productsControllers.edit);

router.delete("/:id", productsControllers.destroy);

module.exports = router;
