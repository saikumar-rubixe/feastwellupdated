const express = require("express");
const userTypeRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");

const {
  getUserTypeDetailByIdController,
  getAllUserTypeDetailsController,
  createUserTypeController,
  updateUserTypeController,
  deleteUserTypeController,
} = require("../../controller/rolesPermissions/userTypeController.js");

//* get Details BY Id
userTypeRoute.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getUserTypeDetailByIdController(req, res);
  }
});

// ^ create userType
userTypeRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await createUserTypeController(req, res);
  }
});

//* get userType
userTypeRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getAllUserTypeDetailsController(req, res);
  }
});

//? update userTye
userTypeRoute.put("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await updateUserTypeController(req, res);
  }
});

//!delete userType
userTypeRoute.delete("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await deleteUserTypeController(req, res);
  }
});

module.exports = { userTypeRoute };
