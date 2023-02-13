const express = require("express");
const Userroutes = express.Router();
const {userRegister,userLogin,allUser,adminRegister} = require('../controller/userController')
const {addProduct, allProduct } = require('../controller/productController')
const {adminAuthenticate} = require('../middleware/index')

Userroutes.post('/register',userRegister)
Userroutes.post('/admin-register',adminRegister)
Userroutes.post('/login',userLogin)
Userroutes.get('/all-user',adminAuthenticate,allUser)
Userroutes.post('/add-Product',adminAuthenticate,addProduct)
Userroutes.get('/all-product',allProduct)
// Userroutes.
// Userroutes
// Userroutes
// Userroutes
module.exports = Userroutes;
