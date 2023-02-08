function adminPageMiddleware(req, res, next) {
  if(!req.session.userLogged){
    return res.redirect("/");
  }
  else if (req.session.userLogged.category_id != 1) {
    return res.redirect("/");
  }
  next();
}

module.exports = adminPageMiddleware;
