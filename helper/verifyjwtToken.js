/**verify function is to validate the jwt token sent from user side
 *  at the time of login ..and after succesful verification  user details are shown in token Login function */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyFunction = catchAsync(function (req, res, next) {
  const token = req.header("token");
  //unauthorized
  if (!token) return res.status(401).send("Access denied");

  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  req.residentId = verified.id;
  next();
});

module.exports = verifyFunction;
