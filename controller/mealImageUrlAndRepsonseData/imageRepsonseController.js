const {
  insertImagePredictionRespsonseRepository,
  getImagePredictionResponseByReferenceIdRepository,
  getImagePredictionResponseByIdRepository,
} = require("../../repository/imageResponseRepository");
//*

//*
const insertImagePredictionRespsonseController = async (req, res) => {
  try {
    if (req.body.referenceId && req.body.jsonResponse) {
      const { referenceId, jsonResponse } = req.body;
      if (isNaN(referenceId)) {
        return res.status(404).json({
          success: false,
          message: "Invalid ID",
        });
      } else {
        const create = await insertImagePredictionRespsonseRepository(
          referenceId,
          jsonResponse
        );
        if (create) {
          res.status(201).json({
            success: true,
            message: "Response Saved Succesfully",
            data: create,
          });
        }
        if (!create || create == false) {
          res.status(400).json({
            success: false,
            message: "Creation Failed",
          });
        }
      }
      //  }
    } else {
      res.status(400).json({
        success: false,
        message: "Pass all the params ",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const getImagePredictionResponseByReferenceIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const details = await getImagePredictionResponseByReferenceIdRepository(
        id,
        res
      );
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No Record Found",
          data: {
            id: 0,
            imageTableId: 0,
            jsonResponse: [],
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
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};
const getImagePredictionResponseByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    } else {
      const details = await getImagePredictionResponseByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No Record Found",
          data: {},
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

module.exports = {
  insertImagePredictionRespsonseController,
  getImagePredictionResponseByReferenceIdController,
  getImagePredictionResponseByIdController,
};
