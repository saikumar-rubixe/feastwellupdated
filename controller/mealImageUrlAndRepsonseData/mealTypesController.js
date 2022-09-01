const {
  getAllMealTypesRepository,
} = require("../../repository/mealTypesRepository");
// 1 get meal types
const getAllMealTypesController = async (req, res) => {
  try {
    const residentId = req.body.residentId;
    let details = await getAllMealTypesRepository(residentId);
    if (!details || details == false) {
      res.status(400).json({
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
  getAllMealTypesController,
};
