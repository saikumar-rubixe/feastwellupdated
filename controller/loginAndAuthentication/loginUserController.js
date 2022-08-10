const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const { runQuery } = require("../../config/database");
const tokenList = {};
const { getUserDetailByUsername } = require("../../helper/getDetailsby");
// controller

const userLogin = async (req, res) => {
  try {
    //VALIDATE THE DETAILS WITH USER LOGIN VALIDATION
    var response = {};
    const username = req.body.username;
    const password = req.body.password;
    console.log(`username from request is ${username}`);
    console.log(`password from request is ${password}`);

    const recordExist = await getUserDetailByUsername(username);
    console.log(recordExist);

    if (!recordExist || recordExist == null) {
      console.log(`im here`);
      res.status(404).json({
        success: false,
        message: "no user found",
      });
    } else {
      if (recordExist) {
        let facilityId = 0;
        const usertype = recordExist.userType;
        const userId = recordExist.userId;
        if (usertype == 2 || usertype == 7) {
          const value = await getFacilityIdByUserId(userId);
          facilityId = value;
        } else {
          facilityId = 0;
        }

        //GETTING HASHED PASSWORD FROM DB
        const dbpassword = recordExist.password;
        const result = await bcrypt.compare(password, dbpassword);
        if (!result)
          return res.status(401).json({
            success: false,
            message: " invalid password",
          });

        if (result) {
          //CREATE AND ASSIGN A TOKEN
          console.log(" login succesful");
          const token = jwt.sign(
            { id: recordExist.userId, facility: facilityId },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_LIFE }
          );
          const refreshToken = jwt.sign(
            { id: recordExist.userId, facility: facilityId },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_Token_LIFE }
          );
          //  res.header("token", token).send(token);
          let details = {
            success: true, // response.success
            message: "login successful",
            token: token,
            refreshToken: refreshToken,
          };
          tokenList[refreshToken] = details;
          return res.status(200).json(details);
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

getFacilityIdByUserId = async (userId) => {
  const sql = "select `facility_id` from `user_facility_map` where user_id=?";
  const results = await runQuery(sql, [userId]);
  const result = results[0];
  const value = result.facility_id;
  return value;
};
module.exports = { userLogin };
