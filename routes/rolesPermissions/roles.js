const express = require("express");
const rolesRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");
const {
  getRolesDetailByIdController,
  getAllRolesDetailsController,
  createRolesController,
  updateRolesController,
  deleteRolesController,
} = require("../../controller/rolesPermissions/rolesController.js");

//* GET Details By Id
rolesRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getRolesDetailByIdController(req, res);
  }
});

//? Update
rolesRoute.put("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await updateRolesController(req, res);
  }
});

//!delete
rolesRoute.delete("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await deleteRolesController(req, res);
  }
});
//* Get ALL Details
rolesRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getAllRolesDetailsController(req, res);
  }
});
// ^ Create
rolesRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await createRolesController(req, res);
  }
});

module.exports = { rolesRoute };
