const {
  checkSideBarPermissionContoller,
  checkCRUDPermissionsController,
} = require("../../controller/sideBar/sideBarCheck");

const express = require("express");
const sideBarCheckRoute = express.Router();
const { checkRoutePermission } = require("../../helper/checkRoutePermission");

sideBarCheckRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await checkSideBarPermissionContoller(req, res);
  }
});

// sideBarCheckRoute.route("/:id").get(verify, getRolesDetailByIdController);
// sideBarCheckRoute.route("/:id").put(verify, updateRolesController);
// sideBarCheckRoute.route("/:id").delete(verify, deleteRolesController);
// sideBarCheckRoute.route("/").post(verify, createRolesController);

module.exports = { sideBarCheckRoute };
