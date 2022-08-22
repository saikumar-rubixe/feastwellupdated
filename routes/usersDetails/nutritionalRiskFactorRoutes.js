const express = require("express");
const NutritionalRiskFactorRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");

const {
  getAllNutritionalRiskFactorsDetailsController,
} = require("../../controller/usersDetails/nutritionRiskFactorController");

//*GET DETAILS
NutritionalRiskFactorRoute.route("/").get(
  verifyFunction,
  getAllNutritionalRiskFactorsDetailsController
);

module.exports = { NutritionalRiskFactorRoute };
