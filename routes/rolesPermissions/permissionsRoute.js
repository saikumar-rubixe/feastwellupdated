const express = require("express");
const permissionsRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getAllPermissionsDetailsController,
  getPermissionsDetailByIdController,
  createPermissionsController,
  updatePermissionsController,
  deletePermissionsController,
} = require("../../controller/rolesPermissions/permissionsController.js");
permissionsRoute.route("/").post(verifyFunction, createPermissionsController);
permissionsRoute
  .route("/")
  .get(verifyFunction, getAllPermissionsDetailsController);
permissionsRoute
  .route("/:id")
  .get(verifyFunction, getPermissionsDetailByIdController);
permissionsRoute.route("/:id").put(verifyFunction, updatePermissionsController);
permissionsRoute
  .route("/:id")
  .delete(verifyFunction, deletePermissionsController);

module.exports = { permissionsRoute };
