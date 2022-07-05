const express = require("express");
const userLogRoute = express.Router();
const {
  getUserLogDetailByIdController,
} = require("../controller/userActivitylogController");

//userLogRoute.route("/").post(Insert);
//userLogRoute.route("/").get(getAll);
userLogRoute.route("/:id").get(getUserLogDetailByIdController);
//userLogRoute.route("/:id").put(update);
//userLogRoute.route("/:id").delete(deleted);

module.exports = { userLogRoute };
