const express = require('express')
const RoutesLogin = express.Router()

const {LoginUserController,LoginValue}=require('../controllers/LoginController')

RoutesLogin.post('/users/login', LoginUserController)
RoutesLogin.get('/users', LoginValue)



module.exports = RoutesLogin


