module.exports = (sequelize, dataTypes) => {
  let alias = "Bodega";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
    },
  };
  let config = {
    tableName: "bodegas",
    timestamps: false,
  };
  const Bodega = sequelize.define(alias, cols, config);

  Bodega.associate = function (models) {
    // el models.Movie es por el alias usado en el modelo Movie.
    Bodega.hasMany(models.Product, {
      as: "products",
      foreignKey: "bodega_id",
    });
  };

  return Bodega;
};
