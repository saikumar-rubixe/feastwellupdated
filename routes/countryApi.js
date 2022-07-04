const express = require("express");
const countryRoute = express.Router();
const { getCountryController } = require("../controller/CountryApicontroller");

countryRoute.route("/").get(getCountryController);

module.exports = { countryRoute };
