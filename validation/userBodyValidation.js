let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string(),
  profileImage: Joi.string(),
  userType: Joi.number().required(),
  userStatus: Joi.number().max(1).required(),
  lastLogin: Joi.string(),
  loggedIpAddress: Joi.string(),
});
// VALIDATE BEFORE SAVING A USER
const userBodyValidation = async (req, res, next) => {
  try {
    await Schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(404).json({
      error: error.message,
      message: "venakt validation error",
    });
  }
};

module.exports = {
  userBodyValidation,
};
