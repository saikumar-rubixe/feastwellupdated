const express = require("express");
const userActivityLog = express.Router();

const {
  getUserLogDetailByIdController,
  createUserLogController,
  getUserLogDetailByUserIdController,
} = require("../../controller/usersAndActivity/userActivitylogController");

require("../../controller/usersAndActivity/userActivitylogController.js");
//record the log
userActivityLog.route("/").post(createUserLogController);
// get the log
userActivityLog.route("/:id").get(getUserLogDetailByIdController);
// GET USER'S ACTIVITY LOG BY USER ID
userActivityLog.route("/ByUserId/:id").get(getUserLogDetailByUserIdController);
//userActivityLog.route("/:id").put(update);
//userActivityLog.route("/:id").delete(deleted);
//userActivityLog.route("/").get(getAll);

module.exports = { userActivityLog };
