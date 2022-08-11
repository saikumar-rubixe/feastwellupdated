let Joi = require("joi").extend(require("@joi/date"));

const Schema = Joi.object({
  usernameame: Joi.string().required,
  password: Joi.string().min(6).required,
});
// VALIDATE BEFORE SAVING A USER
const FacilityUserBodyValidation = async (req, res, next) => {
  try {
    await Schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(404).json({
      error: error.message,
      message: "user body validation error",
    });
  }
};

module.exports = {
  FacilityUserBodyValidation,
};
