const express = require("express");
const mealItemsRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getMealItemsDetailByIdController,
  getAllMealItemsDetailsController,
  createMealItemsController,
  updateMealItemsController,
  deleteMealitemsController,
} = require("../../controller/mealsAndMenu/mealItemsController");

mealItemsRoute.route("/").post(verifyFunction, createMealItemsController);
mealItemsRoute.route("/").get(verifyFunction, getAllMealItemsDetailsController);
mealItemsRoute.route("/:id").put(verifyFunction, updateMealItemsController);
mealItemsRoute.route("/:id").delete(verifyFunction, deleteMealitemsController);
mealItemsRoute
  .route("/:id")
  .get(verifyFunction, getMealItemsDetailByIdController);

module.exports = { mealItemsRoute };
