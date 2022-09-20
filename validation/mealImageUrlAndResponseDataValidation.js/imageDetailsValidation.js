// req.body.imageUrl
let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  imageUrl: Joi.string().required(),
  residentId: Joi.string().required(),
  NurseId: Joi.string(),
  mealType: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const imageResponseBodyValidation = async (req, res, next) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  imageResponseBodyValidation,
};
