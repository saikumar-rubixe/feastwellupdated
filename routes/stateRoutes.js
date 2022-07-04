const express = require("express");
const statesRoute = express.Router();
const {
  getStatesByIdController,
} = require("../controller/CountryApicontroller");

statesRoute.route("/:id").get(getStatesByIdController);

module.exports = { statesRoute };
