
//1.import express module
const express = require('express')

const router = new express.Router()

//import controller
const siteController = require('../Controllers/siteController')
// Import userController
const userController = require('../Controllers/userController');

//import hopital controller
const hospitalController = require('../Controllers/hospitalController')


//import hopital controller
const touristController = require('../Controllers/touristControleer')

//import category Controller
const categoryController = require('../Controllers/categoryController')

//import jwt middleware
const jwtMiddleware = require('../Middeleware/jwtMiddleware')

//import multer middleware

const multerConfig = require('../Middeleware/multerMiddleware')




router.post ('/admin/login',userController.Adminlogin)

/////////////////////     sites      /////////////////////

router.get('/sites/list_sites',siteController.getSites)


router.get('/sites/list_localsites',siteController.getUserSite);

router.post('/sites/add_sites', jwtMiddleware, multerConfig.array('site_image', 10), siteController.addSites);
 
/////////////   hospital       /////////////////////////
router.post('/hospital/add_hospital', jwtMiddleware, multerConfig.array('hosp_images', 10), hospitalController.addHospital);

router.get('/sites/list_hospitals',hospitalController.getUserHospital);

router.put('/hospital/edit/:hosp_id',jwtMiddleware,multerConfig.array('hosp_images', 10),hospitalController.editHospital)

router.delete('/hospital/remove/:hosp_id',jwtMiddleware,hospitalController.deleteHospital)

//////////////   tourist    //////////////////////////

router.post('/tourist/add_tourist', jwtMiddleware, multerConfig.array('place_images', 10), touristController.addTourist);


//////////////   category  /////////////////////////
router.post('/category/add_category', jwtMiddleware, multerConfig.array('category_images', 10), categoryController.addCategory);

router.get('/category/get_allcategory', categoryController.getAllCategory);

router.put('/category/edit_allcategory/:category_id', jwtMiddleware, multerConfig.array('category_images', 10), categoryController.editCategory);

router.delete('/category/delete_allcategory/:category_id', jwtMiddleware, categoryController.deleteCategory);


//4.export router
module.exports = router


