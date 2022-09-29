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

//^ Create User Details
residentRoute.post("/", async (req, res) => {
  const err = await residentValidation(req);
  if (err) {
    return res.status(400).json({
      error: err.message,
      message: "request body validation error",
    });
  } else {
    await createResidentController(req, res);
  }
});

//* get user details by Id(userId)
residentRoute.get("/:id", async (req, res) => {
  await getResidentByIdController(req, res);
});

//! get all users details
residentRoute.get("/", async (req, res) => {
  await getAllResidentsController(req, res);
});

//^ get all users details of resident
residentRoute.get("/facility/", async (req, res) => {
  await getAllResidentsOfFacilityController(req, res);
});

//? Update the user details BY ID(userId)
residentRoute.put("/:id", async (req, res) => {
  const err = await updateResidentValidation(req);
  if (err) {
    return res.status(400).json({
      error: err.message,
      message: "request body validation error",
    });
  } else {
    await updateResidentController(req, res);
  }
});

//! Delete User Details
residentRoute.delete("/:id", async (req, res) => {
  await deleteResidentController(req, res);
});

module.exports = { residentRoute };
