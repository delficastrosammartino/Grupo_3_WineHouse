   const db = require("../database/models")
   
   function productsFindAllMiddleware (req, res, next){
   // guardo las busquedas que trabajan de manera asincronica.
   let bodegas = db.Bodega.findAll()
   let provinces = db.Province.findAll()
   let sizes = db.Size.findAll()
   let categories = db.ProductCategory.findAll()

   // el Promise sirve para que entre aca una vez que termina los findAll anteriores
   Promise.all([bodegas, provinces, sizes, categories])

   .then(([bodegas, provinces, sizes, categories]) => {
    // Una vez que se completan las búsquedas, agregar los resultados a la respuesta.
    res.locals.bodegas = bodegas;
    res.locals.provinces = provinces;
    res.locals.sizes = sizes;
    res.locals.categories = categories;
    // Continuar con la lógica de la aplicación
    next();
  })

}

module.exports = productsFindAllMiddleware
  