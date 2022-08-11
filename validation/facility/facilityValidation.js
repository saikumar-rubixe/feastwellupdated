let Joi = require("joi").extend(require("@joi/date"));

/**
  facilityName:Joi.string(),
          headId:Joi.number(),
          number:Joi.string,
          countryId:Joi.number(),
          stateId:Joi.number(),
          cityId:Joi.number(),
          facilityStatus:Joi.number().max(4),
          updatedBy:Joi.number(),
          address:Joi.string(),
          zipcode:Joi.string().max(6),
 */
const Schema = Joi.object({
  facilityName: Joi.string()
    .min(4)
    .regex(/^[a-z\-\_]+$/i)
    .required(),
  headId: Joi.number(),
  number: Joi.string,
  countryId: Joi.number(),
  stateId: Joi.number(),
  cityId: Joi.number(),
  facilityStatus: Joi.number().max(4),
  updatedBy: Joi.number(),
  address: Joi.string(),
  zipcode: Joi.string().max(6),
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
