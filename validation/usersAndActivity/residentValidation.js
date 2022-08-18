let Joi = require("joi").extend(require("@joi/date"));
const querySchema = Joi.object({
  // tillUpdatedDate: Joi.date().format(["YYYY-MM-DD", "YYYY/MM/DD"]),

  residentId: Joi.number(),
  centreId: Joi.number(),
  residentName: Joi.string(),
  gender: Joi.number(),
  residentAge: Joi.number(),
  weight: Joi.number(),
  active: Joi.number(),
  residentPhone: Joi.string(),
  nurseId: Joi.number(),
  residentAddress: Joi.number(),
  createdDate: Joi.date().format(["YYYY-MM-DD", "YYYY/MM/DD"]),
  sortBy: Joi.string().valid(
    "centreId",
    "nurseId",
    "residentId",
    "residentName"
  ),
  sortOrder: Joi.number().valid(0, 1),
  page: Joi.number(),
  limit: Joi.number(),
});
// VALIDATE BEFORE SAVING A USER
const residentQueryValidation = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query);
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "check the query request",
    });
  }
};

module.exports = {
  residentQueryValidation,
};
