const express = require("express");
const cityRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getCitiesByIdController,
  createCityController,
  getAllDetailsController,
} = require("../../controller/countryStateCity/citiesController");

cityRoute.route("/:id").get(verifyFunction, getCitiesByIdController);
cityRoute.route("/").post(verifyFunction, createCityController);
cityRoute.route("/").get(verifyFunction, getAllDetailsController);

module.exports = { cityRoute };
