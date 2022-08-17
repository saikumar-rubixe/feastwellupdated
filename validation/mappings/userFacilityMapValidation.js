let Joi = require("joi").extend(require("@joi/date"));

const Schema = Joi.object({
  userId: Joi.number().required(),
  facilityId: Joi.number().required(),
  status: Joi.number().required(),
  createdBy: Joi.number().required(),
  updatedBy: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const userFacilityBodyValidation = async (req, res, next) => {
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
  userFacilityBodyValidation,
};
