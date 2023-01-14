let multer = require("multer");
let path = require("path");

var storage = multer.diskStorage({
  
  // Ubicacion
  destination: (req, file, cb) => {
    console.log("2")
    cb(null, path.join(__dirname, "../../public/images/productImages"));
  },
  // Nombre
  filename: (req, file, cb) => {
    console.log("3")
    // numero unico con el Date.now, un _img y la extension del archivo original.
    let fileName = Date.now() + "_img" + path.extname(file.originalname);
    console.log(fileName)
    cb(null, fileName);
  },
});


const preUploadProductFile = multer({ storage });
const uploadProductFile = preUploadProductFile.single("image")

module.exports = uploadProductFile;
