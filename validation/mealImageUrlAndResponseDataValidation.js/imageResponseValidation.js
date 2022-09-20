let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  referenceId: Joi.number().required(),
  jsonResponse: Joi.string().required(),
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
