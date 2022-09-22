const express = require("express");
const authRoute = express.Router();

const { verify } = require("../../helper/verifyjwtToken");

const {
  userLoginBodyValidation,
} = require("../../validation/login/loginValidation");

const {
  userLogin,
  TokenLogin,
} = require("../../controller/loginAndAuthentication/loginUserController");

// ^ Login
authRoute.post("/", async (req, res) => {
  console.log(`im in the router to check permission`); //delete
  const err = await userLoginBodyValidation(req);
  if (err) {
    return res.status(500).json({
      error: err.message,
      message: "request body validation error",
    });
  } else {
    await userLogin(req, res);
  }
});

// * token login

authRoute.get("/", async (req, res) => {
  await TokenLogin(req, res);
});

module.exports = { authRoute };
