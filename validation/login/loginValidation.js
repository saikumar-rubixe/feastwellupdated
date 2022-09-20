let Joi = require("joi").extend(require("@joi/date"));

const Schema = Joi.object({
  username: Joi.string().min(5).required(),
  password: Joi.string().min(6).required(),
});
// VALIDATE BEFORE SAVING A USER
const userLoginBodyValidation = async (req) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};
module.exports = {
  userLoginBodyValidation,
};
