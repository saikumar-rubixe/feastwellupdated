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
//^ create image details
imageDetailsRoute
  .route("/")
  .post(
    imageResponseBodyValidation,
    verifyFunction,
    insertImageUrlDetailsController
  );
//* get the image details
imageDetailsRoute.route("/").get(getSingleimageUploadDetailController);
//* get all details
imageDetailsRoute.route("/all/").get(getAllimageUploadDetailsController);
//* get all details of Nurse
imageDetailsRoute
  .route("/byNurseId/:id")
  .get(getImagesUploadedByNurseIdController);

module.exports = { imageDetailsRoute };
