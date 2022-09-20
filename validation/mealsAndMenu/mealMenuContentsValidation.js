let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  mealMenuId: Joi.number().required(),
  mealItemId: Joi.number().required(),

  menuContentStatus: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const mealContentsBodyValidation = async (req, res, next) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  mealContentsBodyValidation,
};
