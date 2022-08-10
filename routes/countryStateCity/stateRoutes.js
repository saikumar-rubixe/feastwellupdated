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

statesRoute.route("/:id").get(getStatesByIdController);
statesRoute.route("/byId/:id").get(getStatesByStateIdController);
statesRoute.route("/").post(createStatesController);
statesRoute.route("/").get(getAllStatesDetailsController);
statesRoute.route("/:id").put(updateStatesController);
statesRoute.route("/:id").delete(deleteStatesController);

module.exports = { statesRoute };
