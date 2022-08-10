const express = require("express");
const MenuCategoryRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getMenuCategoryDetailByIdController,
  getAllMenuCategoryDetailsController,
  createMenuCategoryController,
  updateMenuCategoryController,
  deleteMenuCategoryController,
} = require("../../controller/sideBar/menuCategoryController");

MenuCategoryRoute.route("/").post(verifyFunction, createMenuCategoryController);
MenuCategoryRoute.route("/").get(
  verifyFunction,
  getAllMenuCategoryDetailsController
);
MenuCategoryRoute.route("/:id").get(
  verifyFunction,
  getMenuCategoryDetailByIdController
);
MenuCategoryRoute.route("/:id").put(
  verifyFunction,
  updateMenuCategoryController
);
MenuCategoryRoute.route("/:id").delete(
  verifyFunction,
  deleteMenuCategoryController
);

module.exports = { MenuCategoryRoute };
