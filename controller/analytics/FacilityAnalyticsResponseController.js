const {
  facilityAnalyticsResponseRepsitory,
} = require("../../repository/FacilityAnalyticsResponseRepository");

// const { verify } = require("../../helper/");
const facilityAnalyticsResponseController = async (req, res) => {
  try {
    const facilityId = 3;
    //  const user = await verify;
    const dateFilter = req.query.date;
    const results = await facilityAnalyticsResponseRepsitory(
      facilityId,
      dateFilter
    );
    if (results && results != false) {
      res.status(200).send({
        success: true,
        message: "Fetched Optimal List of residents Successfully",
        data: results,
      });
    } else {
      console.log(`no results found`);
      res.status(404).send({
        success: false,
        message: " optimal list  fetch failed",
      });
    }
  } catch (error) {}
};

module.exports = { facilityAnalyticsResponseController };
