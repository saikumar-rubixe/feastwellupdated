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
// ^ create userType
userTypeRoute.route("/").post(verifyFunction, createUserTypeController);
//* get userType
userTypeRoute.route("/").get(verifyFunction, getAllUserTypeDetailsController);
//? update userTye
userTypeRoute.route("/:id").put(verifyFunction, updateUserTypeController);
//!delete userType
userTypeRoute.route("/:id").delete(verifyFunction, deleteUserTypeController);

module.exports = { userTypeRoute };
