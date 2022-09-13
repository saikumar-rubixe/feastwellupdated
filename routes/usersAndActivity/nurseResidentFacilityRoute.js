const express = require("express");
const nurseResident = express.Router();

const { verifyFunction } = require("../../helper/verifyjwtToken");

const {
  getReisdentsOfNurseIdController,
} = require("../../controller/usersAndActivity/nurseResidentFacilityController");

nurseResident.route("/").get(verifyFunction, getReisdentsOfNurseIdController);

module.exports = { nurseResident };
