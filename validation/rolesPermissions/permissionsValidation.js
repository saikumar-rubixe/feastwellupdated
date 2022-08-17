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
  try {
    await Schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(404).json({
      error: error.message,
      message: "request body validation error",
    });
  }
};

module.exports = {
  permissionsBodyValidation,
};
