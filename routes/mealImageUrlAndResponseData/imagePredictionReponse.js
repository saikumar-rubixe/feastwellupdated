const express = require("express");
const imagePredictionResponse = express.Router();
const {
  insertImagePredictionRespsonseController,
  getImagePredictionResponseByReferenceIdController,
  getImagePredictionResponseByIdController,
} = require("../../controller/mealImageUrlAndRepsonseData/imageRepsonseController.js");
imagePredictionResponse
  .route("/")
  .post(insertImagePredictionRespsonseController);

imagePredictionResponse
  .route("/byReferenceId/:id")
  .get(getImagePredictionResponseByReferenceIdController);
imagePredictionResponse
  .route("/byId/:id")
  .get(getImagePredictionResponseByIdController);

module.exports = { imagePredictionResponse };
