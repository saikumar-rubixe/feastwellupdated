const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const { runQuery } = require("../../config/database");
const tokenList = {};
const { getUserDetailByUsername } = require("../../helper/getDetailsby");
const { getUserByIdRepository } = require("../../repository/userRepository");
const { checkSideBarPermissionContoller } = require("../sideBar/sideBarCheck");
const { getCategoryMenu } = require("../../repository/sidebarCheckRepository");
const {
  getRoleForUserTypeRepository,
} = require("../../repository/rolesRepository");
const {
  getPermissionForCategoryAndRoleId,
} = require("../../repository/permissionsRepository");

const { verify } = require("../../helper/verifyjwtToken");
// controller

const getSideBar = async (req, res) => {
  var response = [];
  const user = await verify(req);
  if (!user) {
    res.status(401).send({ success: false, message: "unauthorized user" });
  } else {
    const userType = user.userType;
    const roleId = await getRoleForUserTypeRepository(userType);
    console.log("Role id " + roleId.roleId);

    var response = {};
    response["menus"] = [];
    const mainMenus = await getCategoryMenu(0, 1);
    for (var i = 0; i < mainMenus.length; i++) {
      var dbMenu = mainMenus[i];
      var menu = {
        menuId: dbMenu["menuId"],
        menuName: dbMenu["menuName"],
      };
      const subMenus = await getCategoryMenu(menu.menuId, 0);
      menu["subMenus"] = [];
      for (var j = 0; j < subMenus.length; j++) {
        var subMenuId = subMenus[j].menuId;
        console.log(subMenuId, roleId.roleId);
        var permission = await getPermissionForCategoryAndRoleId(
          subMenuId,
          roleId.roleId,
          "read_access"
        );
        if (permission === 1) {
          console.log("Permission equals");
          console.log(subMenus[j]);
          menu["subMenus"].push({
            subMenuId: subMenus[j]["menuId"],
            subMenuName: subMenus[j]["menuName"],
          });
        }
      }
      if (menu.subMenus.length > 0) response["menus"].push(menu);
    }
    res.send(response);
  }
};

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
            //  res.
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
              // menuAccess: menusSubmenus,
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
module.exports = { userLogin, TokenLogin, getSideBar };
