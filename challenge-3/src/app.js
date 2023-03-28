const express = require('express')
const ProductManager = require('./ProductManager') 

const pm = new ProductManager("products.json")
const app = express()
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    pm.loadProducts()
    res.send(pm.products)
})

app.get('/products', (req, res) => {
    const { limit } = req.query
    pm.loadProducts()
    
    if(!limit){
        res.send(pm.products)
    }else{
        res.send(pm.products.slice(0, limit))
    }
})

app.get('/products/:pid', (req, res) => {
    pm.loadProducts()

    const product = pm.products.find(product => product.id == req.params.pid)
    if(!product) return res.send({error: 'No product found with id: ' + req.params.pid})
    res.send(product)
})

app.listen(8080, () => {
    console.log('Server running on port 8080')
})