const express = require("express");
const mealItemsRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");
const {
  mealItemsBodyValidation,
} = require("../../validation/mealsAndMenu/mealItemsValidation");
const {
  getMealItemsDetailByIdController,
  getAllMealItemsDetailsController,
  createMealItemsController,
  updateMealItemsController,
  deleteMealitemsController,
} = require("../../controller/mealsAndMenu/mealItemsController");
//^ create meal items
mealItemsRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission != 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    const err = await mealItemsBodyValidation(req);
    if (err) {
      return res.status(400).json({
        error: err.message,
        message: "Request Body Validation Error",
      });
    } else {
      await createMealItemsController(req, res);
    }
  }
});

//* get ALL meal items
mealItemsRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);

  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getAllMealItemsDetailsController(req, res);
  }
});

//? update meal items
mealItemsRoute.put("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await updateMealItemsController(req, res);
  }
});

//! Delete Meal Items
mealItemsRoute.delete("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);

  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await deleteMealitemsController(req, res);
  }
});

//* get Meal Items By Id
mealItemsRoute.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);

  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getMealItemsDetailByIdController(req, res);
  }
});

module.exports = { mealItemsRoute };
