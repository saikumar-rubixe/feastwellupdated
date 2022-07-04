const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { getUserDetailByEmail } = require("../helper/getDetailsby");
// controller

const userLogin = async (req, res) => {
  //VALIDATE THE DETAILS WITH USER LOGIN VALIDATION
  var response = {};
  const email = req.body.email;
  const password = req.body.password;
  console.log(`email from request is ${email}`);
  console.log(`PASSWORD from request is ${password}`);

  const recordExist = await getUserDetailByEmail(email);
  //IF EMAIL  NOT EXITS SEND ERROR
  if (!recordExist || recordExist == null) {
    res.status(404).json({
      success: false,
      message: "Email id is Wrong, No USER found - Register User ",
    });
  } else {
    if (recordExist) {
      //GETTING HASHED PASSWORD FROM DB
      const dbpassword = recordExist.password;
      const result = await bcrypt.compare(password, dbpassword);
      if (!result) return res.status(401).send("Invalid Password");

      if (result) {
        //CREATE AND ASSIGN A TOKEN
        console.log(" login succesfu;");
        const token = jwt.sign(
          { id: recordExist.userId },
          process.env.TOKEN_SECRET
        );
        //  res.header("token", token).send(token);
        console.log(recordExist);

        return res.json({
          success: 1,
          message: "login successfully",
          token: token,
          user: {
            userId: recordExist.userId,
            fullName: recordExist.fullName,
            Email: recordExist.email,
            phone: recordExist.phoneNumber,
          },
        });
      }
    } else {
      return res
        .status(401)
        .send("Login Failed! Email Unverified or Disabled ");
    }
  }
};

module.exports = { userLogin };
