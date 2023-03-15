class ProductManager {
    constructor(){
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const isRepeated = this.products.some((product) => product.code == code)
        if(isRepeated == false && title && description && price && thumbnail && code && stock){
            this.products.push({
                id: this.products.length + 1,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            })
            return "Product added successfully"
        }else{ return "Duplicate product code or missing add some features" }
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const productById = this.products.find((product) => product.id == id)
        if(productById){ return productById }
        else{ return "There is no product with the id " + id }
    }
}