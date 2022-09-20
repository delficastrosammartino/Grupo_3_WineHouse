const express = require("express");
const app = express();
const path = require('path');


app.listen(3030, () => 
    console.log("Servidor corriendo")
);

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    // El __dirname es la posicion actual, y lo voy a concatenar con la direccion del archivo que vamos desde donde estoy parado.
    res.sendFile(path.join(__dirname, "/views/index.html"))
});