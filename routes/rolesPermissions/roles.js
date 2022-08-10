const express = require("express");
const rolesRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  getRolesDetailByIdController,
  getAllRolesDetailsController,
  createRolesController,
  updateRolesController,
  deleteRolesController,
} = require("../../controller/rolesPermissions/rolesController.js");
rolesRoute.route("/:id").get(verifyFunction, getRolesDetailByIdController);
rolesRoute.route("/:id").put(verifyFunction, updateRolesController);
rolesRoute.route("/:id").delete(verifyFunction, deleteRolesController);
rolesRoute.route("/").get(getAllRolesDetailsController);
rolesRoute.route("/").post(verifyFunction, createRolesController);

module.exports = { rolesRoute };
