let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  mealItemName: Joi.string().min(4).required(),
  status: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const mealItemsBodyValidation = async (req, res, next) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  mealItemsBodyValidation,
};
