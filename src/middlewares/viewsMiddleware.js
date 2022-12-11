// este middleware se usa en cada caso que se necesite avisar que alguien esta logueado.
const path = require('path');
const fs = require('fs');
// indico la ruta de mi archivo .json, la abosulta.
const usersFilePath = path.join(__dirname, '../data/usersDB.json');
// primero lee el archivo mencionado en la linea de arriba y la guardo en un array. Guardo en un array los users del .json.
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function viewsMiddleware(req, res, next) {
  res.locals.isLogged = false;
  // le asigno a la variable el mail guardado en cookies.
  let emailInCookie = req.cookies.userEmail
  // busco ese email en la base de datos.
  let userFromCookie = users.find(user => user.email == emailInCookie)
   if(userFromCookie){
      req.session.userLogged = userFromCookie
   }

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    // Como tengo a alguien en session, pongo en la variable res.locals toda la informacion del usuario en sesion para luego usarla en la vista
    res.locals.isLogged = req.session.userLogged;
  }
  next();
}

module.exports = viewsMiddleware;
