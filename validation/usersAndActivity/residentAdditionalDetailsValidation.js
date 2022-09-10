const DecimalExtension = require("joi-decimal");
let Joi = require("joi").extend(require("@joi/date"));

const Schema = Joi.object({
  userId: Joi.number().required(),
  name: Joi.string().max(255).required(),
  gender: Joi.number().max(3).required(),
  dob: Joi.date().format(["YYYY-MM-DD", "YYYY/MM/DD"]).required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
  familyContact: Joi.string().max(20).required(),
  enrollmentDate: Joi.date().format(["YYYY-MM-DD", "YYYY/MM/DD"]).required(),
  intialWeight: Joi.number().precision(2).required(),
  currentWeight: Joi.number().precision(2).required(),
  physician: Joi.string().max(100).required(),
  diagnosis: Joi.string().required(),
  foodAllergy: Joi.string().required(),
  medications: Joi.string().required(),
  nutritionalSupplements: Joi.string().required(),
  laxatives: Joi.string().required(),
  naturalLaxatives: Joi.string().required(),
  significantlabData: Joi.string().required(),
  monthlyGroceryBudget: Joi.string().max(255).required(),
  currentHeight: Joi.number().precision(2).required(),
  usualWeight: Joi.number().precision(2).required(),
  waistCircumference: Joi.number().precision(2).required(),
  weightHistory: Joi.string().max(100).required(),
  appetiteFoodIntake: Joi.number().required(),
  chewing: Joi.number().required(),
  swallowing: Joi.number().required(),
  fluidIntake: Joi.number().required(),
  dentition: Joi.number().required(),
  sight: Joi.number().required(),
  communication: Joi.number().required(),
  comprehension: Joi.number().max(3).required(),
  bowelFunction: Joi.number().required(),
  mobility: Joi.string().required(),
  dexterity: Joi.string().required(),
  feeding: Joi.number().required(),
  specialNeeds: Joi.string().required(),
  foodPreferences: Joi.string().required(),
  nutritionalRiskFactors: Joi.array().required(),
  bmi: Joi.number().precision(2).required(), // lowest can be 12
  averageWt: Joi.number().precision(2).required(),
  idealBodyWeightRange: Joi.string().max(500).required(),
  calorieNeeds: Joi.number().required(),
  fluidNeeds: Joi.string().required(),
  proteinNeeds: Joi.number().required(),
  proteinNeedsValue: Joi.string().required(),
  carePlans: Joi.string().required(),
  recommendations: Joi.string().required(),
});
// VALIDATE BEFORE SAVING A USER
const residentAdditionalInformationBodyValidation = async (req, res, next) => {
  try {
    await Schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
      message: "request body validation error",
    });
  }
};

module.exports = {
  residentAdditionalInformationBodyValidation,
};
