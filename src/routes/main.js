const express = require('express');

const mainControllers = require('../controllers/mainControllers');

const router = express.Router();


router.get('/', mainControllers.index);

router.get('/carrito', mainControllers.carrito);

router.get('/detalles', mainControllers.detalles);

router.get('/login', mainControllers.login);

router.get('/registro', mainControllers.registro);

router.get('/password', mainControllers.password);


module.exports = router;