const express = require("express");
const userRoute = express.Router();
const {
  userBodyValidation,
  userUpdateBodyValidation,
} = require("../../validation/usersAndActivity/userBodyValidation");
const { verifyFunction } = require("../../helper/verifyjwtToken");

const {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  updateUserLoginDetailsController,
} = require("../../controller/usersAndActivity/userController");

userRoute.route("/").post(userBodyValidation, createUserController);

userRoute.route("/").get(verifyFunction, getAllUsersController);

userRoute.route("/:id").get(verifyFunction, getUserByIdController);

userRoute
  .route("/:id")
  .put(verifyFunction, userUpdateBodyValidation, updateUserController);

userRoute.route("/loginDetails/:id").put(
  verifyFunction,
  // userUpdateBodyValidation,
  updateUserLoginDetailsController
);

userRoute.route("/:id").delete(verifyFunction, deleteUserController);

module.exports = { userRoute };
