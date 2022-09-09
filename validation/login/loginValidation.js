let Joi = require("joi").extend(require("@joi/date"));

const Schema = Joi.object({
  username: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
});
// VALIDATE BEFORE SAVING A USER
const userLoginBodyValidation = async (req, res, next) => {
  try {
    console.log(req.body);
    await Schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "request body validation error",
    });
  }
};
module.exports = {
  userLoginBodyValidation,
};
