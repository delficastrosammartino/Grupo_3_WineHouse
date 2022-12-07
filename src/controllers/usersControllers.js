// libreria de node para leer y obtener archivos.
const fs = require("fs");
// libreria para concatenar y obtener rutas.
const path = require("path");
const { validationResult } = require("express-validator");
let bcrypt = require("bcryptjs");

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
    let errors = validationResult(req);

    let userToLogin = users.find((user) => user.mail == req.body.email);

    if (userToLogin) {
      let passwordOk = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (passwordOk) {
        delete userToLogin.password;
        req.session.userToLogin = userToLogin;

        //res.render("products/index", { userToLogin })

        return res.redirect("users/perfil");
      } else {
        res.render("users/login", {
          errors: { 
            password:{
              msg: "La contraseña es incorrecta" 
              }
            },
            oldData: req.body
        });
      };
    }; 
      return res.render("users/login", {
        errors: { 
          mail: {
            msg: "El email no se encontró"
          } 
        },
      });
    }, 
    

    /*db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((usuarioALoguearse) => {
        if (usuarioALoguearse) {
          let comparacion = bcrypt.compareSync(
            req.body.password,
            usuarioALoguearse.password
          );

          if (comparacion) {
            req.session.usuarioALoguearse = {
              ...usuarioALoguearse["dataValues"],
              password: "",
            };

            if (req.body.remindme) {
              res.cookie(
                "recordame",
                { ...usuarioALoguearse["dataValues"], password: "" },
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
    res.cookie("recordame", "", { maxAge: 0 });
    req.session.destroy();
    res.redirect("/users/login");
  },
  registro: (req, res) => {
    res.render("./users/registro");
  },

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
    };
    let userInDB = users.find(user => user.email === req.body.email)
      
      if (userInDB) {
        // Enviar un mensaje de error
        return res.render("./users/registro", {
            errors: {
                email: {
                    msg: "El email ya está registrado"
                }
            },
            oldData: req.body
        });
        };
    // Creo la variable nuevo newUser, es importante que id sea unico e irrepetible.
    let newUser = {
      id: Date.now(),
      name: req.body.nombre,
      lastName: req.body.apellido,
      mail: req.body.email,
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
    res.redirect("/login");
  },

  password: (req, res) => {
    res.render("./users/password");
  },
  perfil: (req, res) => {
    res.render ("./users/password")
  }
};

module.exports = usersControllers;
