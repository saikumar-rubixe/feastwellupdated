const express = require("express");
const permissionsRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");

// controller imports
const {
  getAllPermissionsDetailsController,
  getPermissionsDetailByIdController,
  createPermissionsController,
  updatePermissionsController,
  deletePermissionsController,
} = require("../../controller/rolesPermissions/permissionsController.js");

//^Create
permissionsRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await createPermissionsController(req, res);
  }
});

//* get ALL Details
permissionsRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getAllPermissionsDetailsController(req, res);
  }
});

//* get details By Id
permissionsRoute.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getPermissionsDetailByIdController(req, res);
  }
});

//? Update Details By Id
permissionsRoute.put("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await updatePermissionsController(req, res);
  }
});

//!Delete details By Id
permissionsRoute.delete("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await deletePermissionsController(req, res);
  }
});

module.exports = { permissionsRoute };
