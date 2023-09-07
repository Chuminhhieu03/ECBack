const express = require('express')
const router = express.Router()
const productController = require('../controllers/Product')

router.get('/', productController.get)
router.post('/', productController.create)
router.patch('/', productController.update)
router.delete('/:id', productController.deleteProduct)
router.get('/:id', productController.getById)
router.get('/category/:category', productController.getCategory)
router.post('/add-to-cart', productController.addToCart)
router.post('/increase-cart', productController.increaseCart)
router.post('/decrease-cart', productController.decreaseCart)
router.post('/remove-from-cart', productController.removeFromCart)

module.exports = router