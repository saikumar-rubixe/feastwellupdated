//getMealMenuContentsDetailByIdController

const express = require("express");
const menuContentsRoute = express.Router();
const {
  getMealMenuContentsDetailByIdController,
} = require("../controller/mealMenuContentsController");

//menuContentsRoute.route("/").post(Insert);
//menuContentsRoute.route("/").get(getAll);
menuContentsRoute.route("/:id").get(getMealMenuContentsDetailByIdController);
//menuContentsRoute.route("/:id").put(update);
//menuContentsRoute.route("/:id").delete(deleted);

module.exports = { menuContentsRoute };
