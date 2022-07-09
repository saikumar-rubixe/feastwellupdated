const express = require("express");
const userTypeRoute = express.Router();
const {
  getUserTypeDetailByIdController,
  getAllUserTypeDetailsController,
  createUserTypeController,
  updateUserTypeController,
  deleteUserTypeController,
} = require("../controller/userTypeController");

userTypeRoute.route("/:id").get(getUserTypeDetailByIdController);

userTypeRoute.route("/").post(createUserTypeController);
userTypeRoute.route("/").get(getAllUserTypeDetailsController);
userTypeRoute.route("/:id").put(updateUserTypeController);
userTypeRoute.route("/:id").delete(deleteUserTypeController);

module.exports = { userTypeRoute };
