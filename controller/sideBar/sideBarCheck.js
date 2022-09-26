const { runQuery } = require("../../config/database");
const { verify } = require("../../helper/verifyjwtToken");
const {
  getRoleId,
  getCategoryMenu,
  checkAccess,
} = require("../../repository/sidebarCheckRepository");

const checkSideBarPermissionContoller = async (userType, res) => {
  return null;
};

const getMenuIdsRepository = async () => {};

// 2
const checkCRUDPermissionsController = async (req, res) => {
  const { userType, requestCRUDAccess } = req.body;
  //  const userType = await getUserTypeOfUserId(userId); //get userType  of the userId

  const role = await getRole(userType); // check for roleId
  const access = await checkAccess(requestCRUDAccess, role);
  // check whether the role id has requested access or not
  if (access == requestCRUDAccess) next();
  else return res.send("un-authorized");
};

//****************************    helper methods      ************************************** */

//************************************************************************************* */

module.exports = {
  checkSideBarPermissionContoller,
  checkCRUDPermissionsController,
};
