const express = require("express");
const rolesRoute = express.Router();
const {
  getRolesDetailByIdController,
} = require("../controller/rolesController");

rolesRoute.route("/:id").get(getRolesDetailByIdController);

module.exports = { rolesRoute };
