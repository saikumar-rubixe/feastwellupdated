let Joi = require("joi").extend(require("@joi/date"));
const Schema = Joi.object({
  referenceId: Joi.number().required(),
  jsonResponse: Joi.string().required(),
});
// VALIDATE BEFORE SAVING A USER
const imageResponseBodyValidation = async (req, res, next) => {
  if (req.body.referenceId && req.body.jsonResponse) {
    try {
      await Schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "request body validation error",
      });
    }
  } else {
    return res.status(404).json({
      success: false,
      message: "Error! pass all the params ",
    });
  }
};

module.exports = {
  imageResponseBodyValidation,
};
