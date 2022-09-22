const express = require("express");
const userActivityLog = express.Router();

const {
  getUserLogDetailByIdController,
  createUserLogController,
  getUserLogDetailByUserIdController,
} = require("../../controller/usersAndActivity/userActivitylogController");

require("../../controller/usersAndActivity/userActivitylogController.js");
//record the log

userActivityLog.post("/", async (req, res) => {
  await createUserLogController(req, res);
});

// get the log
userActivityLog.get("/:id", async (req, res) => {
  await getUserLogDetailByIdController(req, res);
});

// GET USER'S ACTIVITY LOG BY USER ID

userActivityLog.get("/ByUserId/:id", async (req, res) => {
  await getUserLogDetailByUserIdController(req, res);
});

module.exports = { userActivityLog };
