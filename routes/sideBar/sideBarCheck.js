const {
  checkSideBarPermissionContoller,
  checkCRUDPermissionsController,
} = require("../../controller/sideBar/sideBarCheck");

const express = require("express");
const sideBarCheckRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");

// sideBarCheckRoute.route("/:id").get(verifyFunction, getRolesDetailByIdController);
// sideBarCheckRoute.route("/:id").put(verifyFunction, updateRolesController);
// sideBarCheckRoute.route("/:id").delete(verifyFunction, deleteRolesController);
sideBarCheckRoute.route("/").post(checkSideBarPermissionContoller);
// sideBarCheckRoute.route("/").post(verifyFunction, createRolesController);

module.exports = { sideBarCheckRoute };
