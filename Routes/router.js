
//1.import express module
const express = require('express')

const router = new express.Router()

//import controller
const siteController = require('../Controllers/siteController')
// Import userController
const userController = require('../Controllers/userController');

router.get('/sites/list_sites',siteController.getSites)


// Use userController routes
router.use('/users', userController);


//4.export router
module.exports = router
