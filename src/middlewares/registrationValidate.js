const { check, body } = require("express-validator");

const registerValidate =
  /*[
    check('name').isLength({min:2}).withMessage('Debes ingresar tu nombre.'),
    check('apellido').isLength({min:2}).withMessage('Debes ingresar tu apellido.'),
    check('email').isEmail().withMessage('Debes ingresar un e-mail válido.'),
    check('password').isStrongPassword().withMessage('La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 caracter especial. EJ: "Hola123!"'),
    body('confirmarPassword')
        .custom(function(value, {req}) {
            if (value == req.body.password) {
                return true;
            } else {
                throw new Error('Las contraseñas ingresadas deben coincidir. Intentá nuevamente.');
            }
        })
  ]*/

  // validacion de express-validation con la funcion body.
  [
    // recibe el nombre del campo a validar.
    body("nombre")
      .notEmpty()
      .withMessage("Tienes que escribir un nombre")
      .bail()
      .isLength({ min: 3, max: 30 })
      .withMessage("El nombre no cumple con el largo permitido"),
    body("apellido")
      .notEmpty()
      .withMessage("Tienes que escribir un apellido")
      .bail()
      .isLength({ min: 3, max: 30 })
      .withMessage("El nombre no cumple con el largo permitido"),
    body("email")
      // el bail () es para cortar si encuentra el error.
      .notEmpty()
      .withMessage("Tienes que escribir un email")
      .bail()
      .isEmail()
      .withMessage("El email no es valido"),
    body("password")
      .notEmpty()
      .withMessage("Tienes que escribir una contraseña")
      .bail()
      .isLength({ min: 6, max: 20 })
      .withMessage("min 6, max 20 caracteres")
      .bail()
      .matches(/^(.*\d.*)$/)
      .withMessage("Debe contener al menos un simbolo")
      .bail()
      .matches(/^(.*[A-Z].*)$/)
      .withMessage("Debe contener al menos una mayúscula")
      .bail()
      .matches(/^(.*[a-z].*)$/)
      .withMessage("Debe contener al menos una minúscula"),
  ];

module.exports = registerValidate;
