const express = require('express')
const router = express.Router()
const{updateProduct,deleteProduct,getSingleProduct,createProduct,getAllProducts} = require('../controllers/productController')
const authenticateUser = require('../middleware/authentication');


router.route('/').get(authenticateUser,getAllProducts).post(authenticateUser,createProduct)
router.route('/:id').get(authenticateUser,getSingleProduct).patch(authenticateUser,updateProduct).delete(authenticateUser,deleteProduct)

module.exports = router