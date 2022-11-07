// ************ Require's ************
const express = require('express');
const multer = require('multer');
const router = express.Router();


// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const usersControllers = require('../controllers/usersControllers');



router.get('/login', usersControllers.login);

// ************ Formulario de registro ************
router.get('/registro', usersControllers.registro);

// ************ Procesar el registro ************
router.post('/registro', usersControllers.processRegister);


router.get('/password', usersControllers.password);

module.exports=router;