// ************ Require's ************
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require ("path");
const { body } = require ("express-validator")


// ************ Proceso para manejar archivos ************
// creo el storage donde se va a guardar la info.
const storage = multer.diskStorage({
// Ubicacion
    destination: (req, file, cb) => {
        cb(null, "../../public/images/avatars")
    },
// Nombre
    filename: (req, file, cb) => {
// numero unico con el Date.now, un _img y la extension del archivo original. 
        let fileName = Date.now() + "_img" + path.extname(file.originalname)
        cb(null, fileName)
    }
})

// Constatnte donde genero el metodo a usar para manejar archivos
const uploadFile = multer ({ storage })

// validacion de express-validation con la funcion body.
const validations = [
// recibe el nombre del campo a validar.
    body("nombre").notEmpty().withMessage("Tienes que escribir un nombre"),
    body("apellido").notEmpty().withMessage("Tienes que escribir un apellido"),
    body("email").notEmpty().withMessage("Tienes que escribir un email valido"),
    body("password").notEmpty().withMessage("Tienes que escribir una contraseña"),
]



// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const usersControllers = require('../controllers/usersControllers');



router.get('/login', usersControllers.login);

// ************ Formulario de registro ************
router.get('/registro', usersControllers.registro);

// ************ Procesar el registro ************
// ES IMPORTANTE PONER EN EL ARCHIVO .ejs, EN EL INPUT DE FORMULARIO PARA SUBIR ARCHIVOS, EL name="avatar".
router.post('/registro', uploadFile.single ("avatar"), validations,  usersControllers.processRegister);


router.get('/password', usersControllers.password);

module.exports=router;