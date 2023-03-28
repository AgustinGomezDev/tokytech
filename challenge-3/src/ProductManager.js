const fs = require('fs').promises

class ProductManager {
    constructor(path){
        this.path = path
        this.products = []
    }

    async loadProducts() {
        try {
            if(fs.stat(this.path)){
                const fileData = await fs.readFile(this.path, 'utf-8');
                this.products = JSON.parse(fileData)
                return "Products loaded successfully"
            }
        } catch (err) {
            fs.writeFile(this.path, JSON.stringify(this.products))
        }
    }
    
    async saveProducts() {
        try {
            const jsonData = JSON.stringify(this.products)
            await fs.writeFile(this.path, jsonData)
        } catch (err) {
            console.error("An error has occurred: " + err)
        }
    }

    async addProduct(product){
        const isRepeated = this.products.some((productSaved) => productSaved.code == product.code)
        
        if(isRepeated == false && product.title && product.description && product.price && product.thumbnail && product.code && product.stock){
            this.products.push({
                id: this.products.length + 1,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock
            })
            
            await this.saveProducts()

            return "Product added successfully"
        }else{ return "Duplicate product code or missing add some features" }
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const productById = this.products.find((product) => product.id == id)
        if(productById){ return productById }
        else{ return "There is no product with the id: " + id }
    }

    async updateProduct(id, updatedProduct){
        const productToUpdate = this.products.find( product => product.id == id )
        if(productToUpdate){
            const isRepeated = this.products.some((productSaved) => productSaved.code == updatedProduct.code) // check if the product code already exists
            if(isRepeated == false){
                this.products[id - 1] = {
                    ...this.products[id - 1], // previous values
                    ...updatedProduct // new values
                }

                await this.saveProducts()

                return "Product updated successfully"
            }else{
                return "There is already a product with the code: " + updatedProduct.code
            }
        }else{
            return "There is no product with the id: " + id
        }
    }

    async deleteProduct(id){
        const productToDelete = this.products.find( product => product.id == id )
        if(productToDelete){
            this.products = this.products.filter( product => product.id !== id )

            await this.saveProducts()
            return "Product deleted successfully"
        }else{
            return "There is no product with the id: " + id
        }
    }
}

module.exports = ProductManager;