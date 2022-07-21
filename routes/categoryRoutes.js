const express = require('express')
const router = express.Router()
const{updateCategory,deleteCategory,getSingleCategory,createCategory,getAllCategories} = require('../controllers/categoryController')
const authenticateUser = require('../middleware/authentication');


router.route('/').get(authenticateUser,getAllCategories).post(authenticateUser,createCategory)
router.route('/:id').get(authenticateUser,getSingleCategory).patch(authenticateUser,updateCategory).delete(authenticateUser,deleteCategory)

module.exports = router