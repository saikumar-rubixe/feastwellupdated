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

//^ create
facilityRoute
  .route("/")
  .post(
    verifyFunction,
    FacilityUserBodyValidation,
    insertFacilityCenterDetailsController
  );
//* get all
facilityRoute
  .route("/")
  .get(verifyFunction, getAllFacilityCenterDetailsController);
//* get by Id
facilityRoute
  .route("/:id")
  .get(verifyFunction, getFacilityCenterDetailsByIdController);
//? Update
facilityRoute
  .route("/:id")
  .put(verifyFunction, updateFacilityCenterDetailsController);
//! DELETE
facilityRoute
  .route("/:id")
  .delete(verifyFunction, deleteFacilityCenterDetailsController);

module.exports = { facilityRoute };
