const express = require("express");
const countryRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getAllCountryController,
  getCountryByIdController,
  createCountryController,
  updateCountryController,
  deleteCountryController,
} = require("../../controller/countryStateCity/CountryApicontroller");

countryRoute.route("/").get(verifyFunction, getAllCountryController);
countryRoute.route("/:id").get(verifyFunction, getCountryByIdController);
countryRoute.route("/").post(verifyFunction, createCountryController);
countryRoute.route("/:id").put(verifyFunction, updateCountryController);
countryRoute.route("/:id").delete(verifyFunction, deleteCountryController);

module.exports = { countryRoute };
