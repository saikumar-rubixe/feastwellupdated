const checkSideBarPermissionContoller = async (req, res) => {
  // userType, menuIds
  const { userType, menuIds } = req.body;
  console.log(`calling role function`); //delete
  const role = await getRoleId(userType); // check for roleId of usertype
  console.log(`role id is`);
  console.log(role); //delete
  console.log(`calling get list of menu ids `); //delete
  const values = await getListOfMenuIds(role);

  console.log(values); //delete
  console.log(`consolled values`); //delete
  console.log(values.includes(menuIds));
  if (values.includes(menuIds)) next();
  else
    return res.status(400).json({
      message: "un-authorized",
      details: "access menu id not found in the table",
    });
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

let { runQuery } = require("../../config/database");
const getRoleId = async (userType) => {
  console.log(`into get role id`); // delete
  const sql = "select `role_id` from `roles` where user_type_id =?";
  const details = await runQuery(sql, [userType]);

  console.log(details[0].role_id);
  return details[0].role_id;
};

const getListOfMenuIds = async (role) => {
  console.log(`into get list of menu ids`); //delete
  const sql = "select menu_id from `permissions` where role_id =?";
  const details = await runQuery(sql, [role]);
  console.log(`! consolling the length`);
  console.log(details.length);
  console.log(`consolling list of menu id's`);
  console.log(
    `******************************************************************************************`
  );

  console.log(details.menu_id);
  return details.menu_id;
};

const checkAccess = async (requestCRUDAccess, role, menu_id) => {
  if (req.method == "GET") {
    const sql = req.method;
    ("select `read_access` from permissions where  role_id=? and menu_id =?");
    const details = await runQuery(sql, [role, menu_id]);
    return details;
  }
  if (req.method == "POST") {
    const sql =
      "select `write_access` from permissions where  role_id=? and menu_id =?";
    const details = await runQuery(sql, [role, menu_id]);
    return details;
  }
  if (req.method == "PUT") {
    const sql =
      "select `update_access` from permissions where  role_id=? and menu_id =?";
    const details = await runQuery(sql, [role, menu_id]);
    return details;
  }
  if (req.method == "DELETE") {
    const sql =
      "select `delete_access` from permissions where  role_id=? and menu_id =?";
    const details = await runQuery(sql, [role, menu_id]);
    return details;
  } else {
    return null;
  }
};

module.exports = {
  checkSideBarPermissionContoller,
  checkCRUDPermissionsController,
};
