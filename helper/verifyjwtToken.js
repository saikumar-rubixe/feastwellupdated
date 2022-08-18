/**verify function is to validate the jwt token sent from user side
 *  at the time of login ..and after succesful verification  user details are shown in token Login function */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyFunction = function (req, res, next) {
  let jtoken = req.header("Authorization");

  //unauthorized
  if (!jtoken)
    return res.status(401).json({ success: false, message: "Access denied" });
  else {
    let token = jtoken.replace("Bearer ", "");
    try {
      //           passing the    token and the secret key
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      // once the token is verified ...from that id can be extracted and that id will be user )
      req.userIdValue = verified.id;
      // ..which we can use for fetching the details of user by id ,, that api is already there from usersgetby id
      next();
      // by calling the next function we can call the getuserById method and get the details
    } catch (error) {
      console.log(error);
      res.status(500).json({
        login: false,
        data: "error",
      });
    }
  }
};

module.exports = { verifyFunction };
