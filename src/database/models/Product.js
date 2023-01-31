module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
    },
    price: {
      type: dataTypes.INTEGER,
    },
    discount: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    stock: {
      type: dataTypes.INTEGER,
    },
    created_at: {
      type: dataTypes.DATE,
    },
    updated_at: {
      type: dataTypes.DATE,
    },
    bodega_id: {
      type: dataTypes.STRING,
    },
    size_id: {
      type: dataTypes.INTEGER,
    },
    category_id: {
      type: dataTypes.INTEGER,
    },
    image_id: {
      type: dataTypes.INTEGER,
    },
    description_id: {
      type: dataTypes.INTEGER,
      default: null,
    },
    province_id: {
      type: dataTypes.INTEGER,
    },
    descripcion: {
      type: dataTypes.STRING,
    },
    foto: {
      type: dataTypes.STRING,
    },
  };
  let config = {
    tableName: "products",
    timestamps: false,
  };
  const Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.belongsTo(models.Bodega, {
      as: "bodega", // este nombre uso para el controlador, associate
      foreignKey: "bodega_id",
    });
    Product.belongsTo(models.ProductCategory, {
      as: "products_categories", // este nombre uso para el controlador, associate
      foreignKey: "category_id",
    });
    Product.belongsTo(models.Province, {
      as: "province", // este nombre uso para el controlador, associate
      foreignKey: "province_id",
    });
    Product.belongsToMany(models.Size, {
      as: "sizes", // este nombre uso para el controlador, associate
      through: "size_product",
      foreignKey: "product_id",
      otherKey: "size_id",
      timestamps: false,
    });
    Product.belongsToMany(models.Image, {
      as: "images", // este nombre uso para el controlador, associate
      through: "image_product",
      foreignKey: "product_id",
      otherKey: "image_id",
      timestamps: false,
    });
  };

  return Product;
};
