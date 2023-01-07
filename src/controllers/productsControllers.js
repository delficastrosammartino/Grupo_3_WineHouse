// libreria de node para leer y obtener archivos.
const fs = require("fs");
// libreria para concatenar y obtener rutas.
const path = require("path");
const { validationResult } = require("express-validator");
const db = require("../database/models");

// indico la ruta de mi archivo .json, la abosulta.
const productsFilePath = path.join(__dirname, "../data/productsDB.json");
// primero lee el archivo mencionado en la linea de arriba y la guardo en un array. Guardo en un array los products del .json.
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productsControllers = {
  // /products sacando la info de db.
  productsDB: (req, res) => {
    db.Product.findAll()
      .then((products) => {
        res.render ("./products/products", {products})
      })

  },

  detallesDB: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        {association: "products_categories"},
        {association: "bodega"},
        {association: "province"},
        {association: "sizes"},
        {association: "images"}
      ]
    })
      .then((product) => {
        res.render("./products/detalles", { product })
      })
  },
  create: (req, res) => {
     // guardo las busquedas que trabajan de manera asincronica.
    let bodegas = db.Bodega.findAll()
    let provinces = db.Province.findAll()
    let sizes = db.Size.findAll()
    let categories = db.ProductCategory.findAll()

    // el Promise sirve para que entre aca una vez que termina los findAll anteriores
    Promise.all([bodegas, provinces, sizes, categories])

      .then(([bodegas, provinces, sizes, categories]) => {
        return res.render("./products/crear-producto", {bodegas, provinces, sizes, categories});
      })
  },
  storeDB: (req, res) => {
    // resultValidation es un objeto que tiene una propiedad errors usada abajo.
    const resultValidation = validationResult(req);
    // si hay errores entra aca.
    if (resultValidation.errors.length > 0) {
      // renderizo la vista registro, y le paso los errores.
      return res.render("./products/crear-producto", {
        // uso el .mapped para que cada elemento sea un elemento del objeto y tenga sus propiedades dentro.
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    // PRIMERO HABRIA QUE VERIFICAR SI EL PRODUCTO EXISTE!!!!!!
    
    req.body.image_id = parseInt(req.body.image_id, 10) || null;
    /********************************************************/
    console.log(req.body)
    db.Product.create(req.body)
      .then((product) => {
        return db.Product.findAll()
      })
      .then((products) => {
        res.render("./products/products",{products : products})
      })
      .catch((error) => {
        console.error(error);
      });

  },
  edit: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        {association: "products_categories"},
        {association: "bodega"},
        {association: "province"},
        {association: "sizes"},
        {association: "images"}
      ]
    })
      .then((product) => {
        res.render("./products/editar-producto", { product })
      })
  },


  products: (req, res) => {
    res.render("./products/products", { products });
  },

  detalles: (req, res) => {
    product = products.find((product) => product.id == req.params.id);

    res.render("./products/detalles", { product });
  },
  
  store: (req, res) => {
    // resultValidation es un objeto que tiene una propiedad errors usada abajo.
    /* const resultValidation = validationResult(req);
    // si hay errores entra aca.
    if (resultValidation.errors.length > 0) {
      // renderizo la vista registro, y le paso los errores.
      return res.render("./products/crear-producto", {
        // uso el .mapped para que cada elemento (nombre, apellido, email y password) sea un elemento del objeto y tenga sus propiedades dentro.
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } */
    // Verificar si el producto ya está almacenado
   /* console.log(req.body)
    console.log("1")
    db.Product.findOne({
      where: {
        name: req.body.name,
        //bodega_id: req.body.bodega_id,
        //size_id: req.body.size_id,
      },
      /*and: [
        { name: req.body.name },
        { bodega_id: req.body.bodega_id },
        { size_id: req.body.size_id },
      ],
    })
    .then((product) => {
      console.log("2")
      console.log(product)
      if(product){
        return res.render("./products/crear-producto", {          
          errors: {
            name: {
              msg: "Debe completar los campos, nombre, bodega y tamaño o verificar que ese producto no exista en la db",
            },
          },
          oldData: req.body,
        })
      }
      
    });
    console.log("3")*/
    db.Product.create(req.body)
      .then((product) => {
      console.log("4")
      console.log(db.Product.find())
        return db.Product.find()
      })
      .then((products) => {
        res.render("products",{products : products})
      })
      .catch((error) => {
        console.error(error);
      });
  },

  // Update - Method to update
  update: (req, res) => {
    /* let productEdited = products.map(function (product) {
      if (product.id == req.params.id) {
        product.name = req.body.name;
        product.price = Number(req.body.price);
        product.discount = Number(req.body.discount);
        product.description = req.body.description;
      }
      fs.writeFileSync(
        productsFilePath,
        JSON.stringify(productEdited, null, " ")
      );
    });

    res.render("products");
    */
    let id = req.params.id;

    products.forEach((product) => {
      if (product.id == id) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.discount = req.body.discount;
        product.description = req.body.description;
      }
    });
    fs.writeFileSync(productsFilePath, JSON.stringify(products));

    res.render("./products/products", { products });
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    /*let productToDelete = products.find(
      (product) => product.id == req.params.id
    );*/
    let id = req.params.id;
    let productsBorrado = products.filter((producto) => producto.id != id);

    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(productsBorrado, null, " ")
    );

    res.redirect("/products");
  },
};

module.exports = productsControllers;
