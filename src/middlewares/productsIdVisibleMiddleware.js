const db = require("../database/models")
   
   function productsIdVisible (req, res, next){
   
   db.Product.findByPk(req.params.id)
    .then((product) => {
      if(!product){
        return res.redirect ("/products")
      } else {
        next()
      }
    } )
    

    }
    

module.exports = productsIdVisible