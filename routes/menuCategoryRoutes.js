const express = require("express");
const MenuCategoryRoute = express.Router();
const {
  getMenuCategoryDetailByIdController,
  getAllMenuCategoryDetailsController,
} = require("../controller/menuCategoryController");

//MenuCategoryRoute.route("/").post(Insert);
MenuCategoryRoute.route("/").get(getAllMenuCategoryDetailsController);
MenuCategoryRoute.route("/:id").get(getMenuCategoryDetailByIdController);
//MenuCategoryRoute.route("/:id").put(update);
//MenuCategoryRoute.route("/:id").delete(deleted);

module.exports = { MenuCategoryRoute };
