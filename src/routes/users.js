// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
// establece los metodos para operar cada una de las rutas, la logica para resolver rutas.
const usersControllers = require("../controllers/usersControllers");

// ************ Middlewares ***********
const registerValidate = require("../middlewares/registrationValidate");
const loginValidate = require("../middlewares/loginValidate");
const userPageMiddleware = require("../middlewares/userPageMiddleware");
const guestPageMiddleware = require("../middlewares/guestPageMiddleware");
const uploadUserFile = require("../middlewares/multerUsuarios");

router.get("/login", guestPageMiddleware, usersControllers.login);
router.post("/login", loginValidate, usersControllers.processLogin);
router.get("/registro", guestPageMiddleware, usersControllers.registro);
router.post(
  "/registro",
  /* AGREGAR CUANDO SE PUEDA SUBIR FOTO  uploadUserFile.single("avatar"),*/
  registerValidate,
  usersControllers.processRegister
);
router.put('/perfil', registerValidate, usersControllers.updateUser);
router.get("/password", guestPageMiddleware, usersControllers.password);
router.get("/perfil", userPageMiddleware, usersControllers.perfilDB);
router.get("/logout", userPageMiddleware, usersControllers.logout);
router.get("/editar-perfil", userPageMiddleware, usersControllers.editUser);

module.exports = router;

/*
// ************ Require's ************

router.get ('/logout', usersController.logout);
router.get ('/register', userMiddleware.registered, usersController.register);
router.post('/register', registrationValidate, usersController.processRegister);
router.get ('/editar', userMiddleware.guest, usersController.editar);
router.patch ('/editar', usersController.modificacion);
router.get ('/perfil', userMiddleware.guest, usersController.perfil);
router.delete('/eliminar',usersController.delete);
router.get ('/avatar', userMiddleware.guest, usersController.avatar);
router.get ('/direcciones', userMiddleware.guest, usersController.direcciones);
router.get ('/direcciones/crear', userMiddleware.guest, usersController.crearDireccion);
router.get ('/pagos', userMiddleware.guest, usersController.pagos);
router.get ('/pagos/crear', userMiddleware.guest, usersController.crearPago);

module.exports = router;
*/
