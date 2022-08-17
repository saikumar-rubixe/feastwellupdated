const { runQuery } = require("../../config/database");
const {
  getRoleId,
  getListOfMenuIds,
  checkAccess,
} = require("../../repository/sidebarCheckRepository");

const checkSideBarPermissionContoller = async (userType) => {
  try {
    // userType
    console.log(`calling role function`); //delete
    const role = await getRoleId(userType); // check for roleId of usertype
    console.log(`role id is`);
    console.log(role); //delete
    console.log(`calling get list of menu ids `); //delete
    let values = await getListOfMenuIds(role);
    console.log(values); //delete
    console.log(`consolled values`); //delete
    if (values != null) {
      let menuIdArray = [];
      for (i = 0; i < values.length; i++) {
        let sql =
          "select category_id ,category_name from `menu_category` where status=1 and category_id =?";
        let results = await runQuery(sql, [values[i]]);
        var normalObj = Object.assign({}, results[0]);
        console.log(normalObj);
        menuIdArray.push(normalObj);
      }

      return menuIdArray;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
    console.log(`CBE! something went wrong catch block error`);
  }
};

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
