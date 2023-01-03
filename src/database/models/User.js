module.exports = (sequelize, dataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
    },
    lastName: {
      type: dataTypes.STRING,
    },
    userName: {
      type: dataTypes.STRING,
    },
    email: {
      type: dataTypes.STRING,
    },
    adress: {
      type: dataTypes.STRING,
    },
    image: {
      type: dataTypes.STRING,
    },
    created_at: {
      type: dataTypes.DATE,
    },
    updated_at: {
      type: dataTypes.DATE,
    },
    password: {
      type: dataTypes.STRING,
    },
  };
  let config = {
    tableName: "users",
    timestamps: false,
  };
  const User = sequelize.define(alias, cols, config);
  User.associate = function (models) {
    User.belongsTo(models.UserCategory, {
      as: "users_categories", // este nombre uso para el controlador, associate
      foreignKey: "category_id",
    });
  };

  return User;
};
