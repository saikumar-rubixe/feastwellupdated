const express = require("express");
const residentFacilityRoute = express.Router();

const {
  getResidentFacilityDetailByIdController,
  getAllResidentFacilityDetailsController,
  createResidentFacilityController,
  updateResidentFacilityController,
  deleteResidentFacilityController,
} = require("../controller/residentFacilityMapController");

residentFacilityRoute
  .route("/:id")
  .get(getResidentFacilityDetailByIdController);
residentFacilityRoute.route("/").post(createResidentFacilityController);
residentFacilityRoute.route("/").get(getAllResidentFacilityDetailsController);
residentFacilityRoute.route("/:id").put(updateResidentFacilityController);
residentFacilityRoute.route("/:id").delete(deleteResidentFacilityController);

module.exports = { residentFacilityRoute };
