const express = require('express')
const router = express.Router()
const{getEmployees,createEmployee, getSingleEmployee , deleteEmployee, updateEmployee} = require('../controllers/employeeController')
const authenticateUser = require('../middleware/authentication');


router.route('/').get(authenticateUser,getEmployees).post(authenticateUser,createEmployee)
router.route('/:id').get(authenticateUser,getSingleEmployee).patch(authenticateUser,updateEmployee).delete(authenticateUser,deleteEmployee)

module.exports = router