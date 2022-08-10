const express = require("express");
const residentFacilityRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");

const {
  getUserFacilityDetailByIdController,
  getAllUserFacilityDetailsController,
  createUserFacilityController,
  updateUserFacilityController,
  deleteUserFacilityController,
} = require("../../controller/mappings/userFacilityMapController");

residentFacilityRoute
  .route("/:id")
  .get(verifyFunction, getUserFacilityDetailByIdController);
residentFacilityRoute
  .route("/")
  .post(verifyFunction, createUserFacilityController);
residentFacilityRoute
  .route("/")
  .get(verifyFunction, getAllUserFacilityDetailsController);
residentFacilityRoute
  .route("/:id")
  .put(verifyFunction, updateUserFacilityController);
residentFacilityRoute
  .route("/:id")
  .delete(verifyFunction, deleteUserFacilityController);

module.exports = { residentFacilityRoute };
