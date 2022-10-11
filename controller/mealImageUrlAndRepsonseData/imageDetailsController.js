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
        message: "Data Retrieval Failed",
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "Data Retrieved Successfully",
        data: details,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "Invalid ID",
      });
    } else {
      const details = await getImagesUploadedByNurseIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No Record Found",
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
          message: "Data Retrieved Successfully",
          data: details,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "Request Body is Empty",
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
        // ! Creation Failed
        res.status(404).json({
          success: false,
          message: "Image Upload Failed",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Image Uploaded Successfully",
          insertId: create,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
        message: "Data Retrieval Failed",
        data: {
          count: 0,
          array: [],
        },
      });
    }
    if (details) {
      res.status(200).json({
        success: true,
        message: "Data Retrieved Successfully",
        data: details,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
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
