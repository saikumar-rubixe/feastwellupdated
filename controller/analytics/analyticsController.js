const {
  getImagePredictionResponseByReferenceIdRepository,
} = require("../../repository/imageResponseRepository");
const getNutrientsController = async (req, res) => {
  try {
    const { userId, mealId } = req.body;
    const results = await getImagePredictionResponseByReferenceIdRepository(
      userId,
      mealId
    );
    if (results && results != false) {
      res.status(200).send({
        success: true,
        message: "Fetched Nutrients Successfully",
        data: results,
      });
    }
  } catch (error) {}
};

module.exports = { getNutrientsController };
