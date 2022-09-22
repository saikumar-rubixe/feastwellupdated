const { runQuery } = require("../../config/database");
const {
  getRoleId,
  getListOfMenuIds,
  checkAccess,
} = require("../../repository/sidebarCheckRepository");

const checkSideBarPermissionContoller = async (userType, res) => {
  try {
    // console.log(`into the check side bar permission controller`);//delete
    //console.log(`usertype is ${userType}`);//delete
    // check for roleId of usertype//delete
    const role = await getRoleId(userType);
    // console.log(`role id is`);//delete
    // console.log(role); //delete
    // console.log(`calling get list of menu ids `); //delete
    let values = await getListOfMenuIds(role);
    //console.log(values); //delete
    //console.log(`consolled values`); //delete
    if (values != null) {
      let menuIdArray = [];
      for (i = 0; i < values.length; i++) {
        let sql =
          "select menu_category_id ,category_name,desktop_sort_order,mobile_sort_order, destop_icons from `menu_category` where status=1 and menu_category_id =?";
        let results = await runQuery(sql, [values[i]]);
        var normalObj = Object.assign({}, results[0]);
        // console.log(normalObj);//delete
        menuIdArray.push(normalObj);
      }
      console.log(`menu Id Array is `);
      console.log(menuIdArray);
      return menuIdArray;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
    console.log(`CBE! something went wrong catch block error`);
    res.status(500).json({
      success: false,
      message: " something went wrong cb",
    });
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
