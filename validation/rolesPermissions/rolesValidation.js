let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  roleName: Joi.string().required(),
  userTypeId: Joi.number().required(),
  roleStatus: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const rolesBodyValidation = async (req, res, next) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  rolesBodyValidation,
};
