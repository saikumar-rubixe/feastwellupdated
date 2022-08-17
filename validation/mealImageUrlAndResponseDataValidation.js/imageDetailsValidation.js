// req.body.imageUrl
let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  imageUrl: Joi.string().required(),
  residentId: Joi.string().required(),
  NurseId: Joi.string().required(),
  mealType: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const imageResponseBodyValidation = async (req, res, next) => {
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
  imageResponseBodyValidation,
};
