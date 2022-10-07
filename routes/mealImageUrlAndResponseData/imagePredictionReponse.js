const express = require("express");
const imagePredictionResponse = express.Router();

const {
  imageResponseBodyValidation,
} = require("../../validation/mealImageUrlAndResponseDataValidation.js/imageResponseValidation");

const { checkRoutePermission } = require("../../helper/checkRoutePermission");

const {
  insertImagePredictionRespsonseController,
  getImagePredictionResponseByReferenceIdController,
  getImagePredictionResponseByIdController,
} = require("../../controller/mealImageUrlAndRepsonseData/imageRepsonseController.js");

//^ Create image prediction response
imagePredictionResponse.post("/", async (req, res) => {
  const err = await imageResponseBodyValidation(req);
  if (err) {
    return res.status(400).json({
      error: err.message,
      message: "request body validation error",
    });
  } else {
    await insertImagePredictionRespsonseController(req, res);
  }
});

//* get image prediction details by reference ID (image details table id)
imagePredictionResponse.get("/byReferenceId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await getImagePredictionResponseByReferenceIdController(req, res);
  }
});

//*get the image prediction response details by table Id
imagePredictionResponse.get("/byId/:id", async (req, res) => {
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    await getImagePredictionResponseByIdController(req, res);
  }
});

module.exports = { imagePredictionResponse };
