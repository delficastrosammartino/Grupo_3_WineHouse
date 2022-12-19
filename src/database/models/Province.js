module.exports = (sequelize, dataTypes) => {
    let alias = 'Province';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'provinces',
        timestamps: false
    };
    const Province = sequelize.define(alias, cols, config)

    Province.associate = function (models){
        // el models.Movie es por el alias usado en el modelo Movie.
        Province.hasMany(models.Product,{ 
            as: "products",
            foreignKey: "province_id"
        })
      
    }

    return Province
}