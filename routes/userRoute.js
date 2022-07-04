const express = require("express");
const residentRoute = express.Router();
const { userBodyValidation } = require("../validation/userBodyValidation");

const {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controller/userController");

residentRoute.route("/").post(userBodyValidation, createUserController);
residentRoute.route("/").get(getAllUsersController);
residentRoute.route("/:id").get(getUserByIdController);
residentRoute.route("/:id").put(userBodyValidation, updateUserController);
residentRoute.route("/:id").delete(deleteUserController);

module.exports = { residentRoute };
