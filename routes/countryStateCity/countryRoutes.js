const express = require("express");
const countryRoute = express.Router();
const {
  getAllCountryController,
  getCountryByIdController,
  createCountryController,
  updateCountryController,
  deleteCountryController,
} = require("../../controller/countryStateCity/CountryApicontroller");

const { checkRoutePermission } = require("../../helper/checkRoutePermission");
//* GET ALL COUNTRIES

countryRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getAllCountryController(req, res);
  }
});
//* GET BY ID

countryRoute.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await getCountryByIdController(req, res);
  }
});
//^ CREATE

countryRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await createCountryController(req, res);
  }
});
//?  UPDATE

countryRoute.put("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await updateCountryController(req, res);
  }
});
//! DELETE

countryRoute.delete("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    await deleteCountryController(req, res);
  }
});

module.exports = { countryRoute };
