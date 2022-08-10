const express = require("express");
const NutritionalRiskFactorRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");

const {
  getAllNutritionalRiskFactorsDetailsController,
} = require("../../controller/usersDetails/nutritionRiskFactorController");

NutritionalRiskFactorRoute.route("/").get(
  verifyFunction,
  getAllNutritionalRiskFactorsDetailsController
);

module.exports = { NutritionalRiskFactorRoute };
