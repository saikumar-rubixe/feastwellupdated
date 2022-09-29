/**verify function is to validate the jwt token sent from user side
 *  at the time of login ..and after succesful verification  user details are shown in token Login function */
/**verify function is to validate the jwt token sent from user side
 *  at the time of login ..and after succesful verification  user details are shown in token Login function */
require("dotenv");

const jwt = require("jsonwebtoken");
const { getUserByIdRepository } = require("../repository/userRepository");

const verify = async (req) => {
  var user = null;
  let jtoken = req.header("Authorization");
  if (jtoken) {
    let token = jtoken.replace("Bearer ", "");

    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);

      user = await getUserByIdRepository(verified.id);

      req.userIdValue = user.userId;
      req.userIdUserType = user.usertype;
    } catch (error) {
      console.log("expired"); //delete
    }
  }

  return user;
};

module.exports = {
  verify: verify,
};
