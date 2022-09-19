// get all residents of Nurse
const {
  getReisdentsOfNurseIdRepository,
} = require("../../repository/nurseResidentFacilityRepository");
const getReisdentsOfNurseIdController = async (req, res) => {
  try {
    const nurseId = req.userIdValue;
    console.log(`nurse id is ${nurseId}`);
    const details = await getReisdentsOfNurseIdRepository(nurseId);
    if (details) {
      res.status(200).json({
        success: true,
        message: "Details Fetched Successfuly",
        data: details,
      });
    } else if (details == false) {
      res.status(404).json({
        success: false,
        message: "catch bock error ",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Cannot retrieved",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
  }
};

module.exports = {
  getReisdentsOfNurseIdController,
};