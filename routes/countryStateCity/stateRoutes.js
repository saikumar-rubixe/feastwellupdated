const express = require("express");
const statesRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getStatesByIdController,
  getAllStatesDetailsController,
  createStatesController,
  updateStatesController,
  deleteStatesController,
  getStatesByStateIdController,
} = require("../../controller/countryStateCity/statesController");
//get states by state id
statesRoute.route("/byId/:id").get(getStatesByStateIdController);
//get states by country id
statesRoute.route("/:id").get(getStatesByIdController);
//get all states
statesRoute.route("/").get(getAllStatesDetailsController);
// create states by id
statesRoute.route("/").post(createStatesController);
// update states by state is
statesRoute.route("/:id").put(updateStatesController);
// delete states by state id
statesRoute.route("/:id").delete(deleteStatesController);

module.exports = { statesRoute };
