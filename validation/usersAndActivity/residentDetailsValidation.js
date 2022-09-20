// for user (RESIDENT ) registration validation with basic details
let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  fullName: Joi.string()
    .regex(/^[a-z]+[ a-z0-9]*$/i)
    .required(),
  phoneNumber: Joi.string().optional(),
  userType: Joi.number().required(),
  userStatus: Joi.number().max(1).required(),
});
// VALIDATE BEFORE SAVING A USER
const residentDetailsValidation = async (req, res, next) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  residentDetailsValidation,
};
