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
    db.Product.findAll({
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    }).then((products) => {
      res.render("./products/products", { products });
    });
  },

  detallesDB: (req, res) => {
    db.Product.findByPk(req.params.id, {
    include: [
    { association: "products_categories" },
    { association: "bodega" },
    { association: "province" },
    { association: "size" },
    { association: "images" },
    ],
    }).then((product) => {
    let productPrincipal = product
    let categoryId = productPrincipal.products_categories.id
    db.Product.findAll({
      where:{
        id: { [db.Sequelize.Op.not]: productPrincipal.id },
        category_id: categoryId,
       
    },
    include: [
      { association: "products_categories" },
      { association: "bodega" },
      { association: "province" },
      { association: "size" },
      { association: "images" },
      ],
    limit: 3
    }).then((productosAlternativos) => {
    res.render("./products/detalles", { productPrincipal, productosAlternativos });
    })
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
    console.log("Entre a storeDB");
    const resultValidation = validationResult(req);
    // si hay errores entra aca.
    if (resultValidation.errors.length > 0) {
      console.log("Hay errores!!!");
      console.log(resultValidation.errors);
      // renderizo la vista registro, y le paso los errores.
      return res.render("./products/crear-producto", {
        // uso el .mapped para que cada elemento (nombre, apellido, email y password) sea un elemento del objeto y tenga sus propiedades dentro.
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    // resultValidation es un objeto que tiene una propiedad errors usada abajo.

    // PRIMERO HABRIA QUE VERIFICAR SI EL PRODUCTO EXISTE!!!!!!

    req.body.image_id = parseInt(req.body.image_id, 10) || null;

    console.log("1");
    console.log("req.body");
    console.log(req.body);
    console.log("req.file");
    console.log(req.file);
    console.log("req.file.filename");
    console.log(req.file.filename);

    db.Product.create({
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      size_id: req.body.size,
      bodega_id: req.body.bodega,
      province_id: req.body.province,
      category_id: req.body.category,
      descripcion: req.body.descripcion,
      foto: req.file.filename,
    })
      .then((product) => {
        return db.Product.findAll({
          include: [
            { association: "products_categories" },
            { association: "bodega" },
            { association: "province" },
            { association: "size" },
            { association: "images" },
          ],
        });
      })
      .then((products) => {
        res.render("./products/products", { products: products });
      })
      .catch((error) => {
        console.error(error);
      });
  },

  // POSIBLE storeDB CON CARGA DE VARIAS IMAGENES: ************************
  /*

  storeDB: (req, res) => {
    // Validar los datos del formulario
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("./products/crear-producto", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    // Crear el producto en la base de datos
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
        // Guardar las imágenes en la base de datos
        const imagePromises = req.files.map((file) => {
          return db.Image.create({
            name: file.filename,
          });
        });
        return Promise.all(imagePromises);
      })
      .then((images) => {
         // Guardar las relaciones en la tabla intermediaria
        const relationPromises = images.map((image) => {
          return product.addImage(image)
        });
        return Promise.all(relationPromises);
      })
      .then(() => {
        // Redirigir al usuario a la lista de productos
        return db.Product.findAll();
      })
      .then((products) => {
        res.render("./products/products", { products: products });
      })
      .catch((error) => {
        console.error(error);
      });
  },

  
  */
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
    console.log("entre a updateDB");
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
    db.Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    })
      .then((product) => {
        let foto = req.file ? req.file.filename : product.foto;
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
            foto: foto,
          },
          {
            where: {
              id: product.id,
            },
          }
        );
      })
      .then((product) => {
        return db.Product.findAll({
          include: [
            { association: "products_categories" },
            { association: "bodega" },
            { association: "province" },
            { association: "size" },
            { association: "images" },
          ],
        });
      })
      .then((products) => {
        res.render("./products/detalles", { products: products });
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
  carrito: (req, res) => {
    res.render("./products/carrito");
  },

  imagenProducts: (req, res) => {
    db.Product.findByPk(req.params.id, {
      attributes: ["id", "foto"],
    }).then((product) => {
      res.render("./products/imagen", { product: product });
    });
  },
};

module.exports = productsControllers;
