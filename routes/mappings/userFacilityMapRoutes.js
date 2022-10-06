const express = require("express");
const userFacilityRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");

const {
  userFacilityBodyValidation,
} = require("../../validation/mappings/userFacilityMapValidation");

const {
  getUserFacilityDetailByUserIdController,
  getUserFacilityDetailByIdController,
  getAllUserFacilityDetailsController,
  createUserFacilityController,
  updateUserFacilityByUserIdController,
  deleteUserFacilityController,
} = require("../../controller/mappings/userFacilityMapController");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");

// *get the details by facility id
userFacilityRoute.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getUserFacilityDetailByIdController(req, res);
  }
});

//^ create
userFacilityRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  console.log(`permission for user failty is ${permission}`);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    const err = await userFacilityBodyValidation(req);
    if (err) {
      return res.status(400).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await createUserFacilityController(req, res);
    }
  }
});

//* get all user facility
userFacilityRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getAllUserFacilityDetailsController(req, res);
  }
});

//? update
userFacilityRoute.put("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await updateUserFacilityByUserIdController(req, res);
  }
});

//! delete
userFacilityRoute.delete("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await deleteUserFacilityController(req, res);
  }
});

//* get
userFacilityRoute.get("/byUserId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getUserFacilityDetailByUserIdController(req, res);
  }
});

// get the Single  detail by table id
// userFacilityRoute
//   .route("/byId/:id")
//   .get(verify, getUserFacilityDetailByTableIdController);

// get the Single  detail by USER id

module.exports = { userFacilityRoute };

//* get
//? update
//^ create
//! delete
