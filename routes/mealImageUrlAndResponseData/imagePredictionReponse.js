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
imagePredictionResponse
  .route("/")
  .post(imageResponseBodyValidation, insertImagePredictionRespsonseController);
//* get image prediction details by reference ID (image details table id)
imagePredictionResponse
  .route("/byReferenceId/:id")
  .get(getImagePredictionResponseByReferenceIdController);

//*get the image prediction response details by table Id
imagePredictionResponse
  .route("/byId/:id")
  .get(getImagePredictionResponseByIdController);

module.exports = { imagePredictionResponse };
