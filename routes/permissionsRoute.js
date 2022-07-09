const express = require("express");
const permissionsRoute = express.Router();
const {
  getAllPermissionsDetailsController,
  getPermissionsDetailByIdController,
  createPermissionsController,
  updatePermissionsController,
  deletePermissionsController,
} = require("../controller/permissionsController");

permissionsRoute.route("/").post(createPermissionsController);
permissionsRoute.route("/").get(getAllPermissionsDetailsController);
permissionsRoute.route("/:id").get(getPermissionsDetailByIdController);
permissionsRoute.route("/:id").put(updatePermissionsController);
permissionsRoute.route("/:id").delete(deletePermissionsController);

module.exports = { permissionsRoute };
