const express = require("express");
const refreshRoute = express.Router();
const { verifyRefreshFunction } = require("../../helper/verifyRefreshToken");

const {
  createTokensController,
} = require("../../controller/loginAndAuthentication/refreshTokens");

// ^ create new tokens
refreshRoute.get("/", verifyRefreshFunction, async (req, res) => {
  await createTokensController(req, res);
});

module.exports = { refreshRoute };
