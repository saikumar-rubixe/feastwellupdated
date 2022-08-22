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
//* GET ALL COUNTRIES
countryRoute.route("/").get(verifyFunction, getAllCountryController);
//* GET BY ID
countryRoute.route("/:id").get(verifyFunction, getCountryByIdController);
//^ CREATE
countryRoute.route("/").post(verifyFunction, createCountryController);
//?  UPDATE
countryRoute.route("/:id").put(verifyFunction, updateCountryController);
//! DELETE
countryRoute.route("/:id").delete(verifyFunction, deleteCountryController);

module.exports = { countryRoute };
