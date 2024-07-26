const express = require('express')
const router = new express.Router()
const controller = require('../controller/productController')
const usercontroller = require('../controller/userController')
const { isAuth } = require('../middleware/authentication')
const orderController = require('../controller/ordercontroller')
const upload = require("../multerconfig/storageconfig")

//  product routes
router.get('/products', controller.getProducts)
router.get('/product/:id', controller.singleProduct)
// user routes
router.post("/user/register",upload.single("user_profile"),usercontroller.registerUser)
router.post("/user/login", usercontroller.loginUser)
router.get("/user/logout", isAuth, usercontroller.logoutUser)


// order routes 
router.post("/order", isAuth, orderController.postOrder)


module.exports = router;
