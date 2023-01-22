let multer = require("multer");
let path = require("path");

var storage = multer.diskStorage({
  
  // Ubicacion
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images/avatars"));
  },
  // Nombre
  filename: (req, file, cb) => {
    // numero unico con el Date.now, un _img y la extension del archivo original.
    let fileName = Date.now() + "_img" + path.extname(file.originalname);
    cb(null, fileName);
  },
});


const preUploadUserFile = multer({ storage });
const uploadUserFile = preUploadUserFile.single("image")

module.exports = uploadUserFile;
 