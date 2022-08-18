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
    console.log(error);
    console.log("Controller:CBE Something Went Wrong !");
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

// // insert nutritional risk factors
// const insertNutritinalRiskFactorsDetailsController = async (req, res) => {
//   try {
//     const { } = req.body;
//     const details = await insertNutritinalRiskFactorsDetailsRepository();

//   } catch (error) {
//     console.log(error);
//     console.log("Controller:CBE Something Went Wrong !");
//     res
//       .status(404)
//       .json({ success: false, message: "CBE! something went wrong " });
//   }
// };
module.exports = { getAllNutritionalRiskFactorsDetailsController };