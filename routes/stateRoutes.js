const express = require("express");
const statesRoute = express.Router();
const {
  getStatesByIdController,
  getAllStatesDetailsController,
  createStatesController,
  updateStatesController,
  deleteStatesController,
} = require("../controller/statesController");

statesRoute.route("/:id").get(getStatesByIdController);
statesRoute.route("/").post(createStatesController);
statesRoute.route("/").get(getAllStatesDetailsController);
statesRoute.route("/:id").put(updateStatesController);
statesRoute.route("/:id").delete(deleteStatesController);

module.exports = { statesRoute };
