// ************ Require's ************
const express = require("express");
const router = express.Router();
const multer = require("multer");

// ************ Middlewares ***********
const uploadProductFile = require("../middlewares/multerProductos");
const adminPageMiddleware = require("../middlewares/adminPageMiddleware");
const createProductMiddleware = require("../middlewares/createProdMiddleware");
const productsFindAllMiddleware = require("../middlewares/productsFindAllMiddleware");
const productsIdVisible = require("../middlewares/productsIdVisibleMiddleware");

// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const productsControllers = require("../controllers/productsControllers");

//Rutas para la creación del CRUD
router.get("/", productsControllers.productsDB);
router.get("/detalles/:id", productsIdVisible, productsControllers.detallesDB);
router.get("/crear", adminPageMiddleware, productsControllers.create);
//uploadProductFile.single("image"),
// Primero va el multer y despues el createProductMiddleware, al reves no funciona!!!!!
router.post(
  "/",
  productsFindAllMiddleware,
  uploadProductFile,
  createProductMiddleware,
  productsControllers.storeDB
);
// aca falta aplicar los middlewares de admin, para que solo tengan permiso ellos
// lo comente para codear y probar mas comodo
//adminPageMiddleware,
router.get("/edit/:id", productsIdVisible, adminPageMiddleware, productsControllers.edit);
// uploadProductFile.single("image")
router.put(
  "/detalles/:id",
  productsFindAllMiddleware,
  uploadProductFile,
  createProductMiddleware,
  productsControllers.updateDB
);

// aca falta aplicar los middlewares de admin, para que solo tengan permiso ellos
//adminPageMiddleware,
router.get("/delete/:id", adminPageMiddleware, productsControllers.delete);
router.delete("/delete/:id", productsControllers.destroy);

router.get("/carrito", productsControllers.carrito);

router.get("/:id/image", productsControllers.imagenProducts);
module.exports = router;
