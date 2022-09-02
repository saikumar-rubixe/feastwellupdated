const express = require("express");
const authRoute = express.Router();

const { verifyFunction } = require("../../helper/verifyjwtToken");

const {
  userLoginBodyValidation,
} = require("../../validation/login/loginValidation");

const {
  userLogin,
  TokenLogin,
} = require("../../controller/loginAndAuthentication/loginUserController");

// ^ create
authRoute.route("/").post(userLoginBodyValidation, userLogin);

// * token login
authRoute.route("/").get(verifyFunction, TokenLogin);

module.exports = { authRoute };
