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
          message: "pass valid id",
          dataSent: req.body, //delete
        });
      } else {
        const create = await insertImagePredictionRespsonseRepository(
          referenceId,
          jsonResponse
        );
        if (create) {
          res.status(201).json({
            success: true,
            message: "Response Saved succesfully with id : " + create,
            data: create,
            dataSent: req.body, //delete
          });
        }
        if (!create || create == false) {
          res.status(400).json({
            success: false,
            message: "insetion failed",
            dataSent: req.body, //delete
          });
        }
      }
      //  }
    } else {
      res.status(400).json({
        success: false,
        message: "Error! pass all the params ",
        dataSent: req.body, //delete
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

const getImagePredictionResponseByReferenceIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getImagePredictionResponseByReferenceIdRepository(
        id,
        res
      );
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No record found with id " + id,
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
          message: "data retrieved succesfully",
          data: details,
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
const getImagePredictionResponseByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "invalid id Passed:  " + id,
      });
    } else {
      const details = await getImagePredictionResponseByIdRepository(id, res);
      if (!details || details == false) {
        res.status(200).json({
          success: false,
          message: "No record found with id " + id,
          data: {},
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

module.exports = {
  insertImagePredictionRespsonseController,
  getImagePredictionResponseByReferenceIdController,
  getImagePredictionResponseByIdController,
};
