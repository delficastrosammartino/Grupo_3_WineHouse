// ************ Require's ************
const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const { body, validationResult } = require("express-validator");
const usersControllers = require("../controllers/usersControllers");
const registrationValidate = require("../../public/middlewares/registrationValidate");
const userMiddleware = require("../../public/middlewares/userMiddleware");

const storage = multer.diskStorage({
  // Ubicacion
  destination: (req, file, cb) => {
    cb(null, "../../public/images/avatars");
  },
  // Nombre
  filename: (req, file, cb) => {
    // numero unico con el Date.now, un _img y la extension del archivo original.
    let fileName = Date.now() + "_img" + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const uploadFile = multer({ storage });

router.get("/login", usersControllers.login, userMiddleware.registered);
router.post("/login", usersControllers.processLogin);
router.get("/registro", usersControllers.registro);
router.post(
  "/registro",
  uploadFile.single("avatar"),
  registrationValidate,
  usersControllers.processRegister
);
router.get("/password", usersControllers.password);

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
