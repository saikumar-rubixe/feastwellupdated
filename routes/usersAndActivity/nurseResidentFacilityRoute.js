const express = require("express");
const nurseResident = express.Router();

const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");

const {
  getReisdentsOfNurseIdController,
} = require("../../controller/usersAndActivity/nurseResidentFacilityController");

//* get all  residents of facility where nurse works
nurseResident.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await getReisdentsOfNurseIdController(req, res);
  }
});

module.exports = { nurseResident };
