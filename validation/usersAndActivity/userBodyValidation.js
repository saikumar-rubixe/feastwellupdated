let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  fullName: Joi.string()
    .regex(/^[a-z]+[ a-z0-9]*$/i)
    .required(),
  phoneNumber: Joi.string().required(),
  userName: Joi.string()
    .min(6)
    .regex(/^[a-z]+[a-z0-9_]*$/i)
    .required(),
  password: Joi.string().min(6).required(),
  userType: Joi.number().required(),
  userStatus: Joi.number().max(1).required(),
});
// VALIDATE BEFORE SAVING A USER
const userBodyValidation = async (req, res, next) => {
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

// 2 user update validation

const updateSchema = Joi.object({
  fullName: Joi.string().regex(/^[a-z]+[ a-z0-9]*$/i),
  phoneNumber: Joi.string(),
  userName: Joi.string()
    .min(6)
    .regex(/^[a-z]+[a-z0-9_]*$/i),
  userStatus: Joi.number().max(1),
  lastLogin: Joi.date().format(["YYYY-MM-DD HH:mm:ss", "YYYY/MM/DD HH:mm:ss"]),
  loggedIpAddress: Joi.string().optional(),
});
// VALIDATE BEFORE SAVING A USER
const userUpdateBodyValidation = async (req, res, next) => {
  try {
    console.log(req.body);

    await updateSchema.validateAsync(req.body);
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
  userBodyValidation,
  userUpdateBodyValidation,
};
