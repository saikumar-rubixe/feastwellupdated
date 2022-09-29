let { runQuery } = require("../config/database");
const { menuCategoryModel } = require("../models/menuCategoryModel");

const getRoleId = async (userType) => {
  let sql = "select `role_id` from `roles` where user_type_id =?";
  let details = await runQuery(sql, [userType]);

  if (!details || details.length == 0) {
    return 7;
  } else {
    let roleId = details[0].role_id;

    return roleId;
  }
};

const getCategoryMenu = async (parentId, parentFlag) => {
  let listmenu = [];
  const sql =
    "select * from `menu_category` where 1=1 and  parent_id = ? and parent_flag=? ORDER BY menu_category_id";
  const categories = await runQuery(sql, [parentId, parentFlag]);
  if (categories.length != 0) {
    for (i = 0; i < categories.length; i++) {
      let category = categories[i];
      let menuCategory = new menuCategoryModel();
      menuCategory.fill(
        (menuCategoryId = category.menu_category_id),
        (menuCategoryName = category.category_name),
        (menuCategoryStatus = category.status),
        (createdDate = category.created_date),
        (updatedDate = category.updated_date),
        (parentFlag = category.parent_flag),
        (parentId = category.parent_id),
        (menuRoutes = category.menu_routes),
        (desktopSortOrder = category.desktop_sort_order),
        (mobileSortOrder = category.mobile_sort_order),
        (desktopIcons = category.desktop_icons),
        (mobileIcons = category.mobile_icons)
      );
      listmenu.push(menuCategory);
    }
  }
  return listmenu;
};

const checkAccess = async (requestCRUDAccess, role, menu_category_id) => {
  if (req.method == "GET") {
    const sql =
      "select `read_access` from permissions where  role_id=? and menu_category_id =?";
    const details = await runQuery(sql, [role, menu_category_id]);
    return details;
  }
  if (req.method == "POST") {
    const sql =
      "select `write_access` from permissions where  role_id=? and menu_category_id =?";
    const details = await runQuery(sql, [role, menu_category_id]);
    return details;
  }
  if (req.method == "PUT") {
    const sql =
      "select `update_access` from permissions where  role_id=? and menu_category_id =?";
    const details = await runQuery(sql, [role, menu_category_id]);
    return details;
  }
  if (req.method == "DELETE") {
    const sql =
      "select `delete_access` from permissions where  role_id=? and menu_category_id =?";
    const details = await runQuery(sql, [role, menu_category_id]);
    return details;
  } else {
    return null;
  }
};
//************************************************************************************* */
module.exports = {
  getRoleId,
  getCategoryMenu,
  checkAccess,
};
