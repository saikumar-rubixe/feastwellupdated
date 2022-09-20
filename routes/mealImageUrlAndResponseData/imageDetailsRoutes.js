const express = require("express");
const imageDetailsRoute = express.Router();
const { verify } = require("../../helper/verifyjwtToken");
const { checkRoutePermission } = require("../../helper/checkRoutePermission");
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
imageDetailsRoute.post("/", async (req, res) => {
  console.log(`im in the router to check permission`); //delete
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  } else {
    const err = await imageResponseBodyValidation(req);
    if (err) {
      return res.status(500).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await insertImageUrlDetailsController(req, res);
    }
  }
});

//* get the image details
imageDetailsRoute.route("/").get(getSingleimageUploadDetailController);

//* get all details
imageDetailsRoute.route("/all/").get(getAllimageUploadDetailsController);

//* get all details of Nurse
imageDetailsRoute
  .route("/byNurseId/:id")
  .get(getImagesUploadedByNurseIdController);

module.exports = { imageDetailsRoute };
