let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  categoryName: Joi.string().required(),
  menuStatus: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const menuCategoryBodyValidation = async (req, res, next) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  menuCategoryBodyValidation,
};
