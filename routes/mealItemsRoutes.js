const express = require("express");
const mealItemsRoute = express.Router();
const {
  getMealItemsDetailByIdController,
} = require("../controller/mealItemsController");

//mealItemsRoute.route("/").post(Insert);
//mealItemsRoute.route("/").get(getAll);
//mealItemsRoute.route("/:id").put(update);
//mealItemsRoute.route("/:id").delete(deleted);
mealItemsRoute.route("/:id").get(getMealItemsDetailByIdController);

module.exports = { mealItemsRoute };
