module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'products_categories',
        timestamps: false
    };
    const ProductCategory = sequelize.define(alias, cols, config)

    ProductCategory.associate = function (models){
        // el models.Movie es por el alias usado en el modelo Movie.
        ProductCategory.hasMany(models.Product,{ 
            as: "products",
            foreignKey: "category_id"
        })
      
    }

    return ProductCategory
}