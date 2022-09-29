let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  userId: Joi.string().required(),
  mealId: Joi.string(),
});
// VALIDATE BEFORE SAVING A USER
const nutrientsBodyValidation = async (req) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  nutrientsBodyValidation,
};
