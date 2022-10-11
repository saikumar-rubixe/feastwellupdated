const {
  getNutrientsValueRepository,
} = require("../../repository/imageResponseRepository");
const getNutrientsController = async (req, res) => {
  try {
    const residentId = req.query.residentId;

    const results = await getNutrientsValueRepository(residentId);
    if (results && results != false) {
      res.status(200).send({
        success: true,
        message: "Nutrients Retrieved Successfully",
        data: results,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Nutrients Retrieval Failed",
      });
    }
  } catch (error) {}
};

module.exports = { getNutrientsController };
