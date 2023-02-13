// libreria de node para leer y obtener archivos.
const fs = require("fs");
// libreria para concatenar y obtener rutas.
const path = require("path");
const { validationResult } = require("express-validator");
let bcrypt = require("bcryptjs");
const db = require("../database/models");

// indico la ruta de mi archivo .json, la abosulta.
const usersFilePath = path.join(__dirname, "../data/usersDB.json");
// primero lee el archivo mencionado en la linea de arriba y la guardo en un array. Guardo en un array los users del .json.
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersControllers = {
  // VISTA LOGIN
  login: function (req, res) {
    return res.render("users/login");
  },

  // LOGICA LOGIN
  processLogin: function (req, res) {
    // resultValidation es un objeto que tiene una propiedad errors usada abajo.
    const resultValidation = validationResult(req);
    // si hay errores entra aca.
    if (resultValidation.errors.length > 0) {
      // renderizo la vista login, y le paso los errores.
      return res.render("./users/login", {
        // uso el .mapped para que cada elemento (nombre, apellido, email y password) sea un elemento del objeto y tenga sus propiedades dentro.
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((userToLogin) => {
        if (userToLogin == null) {
          return res.render("users/login", {
            errors: {
              email: {
                msg: "El email no esta registrado",
              },
            },
            oldData: req.body,
          });
        } else {
          let passwordOk = bcrypt.compareSync(
            req.body.password,
            userToLogin.password
          );

          if (passwordOk) {
            //delete userToLogin.password; PREGUNTAR PORQUE CUANDO HACES LOGOUT DESAPARECE LA CONTRASEÑA
            req.session.userLogged = userToLogin;
            if (req.body.rememberme) {
              // el primer valor es el nombre de la cookie, el segundo el valor que se le asigna, y el tercero el tiempo que va a estar almacenada.
              res.cookie("userEmail", req.body.email, {
                maxAge: 1000 * 60 * 1,
              }); // 1000 es un segundo. En este caso dura 1 minuto.
            }

            return res.redirect("/");
          } else {
            return res.render("users/login", {
              errors: {
                password: {
                  msg: "La contraseña es incorrecta",
                },
              },
              oldData: req.body,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);

        res.render("users/login", {
          error: { msg: "Credenciales incorrectas" },
        });
      });
  },

  // LOGICA LOGOUT
  logout: function (req, res) {
    //res.cookie("recordame", "", { maxAge: 0 });
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/users/login");
  },

  // VISTA REGISTRO
  registro: (req, res) => {
    res.render("./users/registro");
  },

  // LOGICA DE REGISTRO
  processRegister: (req, res) => {
    // resultValidation es un objeto que tiene una propiedad errors usada abajo.
    const resultValidation = validationResult(req);
    // si hay errores entra aca.
    if (resultValidation.errors.length > 0) {
      // renderizo la vista registro, y le paso los errores.
      return res.render("./users/registro", {
        // uso el .mapped para que cada elemento (nombre, apellido, email y password) sea un elemento del objeto y tenga sus propiedades dentro.
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    // guardo las busquedas que trabajan de manera asincronica.
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        // si se encontró un usuario, mostrar un mensaje de error y devolver la vista de registro con los campos completados
        res.render("./users/registro", {
          errors: {
            email: {
              msg: "Este email ya está registrado",
            },
          },
          oldData: req.body,
        });
      } else {
        // si no se encontró ningún usuario, permitir que el usuario complete el registro
        db.User.create({
          name: req.body.name,
          lastName: req.body.lastName,
          email: req.body.email,
          // encripto contraseña, el 10 se pone, es para que tenga un minimo de dificultad
          password: bcrypt.hashSync(req.body.password, 10),
          category_id: 2,
          image: "",
          //adress: " ",
          //userName: " ",
        }).then(res.redirect("/users/login"));
      }
    });
  },

  // VISTA CONTRASEÑA
  password: (req, res) => {
    res.render("./users/password");
  },

  // VISTA PERFIL
  perfil: (req, res) => {
    db.User.findOne({
      where: {
        email: req.session.userLogged.email,
      },
    })
      .then((user) => {
        res.render("users/perfil", { user: user });
      })
      .catch(function (error) {
        console.log(error);

        res.render("users/perfil", {
          error: { msg: "Algo salio mal" },
        });
      });
  },

  // VISTA EDITAR PERFIL
  editUser: (req, res) => {
    db.User.findOne({
      where: {
        email: req.session.userLogged.email,
      },
    })
      .then((user) => {
        res.render("./users/editar-perfil", { user: user });
      })
      .catch(function (error) {
        console.log(error);

        res.render("users/perfil", {
          error: { msg: "Algo salio mal" },
        });
      });
  },

  // LOGICA EDITAR PERFIL
  updateUser: (req, res) => {
    // Busca el usuario en la base de datos
    db.User.findOne({
      where: {
        email: req.session.userLogged.email,
      },
    }).then((user) => {
      // Si no se encuentra el usuario, muestra un error.
      // esta parte del codigo no es necesaria por las validaciones y permisos que ya tenemos.
      if (!user) {
        return res.render("users/editar-perfil", {
          error: { msg: "El usuario no existe" },
        });
      }
      // Compara la contraseña y la confirmación de contraseña.
      if (req.body.password !== req.body.confirmPassword) {
        return res.render("users/editar-perfil", {
          errors: {
            password: {
              msg: "La contraseña y la confirmación de contraseña no coinciden",
            },
          },
          oldData: req.body,
          user: user,
        });
      }

      // Compara la contraseña del usuario con la contraseña almacenada en la base de datos.
      const passwordOk = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordOk) {
        return res.render("users/editar-perfil", {
          errors: {
            password: {
              msg: "La contraseña no coincide con la almacenada en la base de datos",
            },
          },
          oldData: req.body,
          user: user,
        });
      }

      let image = req.file ? req.file.filename : user.image;
      // LOGICA ACTUALIZAR USUARIO
      db.User.update(
        {
          name: req.body.name,
          lastName: req.body.lastName,
          // email: req.body.email,
          // Encripta la contraseña.
          // password: bcrypt.hashSync(req.body.password, 10),
          // category_id: 1,
          image: image,
          adress: req.body.adress,
          userName: req.body.userName,
        },
        {
          where: {
            email: req.session.userLogged.email,
          },
        }
      ).then((user) => {
        // Redirige al usuario al perfil después de actualizar.
        res.redirect("/users/perfil");
      });
    });
  },

  // VISTA AVATAR
  avatar: (req, res) => {
    db.User.findByPk(req.params.id, {
      attributes: ["id", "image"],
    }).then((user) => {
      res.render("./users/imagen", { user: user });
    });
  },

  // VISTA DIRECCIONES
  direcciones: function (req, res) {
    res.render("users/direcciones");
  },

  // VISTA PARA AGREGAR UNA DIRECCION
  crearDireccion: function (req, res) {
    res.render("users/crear-direccion");
  },

  // LOGICA BORRADO
  delete: (req, res) => {
    db.User.destroy({
      where: {
        email: req.session.userLogged.email,
      },
    })
      .then((resultado) => {
        res.cookie("recordame", "", { maxAge: 0 });
        req.session.destroy();
        res.redirect("/");
      })
      .catch((error) => {
        res.send(error);
      });
  },
};

module.exports = usersControllers;
