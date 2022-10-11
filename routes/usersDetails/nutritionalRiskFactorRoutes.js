const express = require("express");
const NutritionalRiskFactorRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");
const {
  getAllNutritionalRiskFactorsDetailsController,
} = require("../../controller/usersDetails/nutritionRiskFactorController");

//*GET DETAILS
NutritionalRiskFactorRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getAllNutritionalRiskFactorsDetailsController(req, res);
  }
});

module.exports = { NutritionalRiskFactorRoute };
