const express = require("express");
const residentFacilityRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  userFacilityBodyValidation,
} = require("../../validation/mappings/userFacilityMapValidation");
const {
  getUserFacilityDetailByUserIdController,
  getUserFacilityDetailByIdController,
  getAllUserFacilityDetailsController,
  createUserFacilityController,
  updateUserFacilityByUserIdController,
  deleteUserFacilityController,
} = require("../../controller/mappings/userFacilityMapController");

// get the details by facility id
residentFacilityRoute
  .route("/:id")
  .get(verifyFunction, getUserFacilityDetailByIdController);
//^ create
residentFacilityRoute
  .route("/")
  .post(
    verifyFunction,
    userFacilityBodyValidation,
    createUserFacilityController
  );
residentFacilityRoute
  .route("/")
  .get(verifyFunction, getAllUserFacilityDetailsController);
//? update
residentFacilityRoute
  .route("/:id")
  .put(verifyFunction, updateUserFacilityByUserIdController);
//! delete
residentFacilityRoute
  .route("/:id")
  .delete(verifyFunction, deleteUserFacilityController);
// get the Single  detail by table id
// residentFacilityRoute
//   .route("/byId/:id")
//   .get(verifyFunction, getUserFacilityDetailByTableIdController);

// get the Single  detail by USER id
//* get
residentFacilityRoute
  .route("/byUserId/:id")
  .get(verifyFunction, getUserFacilityDetailByUserIdController);

module.exports = { residentFacilityRoute };

//* get
//? update
//^ create
//! delete
