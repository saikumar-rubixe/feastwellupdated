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

//mealTypes.route("/").post(Insert);
//mealTypes.route("/:id").get(getById);
//mealTypes.route("/:id").put(update);
//mealTypes.route("/:id").delete(deleted);

module.exports = { mealTypes };
