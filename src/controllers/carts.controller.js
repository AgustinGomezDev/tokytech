const { cartService } = require('../service')

class CartController {
    getById = async (req, res) => {
        try{
            const cart = await cartService.getById(req.params.cid)
            if(!cart){
                throw new Error('Could not find a cart with the ID: ' + req.params.cid)
            }else{
                return { cart }
            }
        }catch(error){  
            throw error
        }
    }

    create = async (req, res) => {
        try{
            const createdCart = await cartService.create()
            return { createdCart }
        }catch(error){
            throw error
        }
    }

    addProduct = async (req, res) => {
        try{
            const addedProduct = await cartService.add(req.params.cid, req.params.pid)
            return { addedProduct }
        }catch (error){
            throw error
        }
    }

    update = async (req, res) => {
        try{
            const { products } = req.body
            const updatedCart = await cartService.update(req.params.cid, products)
            return { updatedCart }
        }catch(error){
            throw error
        }
    }

    updateQuantity = async (req, res) => {
        try{
            const quantity = req.body.quantity
            const updatedProduct = await cartService.updateQuantity(req.params.cid, req.params.pid, quantity)
            return { updatedProduct }
        }catch(error){
            throw error
        }
    }

    deleteProduct = async (req,res) => {
        try{
            const deletedProduct = await cartService.delete(req.params.cid, req.params.pid)
            return { deletedProduct }
        }catch(error){
            throw error
        }
    }

    deleteAllProducts = async (req,res) => {
        try{
            const deletedProducts = await cartService.deleteAll(req.params.cid)
            return { deletedProducts }
        }catch(error){
            throw error
        }
    }
}

module.exports = new CartController()