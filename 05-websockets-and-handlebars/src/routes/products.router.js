const express = require('express')
const ProductManager = require('../daos/ProductManager') 

const router = express.Router()
const pm = new ProductManager("./src/data/products.json")

router.get('/', async (req, res) => {
    await pm.loadProducts()
    const { limit } = req.query
    limit ? res.status(200).send({status: 'succes', payload: pm.products.slice(0, limit)}) : res.status(200).send({status: 'succes', payload: pm.getProducts()})
})

router.get('/:pid', async (req, res) => {
    try{
        await pm.loadProducts()
        const product = pm.getProductById(req.params.pid)
        res.status(200).send({status: 'succes', payload: product})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.post('/', async (req, res) => {
    try{
        const product = req.body
        await pm.loadProducts()
        pm.addProduct(product)
        res.status(200).send({status: 'succes', payload: pm.products})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.put('/:pid', async (req, res) => {
    try{
        const product = req.body
        await pm.loadProducts()
        await pm.updateProduct(req.params.pid, product)
        res.status(200).send({status: 'succes', payload: pm.products})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.delete('/:pid', async (req, res) => {
    try{
        await pm.loadProducts()
        await pm.deleteProduct(Number(req.params.pid))
        res.status(200).send({status: 'succes', payload: pm.products})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

module.exports = router;