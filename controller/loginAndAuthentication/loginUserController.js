const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const { runQuery } = require("../../config/database");
const tokenList = {};
const { getUserDetailByUsername } = require("../../helper/getDetailsby");
const { getUserByIdRepository } = require("../../repository/userRepository");
const { checkSideBarPermissionContoller } = require("../sideBar/sideBarCheck");
// controller

const menusSubmenus = [
  {
    menuId: 1,
    menuName: "Resident",
    subMenus: [
      {
        subMenuId: 100,
        subMenuName: "Residents",
      },
      {
        subMenuId: 101,
        subMenuName: "Add Resident",
      },
    ],
  },
  {
    menuId: 2,
    menuName: "Facility",
    subMenus: [
      {
        subMenuId: 200,
        subMenuName: "Facility",
      },
      {
        subMenuId: 201,
        subMenuName: "Add Facility",
      },
    ],
  },
  {
    menuId: 3,
    menuName: "Kitchen",
    subMenus: [
      {
        subMenuId: 300,
        subMenuName: "Kitchen",
      },
      {
        subMenuId: 301,
        subMenuName: "Add Kitchen",
      },
    ],
  },
  {
    menuId: 1,
    menuName: "Meal Items",
    subMenus: [
      {
        subMenuId: 400,
        subMenuName: "Meal Item",
      },
      {
        subMenuId: 401,
        subMenuName: "Add Meal Item",
      },
    ],
  },
  {
    menuId: 1,
    menuName: "Mean Menu",
    subMenus: [
      {
        subMenuId: 501,
        subMenuName: "Mean Menu",
      },
      {
        subMenuId: 502,
        subMenuName: "Add Mean Menu",
      },
    ],
  },
  {
    menuId: 1,
    menuName: "Nurse",
    subMenus: [
      {
        subMenuId: 600,
        subMenuName: "Nurse",
      },
      {
        subMenuId: 601,
        subMenuName: "Add Nurse",
      },
    ],
  },
];

//* USER LOGIN
const userLogin = async (req, res) => {
  console.log(req.body);
  try {
    //VALIDATE THE DETAILS WITH USER LOGIN VALIDATION
    var response = {};
    const username = req.body.username;
    const password = req.body.password;
    console.log(`username from request is ${username}`);
    console.log(`password from request is ${password}`);
    const recordExist = await getUserDetailByUsername(username);
    if (!recordExist || recordExist == null) {
      res.status(404).json({
        success: false,
        message: "No user found",
      });
    } else {
      if (recordExist) {
        console.log(`consolling the user details`);
        console.log(recordExist);
        const usertype = recordExist.userType;
        if (
          usertype == 1 ||
          usertype == 2 ||
          usertype == 3 ||
          (usertype == 4 && usertype != 5 && usertype != 6)
        ) {
          let facilityId = 0;
          const userId = recordExist.userId;
          const username = recordExist.userName;
          //GETTING HASHED PASSWORD FROM DB
          const dbpassword = recordExist.password;
          console.log(password, dbpassword);
          const result = await bcrypt.compare(password, dbpassword);
          if (!result)
            return res.status(401).json({
              success: false,
              message: " invalid password",
            });

          if (result) {
            //CREATE AND ASSIGN A TOKEN
            console.log(" login succesful");
            if (usertype == 2 || usertype == 7) {
              const value = await getFacilityIdByUserId(userId);
              facilityId = value;
            } else {
              facilityId;
            }
            const token = jwt.sign(
              { id: recordExist.userId },
              process.env.TOKEN_SECRET,
              { expiresIn: process.env.TOKEN_LIFE }
            );
            const refreshToken = jwt.sign(
              { id: recordExist.userId },
              process.env.REFRESH_TOKEN,
              { expiresIn: process.env.REFRESH_Token_LIFE }
            );
            //  res.header("token", token).send(token);

            //  after login succesful send the sidebars whichever accesable
            let menuId = await checkSideBarPermissionContoller(
              recordExist.userType
            );
            if (menuId != 0 && menuId !== null) {
              menuId = menuId;
            }
            if (menuId == 0) {
              menuId = {
                menu_category_id: 0,
                category_name: "dashboard",
              };
            }

            const tokenDetails = {
              token: token,
              refreshToken: refreshToken,
            };
            tokenList[refreshToken] = tokenDetails;
            let details = {
              success: true, // response.success
              message: "login successful",
              token: token,
              refreshToken: refreshToken,
              userId: userId,
              userType: usertype,
              username: username,
              facilityId: facilityId,
              menuAccess: menusSubmenus,
              // menuAccess: menuId,
            };

            return res.status(200).json(details);
          }
        } else {
          return res
            .status(401)
            .send({ success: false, message: "Unauthorized User" });
        }
      } else
        return res
          .status(404)
          .send("Login Failed!  username or password wrong ");
    }
  } catch (error) {
    console.log(error);
    console.log("catch block error");
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont",
    });
  }
};

// ! TOKEN LOGIN

const TokenLogin = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const usersId = req.userIdValue;
    const userExist = await getUserByIdRepository(usersId);
    console.log(userExist);
    if (userExist) {
      const usertype = userExist.userType;
      console.log(`user type is passing ${usertype}`);
      let facilityId = 0;
      // const value = await getFacilityIdByUserId(userId);
      // if (value) {
      //   facilityId = value;
      // } else {
      //   facilityId;
      // }

      const token = jwt.sign({ id: usersId }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_LIFE,
      });

      const refreshToken = jwt.sign(
        { id: usersId },
        process.env.REFRESH_TOKEN,
        { expiresIn: process.env.REFRESH_Token_LIFE }
      );

      //  after login succesful send the sidebars whichever accesable
      let menuId = await checkSideBarPermissionContoller(userExist.userType);
      if (menuId != 0 && menuId !== null) {
        menuId = menuId;
      }
      if (menuId == 0) {
        menuId = {
          category_id: 0,
          category_name: "dashboard",
        };
      }

      let details = {
        success: true, // response.success
        message: "login successful",
        token: token,
        refreshToken: refreshToken,
        userId: userId,
        userType: usertype,
        username: userExist.userName,
        facilityId: facilityId,
        menuAccess: menusSubmenus,
        // menuAccess: menuId,
      };

      return res.status(200).json(details);
    } else {
      return res.status(401).send({ success: false, message: "invalid token" });
    }
  } catch (error) {
    console.log(error);
    console.log("catch block error");
    res.status(500).json({
      success: false,
      message: " something went wrong cb cont",
    });
  }
};

//
getFacilityIdByUserId = async (userId) => {
  const sql = "select `facility_id` from `user_facility_map` where user_id=?";
  const results = await runQuery(sql, [userId]);
  const result = results[0];

  if (result) {
    let value = result.facility_id;
    return value;
  }
  // if in case the fcility mappig is not done then facility is returned as 0
  else {
    return 0;
  }
};
module.exports = { userLogin, TokenLogin };
