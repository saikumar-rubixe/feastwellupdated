const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { getUserDetailByEmail } = require("../helper/getDetailsby");
// controller

const userLogin = async (req, res) => {
  try {
    //VALIDATE THE DETAILS WITH USER LOGIN VALIDATION
    var response = {};
    const email = req.body.email;
    const password = req.body.password;
    console.log(`email from request is ${email}`);
    console.log(`password from request is ${password}`);

    const recordExist = await getUserDetailByEmail(email);
    //IF EMAIL  NOT EXITS SEND ERROR
    if (!recordExist || recordExist == null) {
      res.status(404).json({
        success: false,
        message: "no user found",
      });
    } else {
      if (recordExist) {
        //GETTING HASHED PASSWORD FROM DB
        const dbpassword = recordExist.password;
        const result = await bcrypt.compare(password, dbpassword);
        if (!result) return res.status(401).json({
          success: false,
          message: " invalid password"
        })

        if (result) {
          //CREATE AND ASSIGN A TOKEN
          console.log(" login succesful");
          const token = jwt.sign(
            { id: recordExist.userId },
            process.env.TOKEN_SECRET
          );
          //  res.header("token", token).send(token);

          return res.json({
            success: true, // respnse.success
            message: "login successful",
            token: token,
           
          });
        }
      } else {
        return res
          .status(401)
          .send("Login Failed! Email Unverified or Disabled ");
      }
    }
  } catch (error) {
    console.log(error);
    console.log("catch block error");
    res.status(400).json({
      success: false,
      message: " something went wrong cb cont",
    });
  }
};

module.exports = { userLogin };
