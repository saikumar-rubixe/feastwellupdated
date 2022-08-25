const express = require("express");
const cityRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getCitiesByIdController,
  createCityController,
  getAllDetailsController,
} = require("../../controller/countryStateCity/citiesController");

//* GET CITITES BY  STATE ID
cityRoute.route("/:id").get(verifyFunction, getCitiesByIdController);

//^CREATE CITITES
cityRoute.route("/").post(verifyFunction, createCityController);

//* GET ALL CITIES
cityRoute.route("/").get(verifyFunction, getAllDetailsController);

module.exports = { cityRoute };
