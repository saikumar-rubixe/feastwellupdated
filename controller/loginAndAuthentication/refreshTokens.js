const { getUserByIdRepository } = require("../../repository/userRepository");
const jwt = require("jsonwebtoken");
require("dotenv");

const createTokensController = async (req, res) => {
  try {
    //* 1 get the user id from refresh token
    const userId = req.userIdValue;

    const recordCheck = await getUserByIdRepository(userId); //2 check user exist or not
    if (recordCheck && recordCheck != false) {
      //* 2.1 create jwt and refrsh tokens
      const token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_LIFE,
      });

      //* refresh token
      const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN, {
        expiresIn: process.env.REFRESH_Token_LIFE,
      });

      res.status(200).json({
        success: true,
        message: "Generated Tokens Succesfully",
        data: { token, refreshToken },
      });
    } else {
      //* if user not Found return false
      res.status(401).json({
        success: false,
        message: "User Not Found ",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

module.exports = { createTokensController };
