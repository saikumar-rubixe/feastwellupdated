const express = require("express");
const facilityRoute = express.Router();

const {
  getFacilityCenterDetailsByIdController,
  getAllFacilityCenterDetailsController,
  insertFacilityCenterDetailsController,
  updateFacilityCenterDetailsController,
  deleteFacilityCenterDetailsController,
} = require("../../controller/facility/facilityController");

const { checkRoutePermission } = require("../../helper/checkRoutePermission");

const {
  FacilityUserBodyValidation,
} = require("../../validation/facility/facilityValidation");

//^ create
facilityRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    const err = await FacilityUserBodyValidation(req);
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Facility creation body validation error",
      });
    } else {
      await insertFacilityCenterDetailsController(req, res);
    }
  }
});

//* get all
facilityRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getAllFacilityCenterDetailsController(req, res);
  }
});

//* get by Id
facilityRoute.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getFacilityCenterDetailsByIdController(req, res);
  }
});

//? Update
facilityRoute.put("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    const err = await FacilityUserBodyValidation(req);
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Request Body Validation Error",
      });
    } else {
      await updateFacilityCenterDetailsController(req, res);
    }
  }
});

//! DELETE
facilityRoute.delete("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);

  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await deleteFacilityCenterDetailsController(req, res);
  }
});

module.exports = { facilityRoute };
