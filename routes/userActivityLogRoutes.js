const express = require("express");
const userLogRoute = express.Router();
const {
  getUserLogDetailByIdController,
  createUserLogController,
} = require("../controller/userActivitylogController");

userLogRoute.route("/").post(createUserLogController);
//userLogRoute.route("/").get(getAll);
userLogRoute.route("/:id").get(getUserLogDetailByIdController);
//userLogRoute.route("/:id").put(update);
//userLogRoute.route("/:id").delete(deleted);

module.exports = { userLogRoute };
