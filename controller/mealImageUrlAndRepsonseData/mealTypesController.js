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
      message: " Something Went Wrong",
    });
  }
};
module.exports = {
  getAllMealTypesController,
};
