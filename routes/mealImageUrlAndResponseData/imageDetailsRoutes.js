const express = require("express");
const imageDetailsRoute = express.Router();
const { verifyFunction } = require("../../helper/verifyjwtToken");
const {
  imageResponseBodyValidation,
} = require("../../validation/mealImageUrlAndResponseDataValidation.js/imageDetailsValidation");
const {
  getSingleimageUploadDetailController,
  getAllimageUploadDetailsController,
  getImagesUploadedByNurseIdController,
  insertImageUrlDetailsController,
} = require("../../controller/mealImageUrlAndRepsonseData/imageDetailsController");
imageDetailsRoute
  .route("/")
  .post(
    imageResponseBodyValidation,
    verifyFunction,
    insertImageUrlDetailsController
  );
imageDetailsRoute.route("/").get(getSingleimageUploadDetailController);
imageDetailsRoute.route("/all/").get(getAllimageUploadDetailsController);

imageDetailsRoute
  .route("/byNurseId/:id")
  .get(getImagesUploadedByNurseIdController);

module.exports = { imageDetailsRoute };
