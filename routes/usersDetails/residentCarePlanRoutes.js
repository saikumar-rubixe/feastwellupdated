const express = require("express");
const residentCarePlanRoutes = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");
const {
  residentCrePlanBodyValidation,
} = require("../../validation/usersAndActivity/residentCarePlanValidation");

const {
  insertResidentCarePlanDetailsController,
  getallResidentCarePlanDetailsController,
  getResidentCarePlanDetailByIdController,
  updateResidentCarePlanDetailsController,
} = require("../../controller/usersDetails/residentCarePlanController");

//^ create
residentCarePlanRoutes.post("/", async (req, res) => {
  console.log(`im in the router to check permission`); //delete
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    const err = await residentAdditionalInformationBodyValidation(req);
    if (err) {
      return res.status(400).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await insertResidentCarePlanDetailsController(req, res);
    }
  }
});

// *get all details
residentCarePlanRoutes.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getallResidentCarePlanDetailsController(req, res);
  }
});

//*get detail By Id
residentCarePlanRoutes.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getResidentCarePlanDetailByIdController(req, res);
  }
});

//? update details  By Id
residentCarePlanRoutes.put("/:userId", async (req, res) => {
  console.log(`im in the router to check permission`); //delete
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    const err = await residentAdditionalInformationBodyValidation(req);
    if (err) {
      return res.status(400).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await updateResidentCarePlanDetailsController(req, res);
    }
  }
});

module.exports = { residentCarePlanRoutes };
