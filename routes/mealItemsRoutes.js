const express = require("express");
const mealItemsRoute = express.Router();
const {
  getMealItemsDetailByIdController,
  getAllMealItemsDetailsController,
  createMealItemsController,
  updateMealItemsController,
  deleteMealitemsController,
} = require("../controller/mealItemsController");

mealItemsRoute.route("/").post(createMealItemsController);
mealItemsRoute.route("/").get(getAllMealItemsDetailsController);
mealItemsRoute.route("/:id").put(updateMealItemsController);
mealItemsRoute.route("/:id").delete(deleteMealitemsController);
mealItemsRoute.route("/:id").get(getMealItemsDetailByIdController);

module.exports = { mealItemsRoute };
