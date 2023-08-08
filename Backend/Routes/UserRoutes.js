const express = require("express");
const UserRouter = express.Router();
const UserController = require("../Controller/UserController");
const {upload} = require('../Multer')

UserRouter.post("/signup", UserController.UserReg);
UserRouter.post("/login", UserController.UserLogin);
UserRouter.post("/imgupdate",upload.single("image"), UserController.updateImage);

module.exports = UserRouter;
