const express = require("express");
const authRoute = express.Router();

const {
  userLogin,
} = require("../../controller/loginAndAuthentication/loginUserController");
authRoute.route("/").post(userLogin);

module.exports = { authRoute };
