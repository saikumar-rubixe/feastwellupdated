//getMealMenuContentsDetailByIdController

const express = require("express");
const menuContentsRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getAllMealMenuContentsDetailsController,
  getMealMenuContentsDetailByIdController,
  createMealMenuContentsController,
  updateMealMenuContentsController,
  deleteMealMenuContentsController,
} = require("../../controller/mealsAndMenu/mealMenuContentsController.js");
menuContentsRoute
  .route("/")
  .post(verifyFunction, createMealMenuContentsController);
menuContentsRoute
  .route("/")
  .get(verifyFunction, getAllMealMenuContentsDetailsController);
menuContentsRoute
  .route("/:id")
  .get(verifyFunction, getMealMenuContentsDetailByIdController);
menuContentsRoute.route("/:id").put(updateMealMenuContentsController);
menuContentsRoute
  .route("/:id")
  .delete(verifyFunction, deleteMealMenuContentsController);

module.exports = { menuContentsRoute };
