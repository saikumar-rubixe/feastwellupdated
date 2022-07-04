const express = require("express");
const userTypeRoute = express.Router();
const {
  getUserTypeDetailByIdController,
} = require("../controller/userTypeController");

userTypeRoute.route("/:id").get(getUserTypeDetailByIdController);

module.exports = { userTypeRoute };
