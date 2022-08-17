let Joi = require("joi").extend(require("@joi/date"));

const Schema = Joi.object({
  username: Joi.string()
    .min(6)
    .regex(/^[a-z]+[a-z-0-9\-\_]+$/i)
    .required(),
  password: Joi.string().min(6).required(),
});
// VALIDATE BEFORE SAVING A USER
const userLoginBodyValidation = async (req, res, next) => {
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
  userLoginBodyValidation,
};
