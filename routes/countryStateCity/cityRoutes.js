const express = require("express");
const cityRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const {
  getAllDetailsController,
  createCityController,
  updateCityController,
  deleteCityController,
  getCityByCityIdController,

  getCitiesByStateIdController,
  getCitiesByCountryIdController,
} = require("../../controller/countryStateCity/citiesController");

const { checkRoutePermission } = require("../../helper/checkRoutePermission");

//^CREATE CITITES
cityRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
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
      message: "Unauthorized access",
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
      message: "Unauthorized access",
    });
  } else {
    await getCityByCityIdController(req, res);
  }
});

//* GET CITITES BY  STATE ID
cityRoute.get("/byStateId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await getCitiesByStateIdController(req, res);
  }
});

//* GET CITIES BY COUNTRY ID
cityRoute.get("/byCountryId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await getCitiesByCountryIdController(req, res);
  }
});

//? update city by city id
cityRoute.put("/byCityId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await updateCityController(req, res);
  }
});

//! delete city by city id
cityRoute.delete("/byCityId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await deleteCityController(req, res);
  }
});
//! delete city by state id
// cityRoute.delete("/byStateId/:id", async (req, res) => {
//   const permission = await checkRoutePermission(req);
//   if (permission !== 1) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorized access",
//     });
//   } else {
//     await getCitiesByCountryIdController(req, res);
//   }
// })
// //! delete city by country id
// cityRoute.delete("/byCountryId/:id", async (req, res) => {
//   const permission = await checkRoutePermission(req);
//   if (permission !== 1) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorized access",
//     });
//   } else {
//     await getCitiesByCountryIdController(req, res);
//   }
// })
module.exports = { cityRoute };
