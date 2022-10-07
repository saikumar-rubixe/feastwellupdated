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

//*3 side bar menus and side menu
/**  
  @param {*} req
  @param {*} res
  @return list of menus and sub menus as per user login id type
 */
const getSideBar = async (req, res) => {
  var response = [];
  const user = await verify(req); //verify whether user exist or not
  if (!user) {
    // if no user exist return unauthorised
    res.status(401).send({ success: false, message: "Unauthorized user" });
  } else {
    const userType = user.userType;
    const roleId = await getRoleForUserTypeRepository(userType);

    var response = {};
    response["menus"] = [];
    const mainMenus = await getCategoryMenu(0, 1);

    for (var i = 0; i < mainMenus.length; i++) {
      var dbMenu = mainMenus[i];

      var menu = {
        menuId: dbMenu["menuCategoryId"],
        menuName: dbMenu["menuCategoryName"],
        desktopIcon: dbMenu["desktopIcons"],
        mobileIcon: dbMenu["mobileIcons"],
      };
      const subMenus = await getCategoryMenu(menu.menuId, 0);
      menu["subMenus"] = [];
      for (var j = 0; j < subMenus.length; j++) {
        var subMenuId = subMenus[j].menuCategoryId;

        var permission = await getPermissionForCategoryAndRoleId(
          subMenuId,
          roleId.roleId,
          "read_access"
        );
        if (permission == 1) {
          menu["subMenus"].push({
            subMenuId: subMenus[j]["menuCategoryId"],
            subMenuName: subMenus[j]["menuCategoryName"],
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
  try {
    //VALIDATE THE DETAILS WITH USER LOGIN VALIDATION
    // var response = {};
    const username = req.body.username;
    const password = req.body.password;

    const recordExist = await getUserDetailByUsername(username);
    if (!recordExist || recordExist == null) {
      res.status(404).json({
        success: false,
        message: "No user found",
      });
    } else {
      if (recordExist) {
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

          const result = await bcrypt.compare(password, dbpassword);
          if (!result)
            return res.status(401).json({
              success: false,
              message: "Invalid password",
            });

          if (result) {
            //CREATE AND ASSIGN A TOKEN

            if (usertype == 2 || usertype == 6) {
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
              message: "Login successful",
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
          .send("Login failed   username or password wrong ");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong cb cont",
    });
  }
};

// ! TOKEN LOGIN

const TokenLogin = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const usersId = req.userIdValue;
    const userExist = await getUserByIdRepository(usersId);

    if (userExist) {
      const usertype = userExist.userType;

      let facilityId = 0;

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
          category_name: "Dashboard",
        };
      }

      let details = {
        success: true, // response.success
        message: "Login successful",
        token: token,
        refreshToken: refreshToken,
        userId: userId,
        userType: usertype,
        username: userExist.userName,
        facilityId: facilityId,
        // menuAccess: menusSubmenus,
        // menuAccess: menuId,
      };

      return res.status(200).json(details);
    } else {
      return res.status(401).send({ success: false, message: "invalid token" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
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
