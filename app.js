const express = require("express");
const app = express();
const path = require("path");

app.listen(3030, () => console.log("Servidor corriendo"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // El __dirname es la posicion actual, y lo voy a concatenar con la direccion del archivo que vamos desde donde estoy parado.
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/registro", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/registro.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/password", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/password.html"));
});

app.get("/detalles-del-producto", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/detalles.html"));
});

app.get("/home-productos", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home-productos.html"));
});

app.get("/carrito", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/carrito.html"));
});