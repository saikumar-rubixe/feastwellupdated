const express = require("express");
const userIdActivityLogRoute = express.Router();
const {
  getUserLogDetailByUserIdController,
} = require("../controller/userActivitylogController");

userIdActivityLogRoute.route("/:id").get(getUserLogDetailByUserIdController);

module.exports = { userIdActivityLogRoute };
