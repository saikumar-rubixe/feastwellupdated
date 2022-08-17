const express = require("express");
const residentDetailsRoutes = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");

const {
  residentAdditionalInformationBodyValidation,
} = require("../../validation/usersAndActivity/residentAdditionalDetailsValidation");

const {
  insertResidentDetailsController,
  getallResidentDetailsController,
} = require("../../controller/usersDetails/residentController");

residentDetailsRoutes
  .route("/")
  .post(
    verifyFunction,
    residentAdditionalInformationBodyValidation,
    insertResidentDetailsController
  );

residentDetailsRoutes
  .route("/")
  .get(verifyFunction, getallResidentDetailsController);
module.exports = { residentDetailsRoutes };
