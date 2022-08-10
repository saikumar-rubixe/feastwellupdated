const express = require("express");
const userRoute = express.Router();
const { userBodyValidation } = require("../../validation/userBodyValidation");
const { verifyFunction } = require("../../helper/verifyjwtToken");

const {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../../controller/usersAndActivity/userController");

userRoute
  .route("/")
  .post(verifyFunction, userBodyValidation, createUserController);

userRoute.route("/").get(verifyFunction, getAllUsersController);

userRoute.route("/:id").get(verifyFunction, getUserByIdController);

userRoute
  .route("/:id")
  .put(verifyFunction, userBodyValidation, updateUserController);

userRoute.route("/:id").delete(verifyFunction, deleteUserController);

module.exports = { userRoute };
