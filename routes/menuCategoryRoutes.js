const express = require("express");
const MenuCategoryRoute = express.Router();
const {
  getMenuCategoryDetailByIdController,
} = require("../controller/menuCategoryController");

//MenuCategoryRoute.route("/").post(Insert);
//MenuCategoryRoute.route("/").get(getAll);
MenuCategoryRoute.route("/:id").get(getMenuCategoryDetailByIdController);
//MenuCategoryRoute.route("/:id").put(update);
//MenuCategoryRoute.route("/:id").delete(deleted);

module.exports = { MenuCategoryRoute };
