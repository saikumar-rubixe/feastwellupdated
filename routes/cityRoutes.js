const express = require("express");
const cityRoute = express.Router();
const {
  getCitiesByIdController,
} = require("../controller/CountryApicontroller");

cityRoute.route("/:id").get(getCitiesByIdController);

module.exports = { cityRoute };
