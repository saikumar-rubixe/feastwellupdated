const express = require("express");
const refreshRoute = express.Router();
const { verifyRefreshFunction } = require("../../helper/verifyRefreshToken");

const {
  createTokensController,
} = require("../../controller/loginAndAuthentication/refreshTokens");

// ^ create new tokens
refreshRoute.route("/").post(verifyRefreshFunction, createTokensController);

module.exports = { refreshRoute };
