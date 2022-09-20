const express = require("express");
const statesRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const {
  createStatesController,
  getAllStatesDetailsController,
  updateStatesByStateIdController,
  getStatesByStateIdController,
  deleteStatesByStateIdController,

  getStatesByCountryIdController,
  updateStatesByCountryIdController,
  deleteStatesByCountryIdController,
} = require("../../controller/countryStateCity/statesController");

// ^create states by id
statesRoute.route("/").post(createStatesController);

//*get all states
statesRoute.route("/").get(getAllStatesDetailsController);

//*get state by state id
statesRoute.route("/byStateId/:id").get(getStatesByStateIdController);

// ?update states by state id
statesRoute.route("/byStateId/:id").put(updateStatesByStateIdController);

//! delete states by state id
statesRoute.route("/byStateId/:id").delete(deleteStatesByStateIdController);

// BY COUNTRY ID'S

//*get states by country id
statesRoute.route("/byCountryId/:id").get(getStatesByCountryIdController);

//? update states by country id
statesRoute.route("/byCountryId/:id").put(updateStatesByCountryIdController);

//! delete states by country Id
statesRoute.route("/byCountryId/:id").delete(deleteStatesByCountryIdController);

module.exports = { statesRoute };
