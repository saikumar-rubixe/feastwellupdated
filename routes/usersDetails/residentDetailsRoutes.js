const express = require("express");
const residentDetailsRoutes = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");

const {
  insertResidentDetailsController,
  getallResidentDetailsController,
} = require("../../controller/usersDetails/residentController");

residentDetailsRoutes
  .route("/")
  .post(verifyFunction, insertResidentDetailsController);

residentDetailsRoutes
  .route("/")
  .get(verifyFunction, getallResidentDetailsController);
module.exports = { residentDetailsRoutes };
