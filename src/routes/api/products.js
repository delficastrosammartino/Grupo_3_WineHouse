const express = require("express");
const router = express.Router();
const productsControllers = require("../../controllers/api/productsControllers");

router.get("/", productsControllers.list);
router.get("/detalles/:id", productsControllers.detail);
router.get("/:id/image", productsControllers.imagenProducts);
//router.get ("/:id", genresController.detail)
module.exports = router;
