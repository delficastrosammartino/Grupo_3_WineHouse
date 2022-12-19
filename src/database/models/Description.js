module.exports = (sequelize, dataTypes) => {
    let alias = 'Description';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'descriptions',
        timestamps: false
    };
    const Description = sequelize.define(alias, cols, config)

    /*Actor.associate = function (models){
        Actor.belongsToMany(models.Movie, { 
            as:"movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        })
    
    }*/

    return Description
}