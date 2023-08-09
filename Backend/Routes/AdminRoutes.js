const express = require('express')
const AdminRoute = express.Router()
const adminController = require('../Controller/AdminController')

AdminRoute.post("/login", adminController.AdminLogin);
AdminRoute.get("/getallusers", adminController.userDatas);
AdminRoute.get("/userDetails/:id", adminController.userDetails);
AdminRoute.post("/updateUser", adminController.updateUser);
AdminRoute.post("/deleteUser/:id", adminController.deleteUser);
AdminRoute.post("/addUser", adminController.addUser);



module.exports = AdminRoute