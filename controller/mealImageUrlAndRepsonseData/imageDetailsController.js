// imports
const {
  getAllimageUploadDetailsRepository,
  getImagesUploadedByNurseIdRepository,
  insertImageUrlDetailsRepository,
} = require("../../repository/imageDetailsRepository");

//1
const getAllimageUploadDetailsController = async (req, res) => {
  try {
    let details = await getAllimageUploadDetailsRepository();
    if (!details || details == false) {
      res.status(400).json({
        success: false,
        message: "data retrieval failed",
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "data retrieved succesfully",
        data: details,
      });
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
  }
};

//2
const getImagesUploadedByNurseIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getImagesUploadedByNurseIdRepository(id, res);
      if (!details || details == false) {
        res.status(400).json({
          success: false,
          message: "No record found with id " + id,
        });
      }
      if (details) {
        res.status(200).json({
          success: true,
          message: "data retrieved succesfully",
          data: details,
        });
      }
    }
  } catch (error) {
    console.log(error);
    console.log("Controller:CBE Something went wrong!");
  }
};

// 3 insert the image url , resident id and nurse id
const insertImageUrlDetailsController = async (req, res) => {
  try {
    console.log(req.body); //delete
    if (!req.body) {
      // !no body
      res.status(400).json({
        success: false,
        message: " body request is empty",
      });
    } else {
      const { imageUrl, residentId, NurseId, mealType } = req.body;
      const create = await insertImageUrlDetailsRepository(
        imageUrl,
        residentId,
        NurseId,
        mealType
      );
      if (!create) {
        // ! Creation failed
        res.status(424).json({
          success: false,
          message: " insertion failed",
        });
      } else {
        res.status(200).json({
          success: true,
          message: " inserted  image url details succesfully ",
          createdId: create,
        });
      }
    }
  } catch (error) {}
};
module.exports = {
  getAllimageUploadDetailsController,
  getImagesUploadedByNurseIdController,
  insertImageUrlDetailsController,
};

//
