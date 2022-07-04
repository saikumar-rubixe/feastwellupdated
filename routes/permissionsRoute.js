const express = require("express");
const permissionsRoute = express.Router();
const {
  getpermissionsDetailByIdController,
} = require("../controller/permissionsController");

//permissionsRoute.route("/").post(Insert);
//permissionsRoute.route("/").get(getAll);
permissionsRoute.route("/:id").get(getpermissionsDetailByIdController);
//permissionsRoute.route("/:id").put(update);
//permissionsRoute.route("/:id").delete(deleted);

module.exports = { permissionsRoute };
