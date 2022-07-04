const express = require("express");
const NutritionCategoryRoute = express.Router();
const {
  getNutritionCategoryDetailByIdController,
} = require("../controller/nutritionCategoryController");

//NutritionCategoryRoute.route("/").post(Insert);
//NutritionCategoryRoute.route("/").get(getAll);
NutritionCategoryRoute.route("/:id").get(
  getNutritionCategoryDetailByIdController
);
//NutritionCategoryRoute.route("/:id").put(update);
//NutritionCategoryRoute.route("/:id").delete(deleted);

module.exports = { NutritionCategoryRoute };
