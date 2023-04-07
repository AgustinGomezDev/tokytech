const express = require('express')
const CartManager = require('../daos/CartManager') 

const router = express.Router()
const cm = new CartManager("./src/data/carts.json")

router.get('/:cid', async (req, res) => {
    try{
        res.status(200).send({status: 'succes', payload: await cm.getCartById(req.params.cid)})
    }catch(error){  
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.post('/', async (req, res) => {
    try{
        await cm.createCart()
        res.status(200).send({status: 'succes', payload: await cm.getCarts()})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try{
        await cm.addProductToCart(req.params.cid, req.params.pid)
        res.status(200).send({status: 'succes', payload: await cm.getCarts()})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

module.exports = router;