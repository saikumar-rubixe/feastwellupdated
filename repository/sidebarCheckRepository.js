let { runQuery } = require("../config/database");

const getRoleId = async (userType) => {
  console.log(`into get role id`); // delete
  let sql = "select `role_id` from `roles` where user_type_id =?";
  let details = await runQuery(sql, [userType]);
  let roleId = details[0].role_id;
  //let roleid = detail.role_id;

  console.log(roleId);
  if (roleId) {
    return roleId;
  } else return 1;
};

const getListOfMenuIds = async (role) => {
  let listmenu = [];

  console.log(`into get list of menu ids for role id ${role}`); //delete

  const sql =
    "select menu_id from `permissions` where role_id =? ORDER BY menu_id";
  const details = await runQuery(sql, [role]);
  console.log(`! consolling the length`); //delete
  console.log(details.length); //deete
  if (details.length != 0) {
    for (i = 0; i < details.length; i++) {
      let result = details[i];
      menuId = result.menu_id;
      listmenu.push(menuId);
    }
    console.log(
      `******************************************************************************************`
    );
    console.log(`consolling list of menu id's ${listmenu}`); //delete
    return listmenu;
  } else {
    return null;
  }
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
//************************************************************************************* */
module.exports = {
  getRoleId,
  getListOfMenuIds,
  checkAccess,
};
