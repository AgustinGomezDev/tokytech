const ProductManager = require('../daos/ProductManager') 

const pm = new ProductManager("./src/data/products.json")


const socketProduct = async (io) => {
    await pm.loadProducts()
    const products = pm.getProducts()

    io.on('connection', socket => {
        console.log("New client connected");

        socket.emit('products', products)

        socket.on('addProduct', async data => {
            await pm.addProduct(data)
        })

        socket.on('deleteProduct', async data => {
            await pm.deleteProduct(data)
        })
    })
}

module.exports = socketProduct