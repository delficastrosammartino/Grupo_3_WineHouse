// Middleware para paginas solo visibles para invitados
function guestMiddleware(req, res, next) {
  if (req.session.userToLogin) {
    res.redirect("/");
  } else {
    next();
  }
}

// Middleware para paginas solo visibles para usuarios
function authMiddleware(req, res, next) {
  if (!req.session.userToLogin) {
    req.redirect("/users/login");
  } else {
    next();
  }
}

// Middleware para paginas solo visibles para administradores
function adminMiddleware(req, res, next) {
  if (!req.session.admin) {
    res.redirect("/");
  } else {
    next();
  }
}

// Middleware para poder hacer que se vean cosas o no, dependiendo si estas logueado (agregar ifs en las vistas)
// Poner este middleware a nivel aplicacion en app con app.use() y DESPUÉS DEL MIDDLEWARE DE SESSION
function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  if (req.session.userToLogin) {
    res.locals.isLogged = true;
    // Como tengo a alguien en session, pongo en la variable res.locals toda la informacion del usuario en sesion para luego usarla en la vista
    res.locals.userToLogin = req.session.userToLogin;
  }

  next();
}

module.exports = guestMiddleware;
