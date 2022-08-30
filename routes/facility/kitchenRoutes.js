const express = require("express");
const kitchenRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getKitchenDetailsByIdController,
  getAllKitchenDetailsController,
  insertKitchenDetailsController,
  updateKitchenDetailsController,
  deleteKitchenDetailsController,
} = require("../../controller/facility/kitchenController");
const {
  KitchenUserBodyValidation,
} = require("../../validation/facility/kitchenValidation");

//^ create
kitchenRoute
  .route("/")
  .post(
    verifyFunction,
    KitchenUserBodyValidation,
    insertKitchenDetailsController
  );
//* get all
kitchenRoute.route("/").get(verifyFunction, getAllKitchenDetailsController);
//* get by Id
kitchenRoute.route("/:id").get(verifyFunction, getKitchenDetailsByIdController);
//? Update
kitchenRoute.route("/:id").put(verifyFunction, updateKitchenDetailsController);
//! DELETE
kitchenRoute
  .route("/:id")
  .delete(verifyFunction, deleteKitchenDetailsController);

module.exports = { kitchenRoute };
