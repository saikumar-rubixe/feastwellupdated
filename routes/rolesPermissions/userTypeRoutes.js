const express = require("express");
const userTypeRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getUserTypeDetailByIdController,
  getAllUserTypeDetailsController,
  createUserTypeController,
  updateUserTypeController,
  deleteUserTypeController,
} = require("../../controller/rolesPermissions/userTypeController.js");
userTypeRoute
  .route("/:id")
  .get(verifyFunction, getUserTypeDetailByIdController);

userTypeRoute.route("/").post(verifyFunction, createUserTypeController);
userTypeRoute.route("/").get(verifyFunction, getAllUserTypeDetailsController);
userTypeRoute.route("/:id").put(verifyFunction, updateUserTypeController);
userTypeRoute.route("/:id").delete(verifyFunction, deleteUserTypeController);

module.exports = { userTypeRoute };
