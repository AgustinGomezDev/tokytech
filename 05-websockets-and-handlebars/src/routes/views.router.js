const express = require('express')
const ProductManager = require('../daos/ProductManager') 

const router = express.Router()
const pm = new ProductManager("./src/data/products.json")

router.get('/', async(req, res) => {
    await pm.loadProducts()
    res.render('home', {
        products: pm.getProducts()
    })
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {})
})

module.exports = router;