const express = require("express");
const facilityAnalyticsResponseRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");

const {
  FacilityAnalyticsResponseController,
} = require("../../controller/analytics/FacilityAnalyticsResponseController");

//* GET
/**
 request: userid and meal id

 */
facilityAnalyticsResponseRoute.get("/facility/", async (req, res) => {
  // const err = await nutrientsBodyValidation(req);
  // if (err) {
  //   return res.status(400).json({
  //     error: err.message,
  //     message: "request body validation error",
  //   });
  // } else {
  await FacilityAnalyticsResponseController(req, res);
  // }
});

module.exports = { facilityAnalyticsResponseRoute };
