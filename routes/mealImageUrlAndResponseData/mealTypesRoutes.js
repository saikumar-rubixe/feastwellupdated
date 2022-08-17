const express = require("express");
const mealTypes = express.Router();
const {
  getAllMealTypesController,
} = require("../../controller/mealImageUrlAndRepsonseData/mealTypesController");

mealTypes.route("/").get(getAllMealTypesController);
//mealTypes.route("/").post(Insert);
//mealTypes.route("/:id").get(getById);
//mealTypes.route("/:id").put(update);
//mealTypes.route("/:id").delete(deleted);

module.exports = { mealTypes };
