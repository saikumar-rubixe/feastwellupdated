const express = require("express");
const MenuCategoryRoute = express.Router();
const {
  getMenuCategoryDetailByIdController,
  getAllMenuCategoryDetailsController,
  createMenuCategoryController,
  updateMenuCategoryController,
  deleteMenuCategoryController,
} = require("../controller/menuCategoryController");

MenuCategoryRoute.route("/").post(createMenuCategoryController);
MenuCategoryRoute.route("/").get(getAllMenuCategoryDetailsController);
MenuCategoryRoute.route("/:id").get(getMenuCategoryDetailByIdController);
MenuCategoryRoute.route("/:id").put(updateMenuCategoryController);
MenuCategoryRoute.route("/:id").delete(deleteMenuCategoryController);

module.exports = { MenuCategoryRoute };
