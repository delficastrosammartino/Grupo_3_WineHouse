module.exports = (sequelize, dataTypes) => {
    let alias = "Order";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: dataTypes.INTEGER,
      },
      total: {
        type: dataTypes.INTEGER,
        allowNull: true,
      },
      paymentMethod: {
        type: dataTypes.STRING,

      },
      shipingMethod: {
        type: dataTypes.STRING,
        allowNull: true,
      },
    };
    let config = {
      tableName: "orders",
      timestamps: false,
    };
    const Order = sequelize.define(alias, cols, config);
  
    Order.associate = function (models) {
      // el models.Product es por el alias usado en el modelo Product.
      Order.belongsTo(models.User, {
        as: "user", // este nombre uso para el controlador, associate
        foreignKey: "user_id",
      });
    };
  
    return Order;
  };
  