const jwt = require("jsonwebtoken");
require("dotenv");

const TokenLogin = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const usersId = await req.userId;
  const userExist = await getDetailUserById(usersId);

  if (userExist) {
    const token = jwt.sign({ id: usersId }, process.env.TOKEN_SECRET);
    const response = {};
    response["status"] = "success";
    response["message"] = "Login Successful";
    response["data"] = {
      // user: {
      //   name: userExist.userName,
      //   email: userExist.email,
      //   phone: userExist.mobile,
      // },
      token: token,
    };
    res.send(response);
  } else {
    res.status(401).send("Invalid Login");
  }
};

module.exports = { TokenLogin };
