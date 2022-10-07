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
        message: "Data retrieval failed",
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "Data retrieved succesfully",
        data: details,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
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
        message: "Invalid id Passed:  " + id,
      });
    } else {
      const details = await getImagesUploadedByNurseIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No record found with id " + id,
          data: [
            {
              label: "Breakfast",
              count: 0,
            },
            {
              label: "Lunch",
              count: 0,
            },
            {
              label: "Dinner",
              count: 0,
            },
            {
              label: "Afternoon Snack",
              count: 0,
            },
            {
              label: "Evening Snack",
              count: 0,
            },
          ],
        });
      }
      if (details) {
        res.status(200).json({
          success: true,
          message: "Data retrieved succesfully",
          data: details,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// 3 insert the image url , resident id and nurse id
const insertImageUrlDetailsController = async (req, res) => {
  try {
    if (!req.body.imageUrl) {
      // !no body
      res.status(400).json({
        success: false,
        message: "Body request is empty",
      });
    } else {
      const { imageUrl, residentId, mealType } = req.body;
      const adminId = req.userIdValue;

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
          message: "Image upload failed",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Image ploaded successfully",
          insertId: create,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// 4 get al  images details
const getAllimageUploadDetailsController = async (req, res) => {
  try {
    const flag = req.query.flag; //! need to put chech filter

    let details = await getAllimageUploadDetailsRepository(flag);
    if (!details || details == false) {
      res.status(200).json({
        success: false,
        message: "Data retrieval failed",
        data: {
          count: 0,
          array: [],
        },
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "Data retrieved succesfully",
        data: details,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
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
