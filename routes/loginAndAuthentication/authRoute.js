const express = require("express");
const authRoute = express.Router();

const { verify } = require("../../helper/verifyjwtToken");

const {
  userLoginBodyValidation,
} = require("../../validation/login/loginValidation");

const {
  userLogin,
  TokenLogin,
  getSideBar,
} = require("../../controller/loginAndAuthentication/loginUserController");

// ^ Login
authRoute.post("/", async (req, res) => {
  const err = await userLoginBodyValidation(req);
  if (err) {
    return res.status(400).json({
      error: err,
      message: "Request Body Validation Error",
    });
  } else {
    await userLogin(req, res);
  }
});

//* SIDEBAR
authRoute.get("/sidebar", async (req, res) => {
  await getSideBar(req, res);
});

// * token login

authRoute.get("/", async (req, res) => {
  // const user = await verify(req);
  // if (user) {
  await TokenLogin(req, res);
  // }
  // else {
  //   res.status(401).json({
  //     success: false,
  //     message: "User Not Found",
  //   });
  // }
});

module.exports = { authRoute };
