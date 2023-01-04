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
        if (userToLogin) {
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
                maxAge: 1000 * 60 * 2,
              }); // 1000 es un segundo. En este caso dura 2 minutos.
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
  /*let userToLogin = users.find((user) => user.email == req.body.email);
    if (userToLogin) {
      let passwordOk = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (passwordOk) {
        //delete userToLogin.password; PREGUNTAR PORQUE CUANDO HACES LOGOUT DESAPARECE LA CONTRASEÑA
        req.session.userLogged = userToLogin;
        if (req.body.rememberme) {
          // el primer valor es el nombre de la cookie, el segundo el valor que se le asigna, y el tercero el tiempo que va a estar almacenada.
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 2 }); // 1000 es un segundo. En este caso dura 2 minutos.
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
    return res.render("users/login", {
      errors: {
        email: {
          msg: "El email no se encontró",
        },
      },
    });
  },

  db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((userToLogin) => {
        if (userToLogin) {
          let comparacion = bcrypt.compareSync(
            req.body.password,
            userToLogin.password
          );

          if (comparacion) {
            req.session.userToLogin = {
              ...userToLogin["dataValues"],
              password: "",
            };

            if (req.body.remindme) {
              res.cookie(
                "recordame",
                { ...userToLogin["dataValues"], password: "" },
                { maxAge: 1000 * 60 * 60 * 24 }
              );
            }

            res.redirect("/");
          } else {
            res.render("users/login", {
              errors: { msg: "Credenciales incorrectas" },
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);

        res.render("users/login", {
          error: { msg: "Credenciales incorrectas" },
        });
      });*/

  // LOGICA LOGOUT
  logout: function (req, res) {
    //res.cookie("recordame", "", { maxAge: 0 });
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/users/login");
  },
  registro: (req, res) => {
    res.render("./users/registro");
  },

  /* processRegister: (req, res) => {
    // resultValidation es un objeto que tiene una propiedad errors usada abajo.
    const resultValidation = validationResult(req);
    console.log(resultValidation);
    // si hay errores entra aca.
    if (resultValidation.errors.length > 0) {
      // renderizo la vista registro, y le paso los errores.
      return res.render("./users/registro", {
        // uso el .mapped para que cada elemento (nombre, apellido, email y password) sea un elemento del objeto y tenga sus propiedades dentro.
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    let userInDB = users.find((user) => user.email === req.body.email);

    if (userInDB) {
      // Enviar un mensaje de error
      return res.render("./users/registro", {
        errors: {
          email: {
            msg: "El email ya está registrado",
          },
        },
        oldData: req.body,
      });
    }
    // Creo la variable nuevo newUser, es importante que id sea unico e irrepetible.
    let newUser = {
      id: Date.now(),
      name: req.body.nombre,
      lastName: req.body.apellido,
      email: req.body.email,
      // encripto contraseña, el 10 se pone, es para que tenga un minimo de dificultad
      password: bcrypt.hashSync(req.body.password, 10),
      category: " ",
      image: " ", //req.file.filename,
      adress: " ",
      userName: " ",
    };
    // Pusheo en el array users
    users.push(newUser);
    // Lo guardo en productsFilePath es la ruta que puse mas arriba, lo convierto en string para poder guardar en el json, eso hace el stringify
    // Le mando products, el null y el " " son para orden, salto de linea o algo asi.
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
    // vulevo a /
    res.redirect("/users/login");
  },*/
  processRegister: (req, res) => {
    // resultValidation es un objeto que tiene una propiedad errors usada abajo.
    const resultValidation = validationResult(req);
    console.log(resultValidation);
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
        email: req.body.email
      }
    })
      .then((user) => {
      if (user) {
        // si se encontró un usuario, mostrar un mensaje de error y devolver la vista de registro con los campos completados
        res.render("./users/registro", {
          errors: {
            email: {
              msg: "Este email ya está registrado"
            }
          },
          oldData: req.body,
        });
      } else {
        // si no se encontró ningún usuario, permitir que el usuario complete el registro
        db.User.create({
          name: req.body.nombre,
        lastName: req.body.apellido,
        email: req.body.email,
        // encripto contraseña, el 10 se pone, es para que tenga un minimo de dificultad
        password: bcrypt.hashSync(req.body.password, 10),
        category_id: 1,
        //image: " ", //req.file.filename,
        //adress: " ",
        //userName: " ",
        })
        res.redirect("/users/login")
      }
    });
  },
  password: (req, res) => {
    res.render("./users/password");
  },
  perfil: (req, res) => {
    return res.render("./users/perfil", { user: req.session.userLogged });
  },
  perfilDB: (req, res) => {
    console.log(req.session.userLogged)
    db.User.findOne({
      where: {
        email: req.session.userLogged.email
      }
    })
    .then((user) => {
      res.render('users/perfil', {user: user});
    })
    .catch(function (error) {
      
      console.log(error);

      res.render("users/perfil", {
        error: { msg: "Algo salio mal" },
      });
    });

    
  },
  editUser: (req, res) => {
    db.User.findOne({
      where: {
        email: req.session.userLogged.email
      }
    })
    .then((user) => {
      res.render('users/editar-perfil', {user: user});
    })
    .catch(function (error) {
      
      console.log(error);

      res.render("users/perfil", {
        error: { msg: "Algo salio mal" },
      });
    });

    
  }
};

module.exports = usersControllers;
