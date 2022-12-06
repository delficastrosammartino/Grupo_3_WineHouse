// libreria de node para leer y obtener archivos.
const fs = require("fs");
// libreria para concatenar y obtener rutas.
const path = require("path");
const { validationResult } = require("express-validator");

// indico la ruta de mi archivo .json, la abosulta.
const productsFilePath = path.join(__dirname, "../data/productsDB.json");
// primero lee el archivo mencionado en la linea de arriba y la guardo en un array. Guardo en un array los products del .json.
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productsControllers = {
  products: (req, res) => {
    res.render("./products/products", { products });
  },

  detalles: (req, res) => {
    product = products.find((product) => product.id == req.params.id);

    res.render("./products/detalles", { product });
  },

  create: (req, res) => {
    res.render("./products/crear-producto");
  },

  store: (req, res) => {
    // resultValidation es un objeto que tiene una propiedad errors usada abajo.
    const resultValidation = validationResult(req);
    // si hay errores entra aca.
    if (resultValidation.errors.length > 0) {
      // renderizo la vista registro, y le paso los errores.
      return res.render("./products/crear-producto", {
        // uso el .mapped para que cada elemento (nombre, apellido, email y password) sea un elemento del objeto y tenga sus propiedades dentro.
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    // Creo la variable nuevo producto, es importante que id sea unico e irrepetible.
    let newProduct = {
      id: Date.now(),
      size: Number(req.body.size),
      image: req.file.filename,
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
      discount: Number(req.body.discount),
      bodega: req.body.bodega,
      provincia: req.body.provincia,
      description: req.body.description,
      stock: true,
    };
    // Pusheo en el array products
    products.push(newProduct);
    // Lo guardo en productsFilePath es la ruta que puse mas arriba, lo convierto en string para poder guardar en el json, eso hace el stringify
    // Le mando products, el null y el " " son para orden, salto de linea o algo asi.
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    // vulevo a /products
    res.redirect("/products");
  },

  // Update - Form to edit
  edit: (req, res) => {
    let productToEdit = products.find((product) => product.id == req.params.id);
    res.render("./products/editar-producto", { productToEdit });
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

    console.log(id);

    products.forEach((product) => {
      console.log("hola");
      if (product.id == id) {
        console.log(product.id);
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
