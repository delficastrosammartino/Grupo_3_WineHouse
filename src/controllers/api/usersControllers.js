const db = require("../../database/models");

module.exports = {
  list: (req, res) => {
    db.User.findAll({
      attributes: ["id", "name", "email"],
    })
      .then((users) => {
        let userDetails = [];

        users.forEach((user) => {
          userDetails.push({
            id: user.id,
            name: user.name,
            email: user.email,
            detail: "http://localhost:3030/api/users/detalles/" + user.id,
          });
        });

        return res.status(200).json({
          count: users.length,
          users: userDetails,
          status: 200,
        });
      })
      .catch((error) => {
        // si hay un error al hacer la consulta a la base de datos
        return res.status(404); // devolvemos un código 404
      });
  },

  detail: (req, res) => {
    db.User.findByPk(req.params.id, {
      attributes: ["id", "name", "lastName", "userName", "image"],
    })
      .then((user) => {
        let userDetails = {
          id: user.id,
          name: user.name,
          lastname: user.lastName,
          username: user.userName,
          image: "http://localhost:3030/users/" + user.id + "/avatar",
        };

        return res.status(200).json({
          user: userDetails,
          status: 200,
        });
      })
      .catch((error) => {
        // si hay un error al hacer la consulta a la base de datos
        return res.status(404); // devolvemos un código 404
      });
  },
  avatar: (req, res) => {
    db.User.findByPk(req.params.id, {
      attributes: ["id", "image"],
    }).then();
  },
};
