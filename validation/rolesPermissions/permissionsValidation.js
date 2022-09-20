let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  roleId: Joi.string().required(),
  menuId: Joi.number().required(),
  readAccess: Joi.number().required(),
  writeAccess: Joi.number().required(),
  updateAccess: Joi.number().required(),
  deleteAccess: Joi.number().required(),
  permissionStatus: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const permissionsBodyValidation = async (req, res, next) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  permissionsBodyValidation,
};
