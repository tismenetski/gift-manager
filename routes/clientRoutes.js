const express = require('express')
const router = express.Router()
const {createClient,getClient} = require('../controllers/clientController')
const authenticateUser = require('../middleware/authentication');



router.post('/', authenticateUser, createClient)
router.get('/' , authenticateUser , getClient)

module.exports = router