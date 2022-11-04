// libreria de node para leer y obtener archivos.
const fs = require('fs');
// libreria para concatenar y obtener rutas.
const path = require('path');

// indico la ruta de mi archivo .json, la abosulta.
const productsFilePath = path.join(__dirname, '../data/productsDB.json');
// primero lee el archivo mencionado en la linea de arriba y la guardo en un array. Guardo en un array los products del .json.
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsControllers = {
    products : (req, res) => {
        res.render('./products/products', {products});
    },

    detalles : (req, res) => {
        product = products.find(product => product.id == req.params.id)

        res.render('./products/detalles', {product});
    },

    create : (req, res) => {
        res.render('./products/crear-producto')
    },

    store : (req, res) => {
          // Creo la variable nuevo producto, es importante que id sea unico e irrepetible.
          let newProduct = {
            id: Date.now(),
            name : req.body.name,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            category: req.body.category,
            description: req.body.description,
            image: req.body.image
        }
    // Pusheo en el array products
        products.push(newProduct)
    // Lo guardo en productsFilePath es la ruta que puse mas arriba, lo convierto en string para poder guardar en el json, eso hace el stringify
    // Le mando products, el null y el " " son para orden, salto de linea o algo asi.
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
    // vulevo a /products
        res.redirect("/products")
    },
 
    edit : (req, res) => {

    }

}

module.exports = productsControllers;