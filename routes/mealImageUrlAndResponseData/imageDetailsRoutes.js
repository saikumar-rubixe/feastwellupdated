const express = require("express");
const imageDetailsRoute = express.Router();

const {
  imageResponseBodyValidation,
} = require("../../validation/mealImageUrlAndResponseDataValidation.js/imageDetailsValidation");
const {
  getAllimageUploadDetailsController,
  getImagesUploadedByNurseIdController,
  insertImageUrlDetailsController,
} = require("../../controller/mealImageUrlAndRepsonseData/imageDetailsController");
imageDetailsRoute
  .route("/")
  .post(imageResponseBodyValidation, insertImageUrlDetailsController);
imageDetailsRoute.route("/").get(getAllimageUploadDetailsController);

imageDetailsRoute
  .route("/byNurseId/:id")
  .get(getImagesUploadedByNurseIdController);

module.exports = { imageDetailsRoute };
