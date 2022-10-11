const express = require("express");
const residentCarePlanRoutes = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");
const {
  residentCarePlanBodyValidation,
} = require("../../validation/usersAndActivity/residentCarePlanValidation");

const {
  insertResidentCarePlanDetailsController,
  getallResidentCarePlanDetailsController,
  getResidentCarePlanDetailByIdController,
  updateResidentCarePlanDetailsController,
  deleteResidentCarePlanDetailsController,
} = require("../../controller/usersDetails/residentCarePlanController");

//^ create
residentCarePlanRoutes.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    const err = await residentCarePlanBodyValidation(req);
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
        message: "Request Body Validation Error",
      });
    } else {
      await insertResidentCarePlanDetailsController(req, res);
    }
    //  await insertResidentCarePlanDetailsController(req, res);
  }
});

// *get all details
residentCarePlanRoutes.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
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
      message: "Unauthorized Access",
    });
  } else {
    await getResidentCarePlanDetailByIdController(req, res);
  }
});

//? update details  By Id
residentCarePlanRoutes.put("/:userId", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    const err = await residentCarePlanBodyValidation(req);
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Request Body Validation Error",
      });
    } else {
      await updateResidentCarePlanDetailsController(req, res);
    }
  }
});

//! delete residents care plan details by user id
residentCarePlanRoutes.delete("/:id", async (req, res) => {
  await deleteResidentCarePlanDetailsController(req, res);
});

module.exports = { residentCarePlanRoutes };
