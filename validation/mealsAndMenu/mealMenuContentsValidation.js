let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  mealMenuId: Joi.number().required(),
  mealItemId: Joi.number().required(),
  userId: Joi.number().required(),
  menuContentStatus: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const mealContentsBodyValidation = async (req, res, next) => {
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
  mealContentsBodyValidation,
};
