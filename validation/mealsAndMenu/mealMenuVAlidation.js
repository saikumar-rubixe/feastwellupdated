let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  mealMenuName: Joi.string().required(),
  menuDescription: Joi.string().required(),
  mealType: Joi.number().required(),
  mealStatus: Joi.number().required(),
  userId: Joi.number().required(),
  mealItems: Joi.string().required(),
});
// VALIDATE BEFORE SAVING A USER
const mealMenuBodyValidation = async (req, res, next) => {
  try {
    await Schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "request body validation error",
    });
  }
};

module.exports = {
  mealMenuBodyValidation,
};
