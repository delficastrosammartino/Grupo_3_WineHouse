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

//Rutas para la creación del CRUD
router.get("/", productsControllers.productsDB);
router.get("/detalles/:id", productsControllers.detallesDB);
router.get("/crear", productsControllers.create);
//uploadProductFile.single("image"),
// createProductMiddleware, mo funciona, todavia no se por que
router.post("/", productsControllers.storeDB);
// lo comente para codear y probar mas comodo
//adminPageMiddleware, 
router.get("/edit/:id", productsControllers.edit);
// uploadProductFile.single("image")
router.put("/update/:id", productsControllers.updateDB);

router.delete('/products/delete/:id', productsControllers.delete);

module.exports = router;
