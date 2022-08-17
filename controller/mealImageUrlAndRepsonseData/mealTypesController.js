const {
  getAllMealTypesRepository,
} = require("../../repository/mealTypesRepository");
// 1 get meal types
const getAllMealTypesController = async (req, res) => {
  try {
    let details = await getAllMealTypesRepository();
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
module.exports = {
  getAllMealTypesController,
};
