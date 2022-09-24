// for user (RESIDENT ) registration validation with basic details
let Joi = require("joi").extend(require("@joi/date"));
/**
 * resident creation validation
 */
const Schema = Joi.object({
  fullName: Joi.string()
    .regex(/^[a-z]+[ a-z0-9]*$/i)
    .required(),
  userType: Joi.number().greater(5).less(7).required(),
  userStatus: Joi.number().max(1).optional(),
});
// VALIDATE BEFORE SAVING A USER
const residentValidation = async (req, res, next) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

/**
 * update resident validation
 */
const updateSchema = Joi.object({
  fullName: Joi.string()
    .regex(/^[a-z]+[ a-z0-9]*$/i)
    .required(),
  userType: Joi.number().greater(5).less(7),
  userStatus: Joi.number().max(1),
});
// VALIDATE BEFORE SAVING A USER
const updateResidentValidation = async (req, res, next) => {
  returnError = null;
  try {
    await updateSchema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  residentValidation,
  updateResidentValidation,
};
