const express = require("express");
const residentRoute = express.Router();

const {
  residentValidation,
  updateResidentValidation,
} = require("../../validation/usersAndActivity/residentValidation");

const { checkRoutePermission } = require("../../helper/checkRoutePermission");

const {
  createResidentController,
  updateResidentController,
  deleteResidentController,
  getResidentByIdController,
  getAllResidentsController,
  getAllResidentsOfFacilityController,
} = require("../../controller/usersDetails/residentController");

//^ Create resident Details
residentRoute.post("/", async (req, res) => {
  const err = await residentValidation(req);
  if (err) {
    return res.status(400).json({
      error: err,
      message: "Request Body Validation Error",
    });
  } else {
    await createResidentController(req, res);
  }
});

//* get resident details by Id(userId)
residentRoute.get("/:id", async (req, res) => {
  await getResidentByIdController(req, res);
});

//! get all residents details
residentRoute.get("/", async (req, res) => {
  await getAllResidentsController(req, res);
});

//^ get all residents details of resident
residentRoute.get("/facility/", async (req, res) => {
  await getAllResidentsOfFacilityController(req, res);
});

//? Update the residents details BY ID(userId)
residentRoute.put("/:id", async (req, res) => {
  const err = await updateResidentValidation(req);
  if (err) {
    return res.status(400).json({
      error: err,
      message: "Request Body Validation Error",
    });
  } else {
    await updateResidentController(req, res);
  }
});

//! Delete resident Details
residentRoute.delete("/:id", async (req, res) => {
  await deleteResidentController(req, res);
});

module.exports = { residentRoute };
