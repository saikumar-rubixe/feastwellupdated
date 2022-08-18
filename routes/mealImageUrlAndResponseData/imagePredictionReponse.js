const express = require("express");
const imagePredictionResponse = express.Router();

const {
  imageResponseBodyValidation,
} = require("../../validation/mealImageUrlAndResponseDataValidation.js/imageResponseValidation");

const {
  insertImagePredictionRespsonseController,
  getImagePredictionResponseByReferenceIdController,
  getImagePredictionResponseByIdController,
} = require("../../controller/mealImageUrlAndRepsonseData/imageRepsonseController.js");

imagePredictionResponse
  .route("/")
  .post(imageResponseBodyValidation, insertImagePredictionRespsonseController);

imagePredictionResponse
  .route("/byReferenceId/:id")
  .get(getImagePredictionResponseByReferenceIdController);

imagePredictionResponse
  .route("/byId/:id")
  .get(getImagePredictionResponseByIdController);

module.exports = { imagePredictionResponse };
