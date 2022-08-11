const express = require("express");
const facilityRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getFacilityCenterDetailsByIdController,
  getAllFacilityCenterDetailsController,
  insertFacilityCenterDetailsController,
  updateFacilityCenterDetailsController,
  deleteFacilityCenterDetailsController,
} = require("../../controller/facility/facilityController");
const {
  FacilityUserBodyValidation,
} = require("../../validation/facility/facilityValidation");
facilityRoute
  .route("/")
  .post(
    verifyFunction,
    FacilityUserBodyValidation,
    insertFacilityCenterDetailsController
  );
facilityRoute
  .route("/")
  .get(verifyFunction, getAllFacilityCenterDetailsController);
facilityRoute
  .route("/:id")
  .get(verifyFunction, getFacilityCenterDetailsByIdController);
facilityRoute
  .route("/:id")
  .put(verifyFunction, updateFacilityCenterDetailsController);
facilityRoute
  .route("/:id")
  .delete(verifyFunction, deleteFacilityCenterDetailsController);

module.exports = { facilityRoute };
