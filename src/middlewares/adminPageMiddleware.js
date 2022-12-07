function adminPageMiddleware(req, res, next) {
  if (req.session.userLogged.id != 1) {
    return res.redirect("/");
  }
  next();
}

module.exports = adminPageMiddleware;
