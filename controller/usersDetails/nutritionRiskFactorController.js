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

module.exports = { getAllNutritionalRiskFactorsDetailsController };
