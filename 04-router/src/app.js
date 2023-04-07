const express = require('express')
const productRouter = require('./routes/products.router')
const cartRouter = require('./routes/carts.router')
const PORT = 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use("*", (req, res) => {
    res.status(404).send({status: "Error", message: `Requested path not found`,});
});

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})