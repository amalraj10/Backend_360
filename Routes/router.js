//setup path to resolve request

//1.import express module
const express = require('express')

//import controller
const userController = require('../Controllers/userController')


//import jwt middleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')
//import multer
const multerConfig = require('../Middleware/multerMiddleware')

//2.create an object for Router class inside express module
const router = new express.Router()


//4.export router
module.exports = router
