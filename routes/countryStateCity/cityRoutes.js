const express = require("express");
const cityRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const {
  getCitiesByIdController,
  createCityController,
  getAllDetailsController,
  getCityByCityIdController,
} = require("../../controller/countryStateCity/citiesController");

//* GET CITITES BY  STATE ID
cityRoute.route("/:id").get(verify, getCitiesByIdController);

//^CREATE CITITES
cityRoute.route("/").post(verify, createCityController);

//* GET ALL CITIES
cityRoute.route("/").get(verify, getAllDetailsController);

//* GET CITY BY CITY ID
cityRoute.route("/byCity/:id").get(verify, getCityByCityIdController);

module.exports = { cityRoute };
