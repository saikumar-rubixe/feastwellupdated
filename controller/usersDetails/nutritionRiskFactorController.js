// api for the nutritional risk Factors
const {
  getAllNutritionalRiskFactorsDetails,
} = require("../../repository/nutritionRiskFactorRepository");

// get method
const getAllNutritionalRiskFactorsDetailsController = async (req, res) => {
  try {
    let details = await getAllNutritionalRiskFactorsDetails();
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
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

module.exports = { getAllNutritionalRiskFactorsDetailsController };
