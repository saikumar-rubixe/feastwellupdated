const {
  getNutrientsValueRepository,
} = require("../../repository/imageResponseRepository");
const getNutrientsController = async (req, res) => {
  try {
    const residentId = req.query.residentId;
    console.log(residentId);
    console.log(`in scontroller`);
    console.log(`test`);
    const results = await getNutrientsValueRepository(residentId);
    if (results && results != false) {
      res.status(200).send({
        success: true,
        message: "Fetched Nutrients Successfully",
        data: results,
      });
    } else {
      console.log(`no results found`);
      res.status(404).send({
        success: false,
        message: " Nutrients fetch failed",
      });
    }
  } catch (error) {}
};

module.exports = { getNutrientsController };
