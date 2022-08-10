const express = require("express");
const userActivityLog = express.Router();

const {
  getUserLogDetailByIdController,
  createUserLogController,
} = require("../../controller/usersAndActivity/userActivitylogController");

userActivityLog.route("/").post(createUserLogController);
//userActivityLog.route("/").get(getAll);
userActivityLog.route("/:id").get(getUserLogDetailByIdController);
//userActivityLog.route("/:id").put(update);
//userActivityLog.route("/:id").delete(deleted);

module.exports = { userActivityLog };
