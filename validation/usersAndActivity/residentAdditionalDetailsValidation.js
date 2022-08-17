let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  gender: Joi.number().required(),
  dob: Joi.date().format(["YYYY-MM-DD", "YYYY/MM/DD"]).required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
  familyContact: Joi.string().required(),
  enrollmentDate: Joi.date().format(["YYYY-MM-DD", "YYYY/MM/DD"]).required(),
  intialWeight: Joi.string().required(),
  currentWeight: Joi.string().required(),
  physician: Joi.string().required(),
  diagnosis: Joi.string().required(),
  foodAllergy: Joi.string().required(),
  medications: Joi.string().required(),
  nutritionalSupplements: Joi.string().required(),
  laxatives: Joi.string().required(),
  naturalLaxatives: Joi.string().required(),
  significantlabData: Joi.string().required(),
  monthlyGroceryBudget: Joi.string().required(),
  currentHeight: Joi.string().required(),
  usualWeight: Joi.string().required(),
  waistCircumference: Joi.number().required(),
  weightHistory: Joi.number().required(),
  appetiteFoodIntake: Joi.number().required(),
  chewing: Joi.number().required(),
  swallowing: Joi.number().required(),
  fluidIntake: Joi.number().required(),
  dentition: Joi.number().required(),
  sight: Joi.number().required(),
  communication: Joi.number().required(),
  comprehension: Joi.number().required(),
  bowelFunction: Joi.number().required(),
  mobility: Joi.number().required(),
  dexterity: Joi.number().required(),
  feeding: Joi.number().required(),
  specialNeeds: Joi.string().required(),
  foodPreferences: Joi.string().required(),
  nutritionalRiskFactors: Joi.string().required(),
  bmi: Joi.string().required(),
  averageWt: Joi.number().required(),
  idealBodyWeightRange: Joi.number().required(),
  calorieNeeds: Joi.number().required(),
  fluidNeeds: Joi.number().required(),
  proteinNeeds: Joi.number().required(),
  carePlans: Joi.string().required(),
  recommendations: Joi.string().required(),
});
// VALIDATE BEFORE SAVING A USER
const residentAdditionalInformationBodyValidation = async (req, res, next) => {
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
  residentAdditionalInformationBodyValidation,
};
