const {
  facilityAnalyticsResponseRepsitory,
} = require("../../repository/FacilityAnalyticsResponseRepository");
// const {
//   getfacilityDetailsByUserIdRepository,
// } = require("../../repository/facilityCenterRepository");
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
      //console.log(user);//delete
      const facilityId = user.facilityId;
      const userType = user.userType;
      const dateFilter = req.query.date;
      // console.log(facilityId, userType, dateFilter);//delete
      var results;

      if (userType == 1 || userType == 2) {
        results = await facilityAnalyticsResponseRepsitory(dateFilter);
        // console.log(results);
      } else if (facilityId && facilityId != undefined) {
        results = await facilityAnalyticsResponseRepsitory(
          facilityId,
          dateFilter
        );
        console.log(results);
      } else {
        console.log(`un authorized`);
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

      // if (results && results != false) {
      //   res.status(200).send({
      //     success: true,
      //     message: "Fetched Optimal List of residents Successfully",
      //     data: results,
      //   });
      // } else {
      //   console.log(`no results found`);
      //   res.status(404).send({
      //     success: false,
      //     message: " optimal list  fetch failed",
      //   });
      // }
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
