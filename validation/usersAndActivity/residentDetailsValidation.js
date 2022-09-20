// for user (RESIDENT ) registration validation with basic details
let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  fullName: Joi.string()
    .regex(/^[a-z]+[ a-z0-9]*$/i)
    .required(),
  phoneNumber: Joi.string().required(),
  userType: Joi.number().required(),
  userStatus: Joi.number().max(1).required(),
});
// VALIDATE BEFORE SAVING A USER
const residentDetailsValidation = async (req, res, next) => {
  try {
    await Schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
      message: "request body validation error",
    });
  }
};

module.exports = {
  residentDetailsValidation,
};
