const db = require("../../database/models");

module.exports = {
  /*list: (req, res) => {
    db.Product.findAll({
      attributes: ["id", "name", "description"],
      include: [
        {
          association: "products_categories",
          attributes: ["id", "name"],
        },
      ],
    })
      .then((products) => {
        let categoryCounts = {};
        let productDetails = [];

        products.forEach((product) => {
          productDetails.push(
            "http://localhost:3030/api/products/detalles/" + product.id
          );
          if (categoryCounts[product.products_categories.name]) {
            categoryCounts[product.products_categories.name] =
              categoryCounts[product.products_categories.name] + 1;
          } else {
            categoryCounts[product.products_categories.name] = 1;
          }
        });

        return res.status(200).json({
          count: products.length,
          countByCategory: categoryCounts,
          products: products,
          productDetails: productDetails,
          status: 200,
        });
      })
      .catch((error) => {
        // si hay un error al hacer la consulta a la base de datos
        return res.status(404); // devolvemos un código 404
      });
  }*/
  list: (req, res) => {
    db.Product.findAll({
      attributes: ["id", "name", "price", "discount", "descripcion"],
      include: [
        {
          association: "bodega",
          attributes: ["id", "name"],
        },
        {
          association: "province",
          attributes: ["id", "name"],
        },
        {
          association: "size",
          attributes: ["id", "name"],
        },
        {
          association: "products_categories",
          attributes: ["id", "name"],
        },
      ],
    })
      .then((products) => {
        let categoryCounts = {};
        let productDetails = [];

        products.forEach((product) => {
          productDetails.push({
            id: product.id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            bodega: product.bodega.name,
            province: product.province.name,
            size: product.size.name,
            category: product.products_categories.name,
            description: product.descripcion,
            detail: "http://localhost:3030/api/products/detalles/" + product.id,
          });
          if (categoryCounts[product.products_categories.name]) {
            categoryCounts[product.products_categories.name] =
              categoryCounts[product.products_categories.name] + 1;
          } else {
            categoryCounts[product.products_categories.name] = 1;
          }
        });

        return res.status(200).json({
          count: products.length,
          countByCategory: categoryCounts,
          products: productDetails,
          detail: productDetails,
          status: 200,
        });
      })
      .catch((error) => {
        // si hay un error al hacer la consulta a la base de datos
        return res.status(404); // devolvemos un código 404
      });
  },
  detail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        { association: "products_categories" },
        { association: "bodega" },
        { association: "province" },
        { association: "size" },
      ],
    })
      .then((product) => {
        let productDetail = {
          id: product.id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          bodega: product.bodega.name,
          province: product.province.name,
          size: product.size.name,
          category: product.products_categories.name,
          description: product.descripcion,
          image: "http://localhost:3030/products/" + product.id + "/image",
        };

        return res.status(200).json({
          product: productDetail,
          status: 200,
        });
      })
      .catch((error) => {
        return res.status(404);
      });
  },
};
