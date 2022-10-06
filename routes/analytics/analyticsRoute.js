const express = require("express");
const analyticsRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");
const {
  getNutrientsController,
} = require("../../controller/analytics/analyticsController");
const {
  facilityAnalyticsResponseController,
} = require("../../controller/analytics/FacilityAnalyticsResponseController");

//* GET THE NUTRIENTS VALUES OF RESIDENT
/**
 request: userid and meal id

 */
analyticsRoute.get("/nutrients/", async (req, res) => {
  console.log(`in route`); //delete
  // const err = await nutrientsBodyValidation(req);
  // if (err) {
  //   return res.status(400).json({
  //     error: err.message,
  //     message: "request body validation error",
  //   });
  // } else {
  await getNutrientsController(req, res);
  // }
});

analyticsRoute.get("/facility/", async (req, res) => {
  // const err = await facilityValidation(req);
  // if (err) {
  //   return res.status(400).json({
  //     error: err.message,
  //     message: "request body validation error",
  //   });
  // } else {
  await facilityAnalyticsResponseController(req, res);
  // }
});

module.exports = { analyticsRoute };
