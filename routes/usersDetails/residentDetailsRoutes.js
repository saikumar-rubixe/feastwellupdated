const express = require("express");
const residentDetailsRoutes = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");

const {
  residentAdditionalInformationBodyValidation,
} = require("../../validation/usersAndActivity/residentAdditionalDetailsValidation");

const {
  insertResidentDetailsController,
  getallResidentDetailsController,

  getResidentDetailByIdController,
  updateResidentDetailsController,
} = require("../../controller/usersDetails/residentController");

//^ create
residentDetailsRoutes
  .route("/")
  .post(
    verifyFunction,
    residentAdditionalInformationBodyValidation,
    insertResidentDetailsController
  );

// *get all details
residentDetailsRoutes
  .route("/")
  .get(verifyFunction, getallResidentDetailsController);

//*get detail By Id
residentDetailsRoutes
  .route("/:id")
  .get(verifyFunction, getResidentDetailByIdController);

//? update details  By Id
residentDetailsRoutes
  .route("/:userId")
  .put(
    verifyFunction,
    residentAdditionalInformationBodyValidation,
    updateResidentDetailsController
  );

module.exports = { residentDetailsRoutes };
