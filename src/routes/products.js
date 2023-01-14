// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Middlewares ***********
const uploadProductFile = require("../middlewares/multerProductos");
const adminPageMiddleware = require("../middlewares/adminPageMiddleware");
const createProductMiddleware = require("../middlewares/createProdMiddleware");
const productsFindAllMiddleware = require("../middlewares/productsFindAllMiddleware");
const productsIdVisible = require("../middlewares/productsIdVisibleMiddleware")

// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const productsControllers = require("../controllers/productsControllers");

//Rutas para la creación del CRUD
router.get("/", productsControllers.productsDB);
router.get("/detalles/:id", productsIdVisible, productsControllers.detallesDB);
router.get("/crear", productsControllers.create);
//uploadProductFile.single("image"),
// createProductMiddleware, no funciona, todavia no se por que
router.post(
  "/",
  productsFindAllMiddleware,
  createProductMiddleware,
  //uploadProductFile,
  productsControllers.storeDB
);
// aca falta aplicar los middlewares de admin, para que solo tengan permiso ellos
// lo comente para codear y probar mas comodo
//adminPageMiddleware,
router.get("/edit/:id", productsIdVisible, productsControllers.edit);
// uploadProductFile.single("image")
router.put(
  "/edit/:id",
  productsFindAllMiddleware,
  createProductMiddleware,
  // uploadProductFile,
  productsControllers.updateDB
);

// aca falta aplicar los middlewares de admin, para que solo tengan permiso ellos
//adminPageMiddleware,
router.get("/delete/:id", productsControllers.delete);
router.delete("/delete/:id", productsControllers.destroy);

router.get("/carrito", productsControllers.carrito);
module.exports = router;
