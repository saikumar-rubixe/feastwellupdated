const express = require("express");
const residentFacilityRoute = express.Router();
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
// get the details by facility id
residentFacilityRoute.get("/:id", async (req, res) => {
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
residentFacilityRoute.post("/", async (req, res) => {
  console.log(`im in the router to check permission`); //delete
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    const err = await userFacilityBodyValidation(req);
    if (err) {
      return res.status(500).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await createUserFacilityController(req, res);
    }
  }
});

residentFacilityRoute.get("/", async (req, res) => {
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
residentFacilityRoute.put("/:id", async (req, res) => {
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
residentFacilityRoute
  .delete("/:id", async (req, res) => {
    const permission = await checkRoutePermission(req);
    if (permission !== 1) {
      res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    } else {
      await deleteUserFacilityController(req, res);
    }
  })
  .route("/:id")
  .delete(verify, deleteUserFacilityController);

//* get
residentFacilityRoute.get("/byUserId/:id", async (req, res) => {
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
// residentFacilityRoute
//   .route("/byId/:id")
//   .get(verify, getUserFacilityDetailByTableIdController);

// get the Single  detail by USER id

module.exports = { residentFacilityRoute };

//* get
//? update
//^ create
//! delete
