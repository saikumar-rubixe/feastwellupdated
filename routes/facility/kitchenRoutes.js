const express = require("express");
const kitchenRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const {
  getKitchenDetailsByIdController,
  getAllKitchenDetailsController,
  insertKitchenDetailsController,
  updateKitchenDetailsController,
  deleteKitchenDetailsController,
} = require("../../controller/facility/kitchenController");

const { checkRoutePermission } = require("../../helper/checkRoutePermission");
const {
  KitchenUserBodyValidation,
} = require("../../validation/facility/kitchenValidation");

//^ create
kitchenRoute.post("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    const error = await KitchenUserBodyValidation(req);
    if (error) {
      return res.status(500).json({
        error: error.message,
        message: "Create Kitchen validation error",
      });
    } else {
      await insertKitchenDetailsController(req, res);
    }
  }
});

//* get all
kitchenRoute.get("/", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getAllKitchenDetailsController(req, res);
  }
});

//* get by Id
kitchenRoute.get("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await getKitchenDetailsByIdController(req, res);
  }
});

//? Update
kitchenRoute.put("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await updateKitchenDetailsController(req, res);
  }
});

//! DELETE
kitchenRoute.delete("/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  } else {
    await deleteKitchenDetailsController(req, res);
  }
});

module.exports = { kitchenRoute };
