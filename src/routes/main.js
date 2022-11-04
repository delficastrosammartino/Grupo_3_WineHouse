// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const mainControllers = require('../controllers/mainControllers');


router.get('/', mainControllers.index);

router.get('/carrito', mainControllers.carrito);

module.exports = router;