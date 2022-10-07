const express = require("express");
const mealMenuRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");

const {
  getMealMenuDetailByIdController,
  getAllMealMenuDetailsController,
  createMealMenuController,
  updateMealMenuController,
  deleteMealMenuController,
} = require("../../controller/mealsAndMenu/mealMenuController");

//^ Create
mealMenuRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await createMealMenuController(req, res);
  }
});

//* get All Details
mealMenuRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await getAllMealMenuDetailsController(req, res);
  }
});

//* get details By Id
mealMenuRoute.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await getMealMenuDetailByIdController(req, res);
  }
});

//? Update Details By Id
mealMenuRoute.put("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await updateMealMenuController(req, res);
  }
});

//! Delete Details By Id
mealMenuRoute.delete("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await deleteMealMenuController(req, res);
  }
});

module.exports = { mealMenuRoute };
