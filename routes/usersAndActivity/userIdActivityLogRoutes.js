const express = require("express");
const userIdActivityLogRoute = express.Router();

const {
  getUserLogDetailByUserIdController,
} = require("../../controller/usersAndActivity/userActivitylogController.js");
userIdActivityLogRoute.route("/:id").get(getUserLogDetailByUserIdController);

module.exports = { userIdActivityLogRoute };
