const express = require("express");
const residentDetailsRoutes = express.Router();
const { verify } = require("../../helper/verifyjwtToken");

const { checkRoutePermission } = require("../../helper/checkRoutePermission");
const {
  residentAdditionalInformationBodyValidation,
} = require("../../validation/usersAndActivity/residentAdditionalDetailsValidation");

const {
  insertResidentDetailsController,
  getallResidentDetailsController,
  getResidentDetailByIdController,
  updateResidentDetailsController,
} = require("../../controller/usersDetails/residentController");

//^ create
residentDetailsRoutes.post("/", async (req, res) => {
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
      return res.status(500).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await insertResidentDetailsController(req, res);
    }
  }
});

// *get all details
residentDetailsRoutes.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getallResidentDetailsController(req, res);
  }
});

//*get detail By Id
residentDetailsRoutes.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getResidentDetailByIdController(req, res);
  }
});

//? update details  By Id
residentDetailsRoutes.put("/:userId", async (req, res) => {
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
      return res.status(500).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await updateResidentDetailsController(req, res);
    }
  }
});

module.exports = { residentDetailsRoutes };
