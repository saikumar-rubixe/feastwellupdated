const express = require("express");
const mealMenuRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getMealMenuDetailByIdController,
  getAllMealMenuDetailsController,
  createMealMenuController,
  updateMealMenuController,
  deleteMealMenuController,
} = require("../../controller/mealsAndMenu/mealMenuController");

mealMenuRoute.route("/").post(verifyFunction, createMealMenuController);
mealMenuRoute.route("/").get(verifyFunction, getAllMealMenuDetailsController);
mealMenuRoute
  .route("/:id")
  .get(verifyFunction, getMealMenuDetailByIdController);
mealMenuRoute.route("/:id").put(verifyFunction, updateMealMenuController);
mealMenuRoute.route("/:id").delete(verifyFunction, deleteMealMenuController);

module.exports = { mealMenuRoute };
