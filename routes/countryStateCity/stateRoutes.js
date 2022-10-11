const express = require("express");
const statesRoute = express.Router();
const { checkRoutePermission } = require("../../helper/checkRoutePermission");
const {
  createStatesController,
  getAllStatesDetailsController,
  updateStatesByStateIdController,
  getStatesByStateIdController,
  deleteStatesByStateIdController,

  getStatesByCountryIdController,
  updateStatesByCountryIdController,
  deleteStatesByCountryIdController,
} = require("../../controller/countryStateCity/statesController");

// ^create states by id
statesRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await createStatesController(req, res);
  }
});

//*get all states
statesRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getAllStatesDetailsController(req, res);
  }
});

//*get state by state id
statesRoute.get("/byStateId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getStatesByStateIdController(req, res);
  }
});

// ?update states by state id
statesRoute.put("/byStateId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await updateStatesByStateIdController(req, res);
  }
});

//! delete states by state id
statesRoute.delete("/byStateId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await deleteStatesByStateIdController(req, res);
  }
});

// BY COUNTRY ID'S
//*get states by country id
//route("/byCountryId/:id").get(getStatesByCountryIdController);
statesRoute.get("/byCountryId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getStatesByCountryIdController(req, res);
  }
});

//? update states by country id
statesRoute.put("/byCountryId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await updateStatesByCountryIdController(req, res);
  }
});

//! delete states by country Id
statesRoute.delete("/byCountryId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await deleteStatesByCountryIdController(req, res);
  }
});

module.exports = { statesRoute };
