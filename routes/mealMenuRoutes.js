const express = require("express");
const mealMenuRoute = express.Router();
const {
  getMealMenuDetailByIdController,
  getAllMealMenuDetailsController,
  createMealMenuController,
  updateMealMenuController,
  deleteMealMenuController,
} = require("../controller/mealMenuController");

mealMenuRoute.route("/").post(createMealMenuController);
mealMenuRoute.route("/").get(getAllMealMenuDetailsController);
mealMenuRoute.route("/:id").get(getMealMenuDetailByIdController);
mealMenuRoute.route("/:id").put(updateMealMenuController);
mealMenuRoute.route("/:id").delete(deleteMealMenuController);

module.exports = { mealMenuRoute };
