// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Middlewares ***********
const uploadProductFile = require("../middlewares/multerProductos");
const adminPageMiddleware = require("../middlewares/adminPageMiddleware");
const createProductMiddleware = require("../middlewares/createProdMiddleware");

// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const productsControllers = require("../controllers/productsControllers");

router.get("/", productsControllers.productsDB);

router.put(
  "/:id",
  uploadProductFile.single("image"),
  productsControllers.update
);

router.get("/detalles/:id", productsControllers.detallesDB);

router.get("/crear", 
//adminPageMiddleware, 
productsControllers.create);

router.post(
  "/",
  //uploadProductFile.single("image"),
  //createProductMiddleware,
  productsControllers.storeDB
);

router.get("/edit/:id", adminPageMiddleware, productsControllers.edit);

router.delete("/:id", productsControllers.destroy);

module.exports = router;
