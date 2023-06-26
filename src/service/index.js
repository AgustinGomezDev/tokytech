const { UserDao, ProductDao, CartDao } = require('../dao/factory')
const UserRepository = require('../repositories/user.repository')
const ProductRepository = require('../repositories/product.repository')
const CartRepository = require('../repositories/cart.repository')

const userService = new UserRepository(new UserDao)
const productService = new ProductRepository(new ProductDao)
const cartService = new CartRepository(new CartDao)

module.exports = { userService, cartService, productService }