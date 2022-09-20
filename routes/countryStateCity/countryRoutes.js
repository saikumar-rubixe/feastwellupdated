const express = require("express");
const countryRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const {
  getAllCountryController,
  getCountryByIdController,
  createCountryController,
  updateCountryController,
  deleteCountryController,
} = require("../../controller/countryStateCity/CountryApicontroller");
//* GET ALL COUNTRIES
countryRoute.route("/").get(verify, getAllCountryController);
//* GET BY ID
countryRoute.route("/:id").get(verify, getCountryByIdController);
//^ CREATE
countryRoute.route("/").post(verify, createCountryController);
//?  UPDATE
countryRoute.route("/:id").put(verify, updateCountryController);
//! DELETE
countryRoute.route("/:id").delete(verify, deleteCountryController);

module.exports = { countryRoute };
