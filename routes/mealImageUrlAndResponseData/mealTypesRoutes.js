const express = require("express");
const mealTypes = express.Router();
const {
  getAllMealTypesController,
} = require("../../controller/mealImageUrlAndRepsonseData/mealTypesController");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");

mealTypes.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getAllMealTypesController(req, res);
  }
});

module.exports = { mealTypes };
