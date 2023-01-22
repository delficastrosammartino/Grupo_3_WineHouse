// ************ Require's ************
const express = require("express");
const router = express.Router();
const multer = require ("multer")

// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const usersControllers = require("../controllers/usersControllers");

// ************ Middlewares ***********
const registerValidate = require("../middlewares/registrationValidate");
const loginValidate = require("../middlewares/loginValidate");
const userPageMiddleware = require("../middlewares/userPageMiddleware");
const guestPageMiddleware = require("../middlewares/guestPageMiddleware");
const uploadUserFile = require("../middlewares/multerUsuarios");


// ************ Rutas ************
router.get("/login", guestPageMiddleware, usersControllers.login);
router.post("/login", loginValidate, usersControllers.processLogin);
router.get("/logout", userPageMiddleware, usersControllers.logout);
router.get("/registro", guestPageMiddleware, usersControllers.registro);
router.post("/registro", registerValidate, usersControllers.processRegister);
router.get("/perfil", userPageMiddleware, usersControllers.perfil);
router.put('/perfil', registerValidate, uploadUserFile, usersControllers.updateUser);
router.get("/password", guestPageMiddleware, usersControllers.password);
router.get("/editar-perfil", userPageMiddleware, usersControllers.editUser);
//router.delete('/eliminar',usersController.delete);

module.exports = router;

/*
// ************ Require's ************




router.get ('/avatar', userMiddleware.guest, usersController.avatar);
router.get ('/direcciones', userMiddleware.guest, usersController.direcciones);
router.get ('/direcciones/crear', userMiddleware.guest, usersController.crearDireccion);
router.get ('/pagos', userMiddleware.guest, usersController.pagos);
router.get ('/pagos/crear', userMiddleware.guest, usersController.crearPago);

module.exports = router;
*/
