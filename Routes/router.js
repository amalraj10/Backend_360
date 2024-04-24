
//1.import express module
const express = require('express')

const router = new express.Router()

//import controller
const userController = require('../Controllers/userController')


router.post('/users/add_sites',userController.addSites)


//4.export router
module.exports = router
