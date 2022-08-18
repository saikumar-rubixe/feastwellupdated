let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  mealItemName: Joi.string().min(4).required(),
  Status: Joi.number().required(),
  userId: Joi.string().required(),
});
// VALIDATE BEFORE SAVING A USER
const mealItemsBodyValidation = async (req, res, next) => {
  try {
    await Schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: " request body validation error",
    });
  }
};

module.exports = {
  mealItemsBodyValidation,
};
