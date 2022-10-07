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
  const permission = await checkRoutePermission(req);
  if (permission !== 1) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    const err = await imageResponseBodyValidation(req);
    if (err) {
      return res.status(400).json({
        error: err.message,
        message: "request body validation error",
      });
    } else {
      await insertImageUrlDetailsController(req, res);
    }
  }
});

//* get the image details

imageDetailsRoute.get("/", async (req, res) => {
  await getSingleimageUploadDetailController(req, res);
});

//* get all details

imageDetailsRoute.get("/all/", async (req, res) => {
  await getAllimageUploadDetailsController(req, res);
});
//* get all details of Nurse
imageDetailsRoute.get("/byNurseId/:id", async (req, res) => {
  await getImagesUploadedByNurseIdController(req, res);
});

module.exports = { imageDetailsRoute };
