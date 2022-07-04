/**verify function is to validate the jwt token sent from user side
 *  at the time of login ..and after succesful verification  user details are shown in token Login function */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyFunction = function (req, res, next) {
  const token = req.header("token");
  //unauthorized
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.residentId = verified.id;
    next();
  } catch (error) {
    res.json({
      login: false,
      data: "error",
    });
  }
};

module.exports = verifyFunction;
