// libreria de node para leer y obtener archivos.
const fs = require("fs");
// libreria para concatenar y obtener rutas.
const path = require("path");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const sequelize = require("sequelize");

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
      let productPrincipal = product;
      let categoryId = productPrincipal.products_categories.id;
      db.Product.findAll({
        where: {
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
        limit: 3,
      }).then((productosAlternativos) => {
        res.render("./products/detalles", {
          productPrincipal,
          productosAlternativos,
        });
      });
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
  provincias: (req, res) => {
    // este findAll esta demas!
    db.Product.findAll({
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
      order: [["province_id", "ASC"]],
    }).then((products) => {
      let catamarca = db.Product.findAll({
        where: {
          province_id: 2,
        },
        include: [
          { association: "products_categories" },
          { association: "bodega" },
          { association: "province" },
          { association: "size" },
          { association: "images" },
        ],
      });
      let sanJuan = db.Product.findAll({
        where: {
          province_id: 3,
        },
        include: [
          { association: "products_categories" },
          { association: "bodega" },
          { association: "province" },
          { association: "size" },
          { association: "images" },
        ],
      });
      let neuquen = db.Product.findAll({
        where: {
          province_id: 4,
        },
        include: [
          { association: "products_categories" },
          { association: "bodega" },
          { association: "province" },
          { association: "size" },
          { association: "images" },
        ],
      });
      let rioNegro = db.Product.findAll({
        where: {
          province_id: 5,
        },
        include: [
          { association: "products_categories" },
          { association: "bodega" },
          { association: "province" },
          { association: "size" },
          { association: "images" },
        ],
      });
      let mendoza = db.Product.findAll({
        where: {
          province_id: 6,
        },
        include: [
          { association: "products_categories" },
          { association: "bodega" },
          { association: "province" },
          { association: "size" },
          { association: "images" },
        ],
      });
      let cordoba = db.Product.findAll({
        where: {
          province_id: 7,
        },
        include: [
          { association: "products_categories" },
          { association: "bodega" },
          { association: "province" },
          { association: "size" },
          { association: "images" },
        ],
      });
      let salta = db.Product.findAll({
        where: {
          province_id: 8,
        },
        include: [
          { association: "products_categories" },
          { association: "bodega" },
          { association: "province" },
          { association: "size" },
          { association: "images" },
        ],
      });
      let laRioja = db.Product.findAll({
        where: {
          province_id: 8,
        },
        include: [
          { association: "products_categories" },
          { association: "bodega" },
          { association: "province" },
          { association: "size" },
          { association: "images" },
        ],
      });
      Promise.all([
        catamarca,
        sanJuan,
        neuquen,
        rioNegro,
        mendoza,
        cordoba,
        salta,
        laRioja,
      ]).then(
        ([
          catamarca,
          sanJuan,
          neuquen,
          rioNegro,
          mendoza,
          cordoba,
          salta,
          laRioja,
        ]) => {
          res.render("./products/provincias", {
            catamarca,
            sanJuan,
            neuquen,
            rioNegro,
            mendoza,
            cordoba,
            salta,
            laRioja,
          });
        }
      );
    });
  },
  categorias: (req, res) => {
    let cabernetFranc = db.Product.findAll({
      where: {
        category_id: 1,
      },
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    });
    let cabernetSauvignon = db.Product.findAll({
      where: {
        category_id: 2,
      },
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    });
    let pinotNoir = db.Product.findAll({
      where: {
        category_id: 3,
      },
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    });
    let chardonnay = db.Product.findAll({
      where: {
        category_id: 4,
      },
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    });
    let malbec = db.Product.findAll({
      where: {
        category_id: 5,
      },
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    });
    let sauvignonBlanc = db.Product.findAll({
      where: {
        category_id: 6,
      },
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    });
    let merlot = db.Product.findAll({
      where: {
        category_id: 7,
      },
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    });
    let syrah = db.Product.findAll({
      where: {
        category_id: 8,
      },
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    });
    let blend = db.Product.findAll({
      where: {
        category_id: 9,
      },
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    });
    Promise.all([
      cabernetFranc,
      cabernetSauvignon,
      pinotNoir,
      chardonnay,
      malbec,
      sauvignonBlanc,
      merlot,
      syrah,
      blend,
    ]).then(
      ([
        cabernetFranc,
        cabernetSauvignon,
        pinotNoir,
        chardonnay,
        malbec,
        sauvignonBlanc,
        merlot,
        syrah,
        blend,
      ]) => {
        res.render("./products/categorias", {
          cabernetFranc,
          cabernetSauvignon,
          pinotNoir,
          chardonnay,
          malbec,
          sauvignonBlanc,
          merlot,
          syrah,
          blend,
        });
      }
    );
  },
  search: (req, res) => {
    const query = req.query.buscador;
    db.Product.findAll({
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
      where: {
        [sequelize.Op.or]: [
          { name: { [sequelize.Op.like]: `%${query}%` } },
          { discount: { [sequelize.Op.like]: `%${query}%` } },
          { '$bodega.name$': { [sequelize.Op.like]: `%${query}%` } },
          { '$province.name$': { [sequelize.Op.like]: `%${query}%` } },
          { '$size.name$': { [sequelize.Op.like]: `%${query}%` } },
          { '$products_categories.name$': { [sequelize.Op.like]: `%${query}%` } },
          // ... Agrega más propiedades aquí si es necesario
        ],
      },
    })
    .then((products) => {
      res.render("./products/search", { products, query });

    })
  },
  carrito: (req, res) => {
    res.render("./products/carrito", { cart: req.session.cart });
  },
  addToCart: (req, res) => {
    console.log("--------------------------- req.params.productId-----------------")
    console.log(req.params.productId)
    db.Product.findByPk(req.body.productId, {
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
        { association: "images" },
      ],
    })
    .then(product => {
      
      let productToCart = {
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        size: product.size.name,
        bodega: product.bodega.name,
        province: product.province.name,
        category: product.products_categories.name,
        foto: product.foto
      }
      if (req.session.cart) {
        req.session.cart.push(productToCart)
      } else {
        // Si no existe, crear la variable cart en la sesión
        req.session.cart = [productToCart]
      }
      console.log("----------- req.session.cart ---------------------")
      console.log(req.session.cart)
      res.render("./products/carrito", { cart: req.session.cart })
    })
    .catch(error => {
      console.error(error)
      res.send("Error al agregar producto al carrito")
    })
  },
  confirmarCompra: (req, res) => {
    req.session.cart = [];
    res.render("./products/confirmar-compra", { cart: req.session.cart });
  },
  borrarCarrito: (req, res) => {
    req.session.cart = [];
    res.render("./products/carrito", { cart: req.session.cart });
  },
  borrarUnElementoDelCarrito: (req, res) => {
    // Obtengo el indice del producto a partir del input oculto
    let indexToRemove = req.body.index;
  
    // Si el índice es válido y se encuentra dentro de los límites del array cart
    if (indexToRemove >= 0 && indexToRemove < req.session.cart.length) {
      // Elimino el producto del carrito utilizando el método splice
      req.session.cart.splice(indexToRemove, 1);
      // Renderizo la página de carrito con el carrito actualizado
      res.render("./products/carrito", { cart: req.session.cart });
    } else {
      res.send("No se encontró el producto en el carrito");
    }
  },
  // Este hay que borrarlo
  confirmarCompraRend: (req, res) => {
    res.render("./products/confirmar-compra");
  }
}



module.exports = productsControllers;
