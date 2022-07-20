const express = require('express')
const router = express.Router()
const {register ,login ,logout,registerEmployee} = require('../controllers/authController')




router.post('/register', register)
router.post('/login', login)
router.post('/register-employee', registerEmployee)
router.get('/logout', logout)


module.exports = router