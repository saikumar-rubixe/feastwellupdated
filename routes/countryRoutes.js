const express = require("express");
const countryRoute = express.Router();
const {
  getAllCountryController,
  getCountryByIdController,
  createCountryController,
  updateCountryController,
  deleteCountryController,
} = require("../controller/CountryApicontroller");

countryRoute.route("/").get(getAllCountryController);
countryRoute.route("/:id").get(getCountryByIdController);
countryRoute.route("/").post(createCountryController);
countryRoute.route("/:id").put(updateCountryController);
countryRoute.route("/:id").delete(deleteCountryController);

module.exports = { countryRoute };
