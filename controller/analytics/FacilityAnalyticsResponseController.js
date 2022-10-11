const {
  facilityAnalyticsResponseRepsitory,
} = require("../../repository/FacilityAnalyticsResponseRepository");

const { verify } = require("../../helper/verifyjwtToken");
const facilityAnalyticsResponseController = async (req, res) => {
  try {
    const user = await verify(req, res);
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    } else {
      // if (user) {
      const facilityId = user.facilityId;
      const userType = user.userType;
      const dateFilter = req.query.date;

      var results;

      if (userType == 1 || userType == 2) {
        results = await facilityAnalyticsResponseRepsitory(dateFilter);
      } else if (
        (facilityId && facilityId != undefined) ||
        facilityId != null
      ) {
        results = await facilityAnalyticsResponseRepsitory(
          dateFilter,
          facilityId
        );
      } else {
        res.status(404).json({
          success: false,
          message: "Unauthorized User",
        });
      }

      res.status(200).json({
        success: true,
        message: "Residents Optimal List Retrieved Successfully",
        data: results,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

module.exports = { facilityAnalyticsResponseController };
