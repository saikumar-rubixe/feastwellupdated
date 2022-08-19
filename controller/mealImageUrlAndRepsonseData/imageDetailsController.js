// imports
const {
  getSingleimageUploadDetailRepository,
  getAllimageUploadDetailsRepository,
  getImagesUploadedByNurseIdRepository,
  insertImageUrlDetailsRepository,
} = require("../../repository/imageDetailsRepository");

//1
const getSingleimageUploadDetailController = async (req, res) => {
  try {
    let details = await getSingleimageUploadDetailRepository();
    if (!details || details == false) {
      res.status(404).json({
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
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
        res.status(200).json({
          success: false,
          message: "No record found with id " + id,
          data: {
            totalUploads: {
              count: 0,
              breakfast: 0,
              afternoonSnack: 0,
              lunch: 0,
              eveningSnack: 0,
              dinner: 0,
            },
          },
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 3 insert the image url , resident id and nurse id
const insertImageUrlDetailsController = async (req, res) => {
  try {
    console.log(req.body); //delete
    if (!req.body.imageUrl) {
      // !no body
      res.status(400).json({
        success: false,
        message: " body request is empty",
      });
    } else {
      const { imageUrl, residentId, mealType } = req.body;
      const adminId = req.userIdValue;
      console.log(`nurse id is ${adminId}`);
      const create = await insertImageUrlDetailsRepository(
        imageUrl,
        residentId,
        adminId,
        mealType
      );
      if (!create) {
        // ! Creation failed
        res.status(404).json({
          success: false,
          message: " insertion failed",
        });
      } else {
        res.status(200).json({
          success: true,
          message: " inserted  image url details succesfully ",
          insertId: create,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// 4 get al  images details
const getAllimageUploadDetailsController = async (req, res) => {
  try {
    const flag = req.query.flag; //! need to put chech filter
    console.log(flag);
    let details = await getAllimageUploadDetailsRepository(flag);
    if (!details || details == false) {
      res.status(200).json({
        success: false,
        message: "data retrieval failed",
        data: {
          count: 0,
          array: [],
        },
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

module.exports = {
  getSingleimageUploadDetailController,
  getImagesUploadedByNurseIdController,
  insertImageUrlDetailsController,
  getAllimageUploadDetailsController,
};

//
