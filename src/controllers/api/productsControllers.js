
const db = require("../../database/models");

module.exports = {
    list: (req, res) => {
        db.Product
            .findAll()
            .then(products => {
                return res.status(200).json({
                    count: products.length,
                    data: products,
                    status: 200
                })
            })
            .catch(error => {
                return res.status(404)
            })
    },
    detail: (req, res) => {
        db.Product
         .findByPk(req.params.id)
         .then(product => {
            return res.status(200).json({
                data: product,
                status: 200
            })
         })
         .catch(error => {
            return res.status(404)
        })
    }
}