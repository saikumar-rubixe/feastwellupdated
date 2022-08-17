let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  roleName: Joi.string().required(),
  userTypeId: Joi.number().required(),
  roleStatus: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const rolesBodyValidation = async (req, res, next) => {
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
  rolesBodyValidation,
};
