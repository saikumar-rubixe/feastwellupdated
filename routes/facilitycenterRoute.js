const express = require("express");
const facilityRoute = express.Router();
const {
  getFacilityCenterDetailsByIdController,
  getAllFacilityCenterDetailsController,
  insertFacilityCenterDetailsController,
  updateFacilityCenterDetailsController,
  deleteFacilityCenterDetailsController,
} = require("../controller/facilityCenterController");

facilityRoute.route("/").post(insertFacilityCenterDetailsController);
facilityRoute.route("/").get(getAllFacilityCenterDetailsController);
facilityRoute.route("/:id").get(getFacilityCenterDetailsByIdController);
facilityRoute.route("/:id").put(updateFacilityCenterDetailsController);
facilityRoute.route("/:id").delete(deleteFacilityCenterDetailsController);

module.exports = { facilityRoute };
