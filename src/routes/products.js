// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const productsControllers = require('../controllers/productsControllers');

router.get('/', productsControllers.products);

router.get('/detalles', productsControllers.detalles);


module.exports = router;