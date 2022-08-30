let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  kitchenName: Joi.string().min(4).required(),
  number: Joi.string().optional(),
  countryId: Joi.number().required(),
  stateId: Joi.number().required(),
  cityId: Joi.number().required(),
  kitchenStatus: Joi.number().max(4),
  createdBy: Joi.number().optional(),
  updatedBy: Joi.number().optional(),
  address: Joi.string().required(),
  zipcode: Joi.string().max(5).max(10),
});
// VALIDATE BEFORE SAVING A USER
const KitchenUserBodyValidation = async (req, res, next) => {
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
  KitchenUserBodyValidation,
};
