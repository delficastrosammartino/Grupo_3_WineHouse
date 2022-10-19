const mainControllers = {
    index : (req, res) => {
        res.render('./products/index');
    },

    carrito : (req, res) => {
        res.render('./products/carrito');
    },

    detalles : (req, res) => {
        res.render('./products/detalles');
    },

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

module.exports = mainControllers;