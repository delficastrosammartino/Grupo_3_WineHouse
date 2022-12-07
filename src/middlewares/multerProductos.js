const multer = require("multer");
const path = require("path");

// ************ Proceso para manejar archivos ************
// creo el storage donde se va a guardar la info.
const storage = multer.diskStorage({
  // Ubicacion
  destination: (req, file, cb) => {
    cb(null, "../../public/images/productImages");
  },
  // Nombre
  filename: (req, file, cb) => {
    // numero unico con el Date.now, un _img y la extension del archivo original.
    let fileName = Date.now() + "_img" + path.extname(file.originalname);
    cb(null, fileName);
  },
});

// Constante donde genero el metodo a usar para manejar archivos
const uploadProductFile = multer({ storage });

module.exports = uploadProductFile;
