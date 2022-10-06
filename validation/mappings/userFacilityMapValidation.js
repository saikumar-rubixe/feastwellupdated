let Joi = require("joi").extend(require("@joi/date"));

const Schema = Joi.object({
  userId: Joi.number().required(),
  facilityId: Joi.number().required(),
  status: Joi.number().required(),
});
// VALIDATE BEFORE SAVING A USER
const userFacilityBodyValidation = async (req, res, next) => {
  returnError = null;
  try {
    console.log(req.body);
    await Schema.validateAsync(req.body);
  } catch (error) {
    returnError = error;
  }
  return returnError;
};

module.exports = {
  userFacilityBodyValidation,
};
