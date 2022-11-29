const userMiddleware = {
    registered: function(req, res, next) {
        if(req.session.usuarioALoguearse){
            res.redirect('/users/perfil');
        } else {
            next();
        }
    },
    guest: function(req, res, next) {
        if(req.session.usuarioALoguearse){
            next();
        } else {
            res.redirect('/users/login');
        }
    },
    admin: function(req, res, next){
        if(req.session.usuarioALoguearse && req.session.usuarioALoguearse.role_id == 1){
            next();
        } else {
            res.redirect('/')
        }
    }
}

module.exports = userMiddleware;