/**verify function is to validate the jwt token sent from user side
 *  at the time of login ..and after succesful verification  user details are shown in token Login function */
/**verify function is to validate the jwt token sent from user side
 *  at the time of login ..and after succesful verification  user details are shown in token Login function */
require("dotenv");

const jwt = require("jsonwebtoken");
const { getUserByIdRepository } = require("../repository/userRepository");

const verify = async (req, res) => {
  try {
    var user = null;
    let jtoken = req.header("Authorization");

    if (!jtoken || jtoken == "Bearer undefined") {
      return null;
    } else {
      let token = jtoken.replace("Bearer ", "");

      const verified = jwt.verify(token, process.env.TOKEN_SECRET);

      user = await getUserByIdRepository(verified.id);

      req.userIdValue = user.userId;
      req.userIdUserType = user.usertype;

      return user;
    }
  } catch (error) {
    return null;
  }
};

module.exports = {
  verify: verify,
};
