
const db = require("../../database/models");

module.exports = {
    list: (req, res) => {
        db.Product
            .findAll({
                include: [
                  { association: "products_categories" },
                  { association: "bodega" },
                  { association: "province" },
                  { association: "size" },
                ],
              })
            .then(products => { 
                let categoryCounts = {};
                let productDetails = []

                products.forEach(product => {
                     productDetails.push("http://localhost:3030/products/detalles/" + product.id )
                    if(categoryCounts[product.products_categories.name]){
                        categoryCounts[product.products_categories.name] = categoryCounts[product.products_categories.name] + 1;
                    }else{
                        categoryCounts[product.products_categories.name] = 1
                    }
                
                });
                
                return res.status(200).json({ 
                    count: products.length,
                    countByCategory: categoryCounts,
                    products: products,
                    productDetails: productDetails,
                    status: 200
                })
            })
            .catch(error => { // si hay un error al hacer la consulta a la base de datos
                return res.status(404) // devolvemos un código 404
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