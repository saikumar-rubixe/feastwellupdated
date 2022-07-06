const express = require("express");
const rolesRoute = express.Router();
const {
  getRolesDetailByIdController,
  getAllRolesDetailsController,
  createRolesController,
  updateRolesController,
  deleteRolesController,
} = require("../controller/rolesController");

rolesRoute.route("/:id").get(getRolesDetailByIdController);
rolesRoute.route("/:id").put(updateRolesController);
rolesRoute.route("/:id").delete(deleteRolesController);
rolesRoute.route("/").get(getAllRolesDetailsController);
rolesRoute.route("/").post(createRolesController);

module.exports = { rolesRoute };
