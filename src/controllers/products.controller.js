const { productService } = require('../service')

class ProductController {
    get = async (req, res) => {
        try{
            let query = {}
            if(req.query.query === undefined){ // query undefined
                query = {}
            }else if(req.query.query === 'true'){ // status === true
                query.status = true
            }else if(req.query.query === 'false'){ // status === false
                query.status = false
            }else{ // category === req.query.params
                query.category = req.query.query
            }
    
            let sort = null
            if (req.query.sort === "asc") { // asc or desc
                sort = { price: 1 };
            } else if (req.query.sort === "desc") {
                sort = { price: -1 };
            }
    
            const options = {
                limit: req.query.limit ? parseInt(req.query.limit) : 10,
                page: req.query.page ? parseInt(req.query.page) : 1,
                sort: sort
            }
            
            let prevLink = ''
            let nextLink = ''
    
            const products = await productService.get(query, options)
            const { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = products
            hasPrevPage === false ? prevLink = null : prevLink = `/api/products?page=${parseInt(prevPage)}`
            hasNextPage === false ? nextLink = null : nextLink = `/api/products?page=${parseInt(nextPage)}`
            return { products: docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink }
        }catch(error){
            throw error
        }
    }

    getById = async (req, res) => {
        try{
            const product = await productService.getById(req.params.pid)
            return { product }
        }catch(error){
            throw error
        }
    }

    create = async (req, res) => {
        try{
            const product = req.body
            const addedProduct = await productService.create(product)
            return { addedProduct }
        }catch (error){
            throw error
        }
    }

    update = async (req, res) => {
        try{
            const product = req.body
            const updatedProduct = await productService.update(req.params.pid, product)
            return { updatedProduct }
        }catch (error){
            throw error
        }
    }

    delete = async (req, res) => {
        try{
            const deletedProduct = await productService.delete(req.params.pid)
            return { deletedProduct }
        }catch(error){
            throw error
        }
    }
}

module.exports = new ProductController()