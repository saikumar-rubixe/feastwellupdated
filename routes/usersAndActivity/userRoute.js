const express = require("express");
const userRoute = express.Router();

const {
  userBodyValidation,
  userUpdateBodyValidation,
} = require("../../validation/usersAndActivity/userBodyValidation");
const { verifyFunction } = require("../../helper/verifyjwtToken");

const { permissionsCheck } = require("../../helper/permissionsCheck");

const {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  updateUserLoginDetailsController,
} = require("../../controller/usersAndActivity/userController");

userRoute.route("/").post(
  verifyFunction,

  userBodyValidation,
  createUserController
);
//* get all users detaiils
userRoute.route("/").get(verifyFunction, getAllUsersController);
//* get user details by Id(userId)
userRoute.route("/:id").get(verifyFunction, getUserByIdController);

//? Update the user details BY ID(userId)
userRoute
  .route("/:id")
  .put(verifyFunction, userUpdateBodyValidation, updateUserController);

//? update the  USER login time details  immediately after Login
userRoute.route("/loginDetails/:id").put(
  verifyFunction,
  // userUpdateBodyValidation,
  updateUserLoginDetailsController
);

userRoute.route("/:id").delete(verifyFunction, deleteUserController);

module.exports = { userRoute };
