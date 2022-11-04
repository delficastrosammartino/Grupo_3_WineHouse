// libreria de node para leer y obtener archivos.
const fs = require('fs');
// libreria para concatenar y obtener rutas.
const path = require('path');

// indico la ruta de mi archivo .json, la abosulta.
const usersFilePath = path.join(__dirname, '../data/usersDB.json');
// primero lee el archivo mencionado en la linea de arriba y la guardo en un array. Guardo en un array los productos del .json.
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersControllers = {
    login : (req,res) => {
        res.render('./users/login');
    },

    registro : (req,res) => {
        res.render('./users/registro');
    },

    password : (req, res) => {
        res.render('./users/password')
    },
}

module.exports = usersControllers