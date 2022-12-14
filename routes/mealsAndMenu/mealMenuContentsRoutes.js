//getMealMenuContentsDetailByIdController
// * IMPORTS
const express = require("express");
const menuContentsRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");
const {
  mealContentsBodyValidation,
} = require("../../validation/mealsAndMenu/mealMenuContentsValidation");
const {
  getAllMealMenuContentsDetailsController,
  getMealMenuContentsDetailByIdController,
  createMealMenuContentsController,
  updateMealMenuContentsController,
  deleteMealMenuContentsController,
} = require("../../controller/mealsAndMenu/mealMenuContentsController.js");

//************  Routes ****************

//^ Create
menuContentsRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    const err = await mealContentsBodyValidation(req);
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Request Body Validation Error",
      });
    } else {
      await createMealMenuContentsController(req, res);
    }
  }
});

//* Get ALL
menuContentsRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getAllMealMenuContentsDetailsController(req, res);
  }
});

//* Get By Id
menuContentsRoute.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getMealMenuContentsDetailByIdController(req, res);
  }
});

//? Update
menuContentsRoute.put("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await updateMealMenuContentsController(req, res);
  }
});

//! Delete
menuContentsRoute.delete("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await deleteMealMenuContentsController(req, res);
  }
});

module.exports = { menuContentsRoute };
