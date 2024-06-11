
//1.import express module
const express = require('express')

const router = new express.Router()

//import controller
const siteController = require('../Controllers/siteController')
// Import userController
const userController = require('../Controllers/userController');

router.get('/sites/list_sites',siteController.getSites)


router.post ('/admin/login',userController.Adminlogin)


//4.export router
module.exports = router


