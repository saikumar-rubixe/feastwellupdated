//getMealMenuContentsDetailByIdController

const express = require("express");
const menuContentsRoute = express.Router();
const {
  getAllMealMenuContentsDetailsController,
  getMealMenuContentsDetailByIdController,
  createMealMenuContentsController,
  updateMealMenuContentsController,
  deleteMealMenuContentsController,
} = require("../controller/mealMenuContentsController");

menuContentsRoute.route("/").post(createMealMenuContentsController);
menuContentsRoute.route("/").get(getAllMealMenuContentsDetailsController);
menuContentsRoute.route("/:id").get(getMealMenuContentsDetailByIdController);
menuContentsRoute.route("/:id").put(updateMealMenuContentsController);
menuContentsRoute.route("/:id").delete(deleteMealMenuContentsController);

module.exports = { menuContentsRoute };
