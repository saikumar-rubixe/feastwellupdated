const {
  facilityAnalyticsResponseRepsitory,
} = require("../../repository/FacilityAnalyticsResponseRepository");

const { verify } = require("../../helper/verifyjwtToken");
const facilityAnalyticsResponseController = async (req, res) => {
  try {
    const user = await verify(req);
    if (!user) {
      res.status(404).json({
        success: false,
        message: " un authorised user",
      });
    } else {
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
          message: " un authorised user",
        });
      }

      res.status(200).json({
        success: true,
        message: "Residents optimal list Fetched",
        data: results,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " something went wrong",
    });
  }
};

module.exports = { facilityAnalyticsResponseController };
