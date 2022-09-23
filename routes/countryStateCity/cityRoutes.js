const express = require("express");
const cityRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const {
  getCitiesByIdController,
  createCityController,
  getAllDetailsController,
  getCityByCityIdController,
} = require("../../controller/countryStateCity/citiesController");

const { checkRoutePermission } = require("../../helper/checkRoutePermission");

//* GET CITITES BY  STATE ID

cityRoute.get("/byStateId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getCitiesByIdController(req, res);
  }
});

//^CREATE CITITES
cityRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await createCityController(req, res);
  }
});
//route("/").post(verify, createCityController);

//* GET ALL CITIES
cityRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getAllDetailsController(req, res);
  }
});

//* GET CITY BY CITY ID

cityRoute.get("/byCityId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getCityByCityIdController(req, res);
  }
});

module.exports = { cityRoute };
