const express = require("express");
const UserRouter = express.Router();
const UserController = require("../Controller/UserController");

UserRouter.post("/signup", UserController.UserReg);
UserRouter.post("/login", UserController.UserLogin);

module.exports = UserRouter;
