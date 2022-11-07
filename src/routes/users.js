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
    body("nombre")
        .notEmpty().withMessage("Tienes que escribir un nombre").bail()
        .isLength({ min: 3, max:30 }).withMessage("El nombre no cumple con el largo permitido"),
    body("apellido")
        .notEmpty().withMessage("Tienes que escribir un apellido").bail()
        .isLength({ min: 3, max:30 }).withMessage("El nombre no cumple con el largo permitido"),
    body("email")
// el bail () es para cortar si encuentra el error.
        .notEmpty().withMessage("Tienes que escribir un email").bail()
        .isEmail().withMessage("El email no es valido"),
    body("password")
        .notEmpty().withMessage("Tienes que escribir una contraseña").bail()
        .isLength({ min : 6, max: 20 }).withMessage("min 6, max 20 caracteres").bail()
        .matches(/^(.*\d.*)$/).withMessage("Debe contener al menos un simbolo").bail()
        .matches(/^(.*[A-Z].*)$/).withMessage("Debe contener al menos una mayúscula").bail()
        .matches(/^(.*[a-z].*)$/).withMessage("Debe contener al menos una minúscula")
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