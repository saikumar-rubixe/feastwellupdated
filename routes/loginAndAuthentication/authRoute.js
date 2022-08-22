const express = require("express");
const authRoute = express.Router();
const {
  userLoginBodyValidation,
} = require("../../validation/login/loginValidation");
const {
  userLogin,
} = require("../../controller/loginAndAuthentication/loginUserController");
// ^ create
authRoute.route("/").post(userLoginBodyValidation, userLogin);

module.exports = { authRoute };
