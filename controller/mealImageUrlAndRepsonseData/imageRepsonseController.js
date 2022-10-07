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
        });
      } else {
        const create = await insertImagePredictionRespsonseRepository(
          referenceId,
          jsonResponse
        );
        if (create) {
          res.status(201).json({
            success: true,
            message: "Response saved succesfully with id : " + create,
            data: create,
          });
        }
        if (!create || create == false) {
          res.status(400).json({
            success: false,
            message: "Insetion failed",
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
      message: "Something went wrong",
    });
  }
};

const getImagePredictionResponseByReferenceIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid id Passed:  " + id,
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
const getImagePredictionResponseByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid id Passed:  " + id,
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

module.exports = {
  insertImagePredictionRespsonseController,
  getImagePredictionResponseByReferenceIdController,
  getImagePredictionResponseByIdController,
};
