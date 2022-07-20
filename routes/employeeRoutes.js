const express = require('express')
const router = express.Router()
const{getEmployees,createEmployee, getSingleEmployee , deleteEmployee, updateEmployee , sendInvitationLink ,getEmployeeUser} = require('../controllers/employeeController')
const authenticateUser = require('../middleware/authentication');


router.route('/').get(authenticateUser,getEmployees).post(authenticateUser,createEmployee)
router.route('/get-employee-user').get(authenticateUser,getEmployeeUser)
router.route('/invite/:id').get(authenticateUser,sendInvitationLink)
router.route('/:id').get(authenticateUser,getSingleEmployee).patch(authenticateUser,updateEmployee).delete(authenticateUser,deleteEmployee)

module.exports = router