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
  console.log(`im in the router to check permission`); //delete
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    const err = await mealItemsBodyValidation(req);
    if (err) {
      return res.status(500).json({
        error: err.message,
        message: "request body validation error",
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
      message: "unauthorized access",
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
      message: "unauthorized access",
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
      message: "unauthorized access",
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
      message: "unauthorized access",
    });
  } else {
    await getMealItemsDetailByIdController(req, res);
  }
});

module.exports = { mealItemsRoute };
