function guestMiddleware(req, res, next) {
  if (req.session.usuarioLogueado) {
    res.redirect("/profile");
  } else {
    next();
  }
}

module.exports = guestMiddleware;
