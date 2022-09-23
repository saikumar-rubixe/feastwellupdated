let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  fullName: Joi.string()
    .regex(/^[a-z]+[ a-z0-9]*$/i)
    .required(),
  phoneNumber: Joi.string(),
  username: Joi.string()
    .min(5)
    .regex(/^[a-z]+[a-z0-9_]*$/i)
    .optional(),
  password: Joi.string().min(6).optional(),
  userType: Joi.number().required(),
  userStatus: Joi.number(),
});

// VALIDATE BEFORE SAVING A USER
const userBodyValidation = async (req, res, next) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

// 2 user update validation

const updateSchema = Joi.object({
  fullName: Joi.string().regex(/^[a-z]+[ a-z0-9]*$/i),
  phoneNumber: Joi.string(),
  userName: Joi.string()
    .min(5)
    .regex(/^[a-z]+[a-z0-9_]*$/i),
  userStatus: Joi.number().max(1),
  lastLogin: Joi.date().format(["YYYY-MM-DD HH:mm:ss", "YYYY/MM/DD HH:mm:ss"]),
  loggedIpAddress: Joi.string().optional(),
});
// VALIDATE BEFORE SAVING A USER
const userUpdateBodyValidation = async (req, res, next) => {
  returnError = null;
  try {
    await updateSchema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  userBodyValidation,
  userUpdateBodyValidation,
};
