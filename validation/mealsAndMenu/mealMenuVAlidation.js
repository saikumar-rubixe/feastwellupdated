let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  mealMenuName: Joi.string().required(),
  menuDescription: Joi.string().required(),
  mealType: Joi.number().required(),
  mealStatus: Joi.number().required(),

  mealItems: Joi.string().required(),
});
// VALIDATE BEFORE SAVING A USER
const mealMenuBodyValidation = async (req, res, next) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  mealMenuBodyValidation,
};
