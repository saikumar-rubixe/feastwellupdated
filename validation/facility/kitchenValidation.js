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
const KitchenUserBodyValidation = async (req) => {
  returnError = null;
  try {
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  KitchenUserBodyValidation,
};
