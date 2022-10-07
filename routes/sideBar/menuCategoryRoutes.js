const express = require("express");
const MenuCategoryRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");

const {
  getMenuCategoryDetailByIdController,
  getAllMenuCategoryDetailsController,
  createMenuCategoryController,
  updateMenuCategoryController,
  deleteMenuCategoryController,
} = require("../../controller/sideBar/menuCategoryController");
//^Create
MenuCategoryRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await createMenuCategoryController(req, res);
  }
});

//* Get ALL Details

MenuCategoryRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await getAllMenuCategoryDetailsController(req, res);
  }
});

//*Get By Id
MenuCategoryRoute.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await getMenuCategoryDetailByIdController(req, res);
  }
});

//?Update
MenuCategoryRoute.put("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await updateMenuCategoryController(req, res);
  }
});

//!Delete
MenuCategoryRoute.delete("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await deleteMenuCategoryController(req, res);
  }
});

module.exports = { MenuCategoryRoute };
