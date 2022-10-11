// get all residents of Nurse
const {
  getReisdentsOfNurseIdRepository,
} = require("../../repository/nurseResidentFacilityRepository");
const getReisdentsOfNurseIdController = async (req, res) => {
  try {
    const nurseId = req.userIdValue;
    const mealType = req.query.mealType;

    const details = await getReisdentsOfNurseIdRepository(nurseId, mealType);
    if (details) {
      res.status(200).json({
        success: true,
        message: "Details Retrieved Successfuly",
        data: details,
      });
    } else if (details == false) {
      res.status(404).json({
        success: false,
        message: "Retrieval Failed",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Unable to Retrieve",
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
  getReisdentsOfNurseIdController,
};
