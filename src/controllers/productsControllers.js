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
    db.Product.findAll().then((products) => {
      res.render("./products/products", { products });
    });
  },

  detallesDB: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "sizes" },
        { association: "images" },
      ],
    }).then((product) => {
      res.render("./products/detalles", { product });
    });
  },
  create: (req, res) => {
    // guardo las busquedas que trabajan de manera asincronica.
    let bodegas = db.Bodega.findAll();
    let provinces = db.Province.findAll();
    let sizes = db.Size.findAll();
    let categories = db.ProductCategory.findAll();

    // el Promise sirve para que entre aca una vez que termina los findAll anteriores
    Promise.all([bodegas, provinces, sizes, categories]).then(
      ([bodegas, provinces, sizes, categories]) => {
        return res.render("./products/crear-producto", {
          bodegas,
          provinces,
          sizes,
          categories,
        });
      }
    );
  },
  storeDB: (req, res) => {
    const resultValidation = validationResult(req);
    // si hay errores entra aca.
    if (resultValidation.errors.length > 0) {
      // renderizo la vista registro, y le paso los errores.
      console.log("req.body:")
      console.log(req.body)
      console.log("req.body.size:")
      console.log(req.body.size)
      return res.render("./products/crear-producto", {
        // uso el .mapped para que cada elemento (nombre, apellido, email y password) sea un elemento del objeto y tenga sus propiedades dentro.
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    // resultValidation es un objeto que tiene una propiedad errors usada abajo.

    // PRIMERO HABRIA QUE VERIFICAR SI EL PRODUCTO EXISTE!!!!!!

    req.body.image_id = parseInt(req.body.image_id, 10) || null;

    db.Product.create({
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      size_id: req.body.size,
      bodega_id: req.body.bodega,
      province_id: req.body.province,
      category_id: req.body.category,
      descripcion: req.body.descripcion,
    })
      .then((product) => {
        return db.Product.findAll();
      })
      .then((products) => {
        res.render("./products/products", { products: products });
      })
      .catch((error) => {
        console.error(error);
      });
  },
  edit: (req, res) => {
    // guardo las busquedas que trabajan de manera asincronica.
    let product = db.Product.findByPk(req.params.id);
    let bodegas = db.Bodega.findAll();
    let provinces = db.Province.findAll();
    let sizes = db.Size.findAll();
    let categories = db.ProductCategory.findAll();

    // el Promise sirve para que entre aca una vez que termina los findAll anteriores
    Promise.all([product, bodegas, provinces, sizes, categories]).then(
      ([product, bodegas, provinces, sizes, categories]) => {
        return res.render("./products/editar-producto", {
          product,
          bodegas,
          provinces,
          sizes,
          categories,
        });
      }
    );
  },
  updateDB: function (req, res) {
    const resultValidation = validationResult(req);

    // si hay errores entra aca.
    if (resultValidation.errors.length > 0) {
      // renderizo la vista registro, y le paso los errores.
      return res.render("./products/editar-producto", {
        // uso el .mapped para que cada elemento (nombre, apellido, email y password) sea un elemento del objeto y tenga sus propiedades dentro.
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    db.Product.update(
      {
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        size_id: req.body.size,
        bodega_id: req.body.bodega,
        province_id: req.body.province,
        category_id: req.body.category,
        descripcion: req.body.descripcion,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((product) => {
        return db.Product.findAll();
      })
      .then((products) => {
        res.render("./products/products", { products: products });
      })
      .catch((error) => {
        console.error(error);
      });
  },
  delete: function (req, res) {
    db.Product.findByPk(req.params.id)
      .then((product) => {
        res.render("./products/delete-producto", { product });
      })
      .catch((error) => {
        res.send({ message: "Error al eliminar el producto" });
      });
  },
  destroy: function (req, res) {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/products");
  },
};

module.exports = productsControllers;
