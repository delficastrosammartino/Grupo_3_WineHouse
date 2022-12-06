// ************ Require's ************ // requiere las librerias que vamos a estar usando.
const express = require("express");
const methodOverride = require("method-override"); // Para poder usar los métodos PUT y DELETE
const path = require("path");
const session = require("express-session");
const cookies = require("cookie-parser");

// ************ express() ************
const app = express();

// ************ Middlewares **********
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // este es para mandar peticiones a traves de POST.
app.use(express.json()); // para usar json
app.use(methodOverride("_method")); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(
  session({
    secret: "my_secret_key", // Clave secreta para firmar la cookie de sesión
    resave: false, // No guardar la sesión en la base de datos si no hay cambios
    saveUninitialized: true, // Guardar la sesión en la base de datos si es nueva
  })
);
app.use(cookies());

// ************ Servidor ************
app.listen(process.env.PORT || 3030, () => console.log("Servidor corriendo"));

// ************ Template Engine ************
app.set("view engine", "ejs"); // motor de vistas
app.set("views", "./src/views"); // define la ubicacion de la carpeta vistas

// ************ Routes ************
const mainRoutes = require("./src/routes/main"); // rutas main
const usersRoutes = require("./src/routes/users"); // rutas users
const productsRoutes = require("./src/routes/products"); // rutas users

app.use("/", mainRoutes); // el primer parametro es la ruta raiz o principal, el segundo el archivo a usar para resolver esas rutas.
app.use("/users", usersRoutes); // el primer parametro es la ruta raiz o principal, el segundo el archivo a usar para resolver esas rutas.
app.use("/products", productsRoutes); // el primer parametro es la ruta raiz o principal, el segundo el archivo a usar para resolver esas rutas.
