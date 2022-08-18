let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  name1: Joi.string().required(),
  name2: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const BodyValidation = async (req, res, next) => {
  try {
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
  BodyValidation,
};
