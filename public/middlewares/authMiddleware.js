module.exports = function (req, res, next) {
  res.locals.user = false;

  if (req.session.usuarioALoguearse) {
    res.locals.user = req.session.usuarioALoguearse;
  } else if (req.cookies.recordame) {
    res.locals.user = req.cookies.recordame;
    req.session.usuarioALoguearse = req.cookies.recordame;
  }

  next();
};

/*

function authMiddleware(req, res, next) {
  if (req.session.usuarioGuest) {
    res.redirect("/login");
  } else {
    next();
  }
}

module.exports = authMiddleware; */
