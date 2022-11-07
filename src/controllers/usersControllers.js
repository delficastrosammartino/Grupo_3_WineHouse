// libreria de node para leer y obtener archivos.
const fs = require('fs');
// libreria para concatenar y obtener rutas.
const path = require('path');
const { validationResult } = require ("express-validator")

// indico la ruta de mi archivo .json, la abosulta.
const usersFilePath = path.join(__dirname, '../data/usersDB.json');
// primero lee el archivo mencionado en la linea de arriba y la guardo en un array. Guardo en un array los users del .json.
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersControllers = {
    login : (req,res) => {
        res.render('./users/login');
    },

    registro : (req,res) => {
        res.render('./users/registro');
    },

    processRegister: (req, res) => {
    // resultValidation es un objeto que tiene una propiedad errors usada abajo.
       const resultValidation = validationResult(req);
    // si hay errores entra aca.
       if(resultValidation.errors.length > 0){
    // renderizo la vista registro, y le paso los errores.
            return res.render ('./users/registro', {
    // uso el .mapped para que cada elemento (nombre, apellido, email y password) sea un elemento del objeto y tenga sus propiedades dentro.           
                errors: resultValidation.mapped(),
                oldData: req.body
            })
       }
    // Creo la variable nuevo newUser, es importante que id sea unico e irrepetible.
       let newUser = {
        id: Date.now(),
        name: req.body.nombre,
        lastName: req.body.apellido,
        mail: req.body.email,
        password: req.body.password,
        category: " ",
        image: " ",
        adress:" ",
        userName: " "
       }
    // Pusheo en el array users
       users.push(newUser);
    // Lo guardo en productsFilePath es la ruta que puse mas arriba, lo convierto en string para poder guardar en el json, eso hace el stringify
	// Le mando products, el null y el " " son para orden, salto de linea o algo asi.
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "))
    // vulevo a /
        res.redirect("/")

    },

    password : (req, res) => {
        res.render('./users/password')
    },
}

module.exports = usersControllers