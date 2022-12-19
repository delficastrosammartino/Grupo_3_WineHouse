module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCategory';
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
        tableName: 'users_categories',
        timestamps: false
    };
    const UserCategory = sequelize.define(alias, cols, config)

    UserCategory.associate = function (models){
        // el models.Movie es por el alias usado en el modelo Movie.
        UserCategory.hasMany(models.User,{ 
            as: "users",
            foreignKey: "category_id"
        })
      
    }

    return UserCategory
}