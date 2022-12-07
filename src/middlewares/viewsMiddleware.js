function viewsMiddleware(req, res, next) {
  res.locals.isLogged = false;

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    // Como tengo a alguien en session, pongo en la variable res.locals toda la informacion del usuario en sesion para luego usarla en la vista
    res.locals.isLogged = req.session.userLogged;
  }
  next();
}

module.exports = viewsMiddleware;
