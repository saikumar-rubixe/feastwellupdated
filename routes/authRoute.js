const express = require("express");
const authRoute = express.Router();

const { userLogin } = require("../controller/loginUserController");
authRoute.route("/").post(userLogin);

module.exports = { authRoute };
