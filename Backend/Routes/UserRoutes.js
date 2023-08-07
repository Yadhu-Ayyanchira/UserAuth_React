const express = require("express");
const UserRouter = express.Router();
const UserController = require("../Controller/UserController");

UserRouter.post("/signup", UserController.UserReg);

module.exports = UserRouter;
