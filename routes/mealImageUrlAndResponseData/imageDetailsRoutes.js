const express = require("express");
const imageDetailsRoute = express.Router();
const {
  getAllimageUploadDetailsController,
  getImagesUploadedByNurseIdController,
  insertImageUrlDetailsController,
} = require("../../controller/mealImageUrlAndRepsonseData/imageDetailsController");
imageDetailsRoute.route("/").post(insertImageUrlDetailsController);
imageDetailsRoute.route("/").get(getAllimageUploadDetailsController);

imageDetailsRoute
  .route("/byNurseId/:id")
  .get(getImagesUploadedByNurseIdController);

module.exports = { imageDetailsRoute };
