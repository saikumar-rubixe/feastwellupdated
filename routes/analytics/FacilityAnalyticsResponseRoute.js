const express = require("express");
const facilityAnalyticsResponseRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");

const {
  facilityAnalyticsResponseController,
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
  //     message: "Request Body Validation Error",
  //   });
  // } else {
  await facilityAnalyticsResponseController(req, res);
  // }
});

module.exports = { facilityAnalyticsResponseRoute };
