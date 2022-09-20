/*
 * Copyright (C) 2022 Rubixe
 *
 */

const { color, log } = require("console-log-colors"); //delete
const {
  getPermissionForCategoryAndRoleId,
} = require("../repository/permissionsRepository");
const {
  getRoleForUserTypeRepository,
} = require("../repository/rolesRepository");

const { verify } = require("../helper/verifyjwtToken");
const { getRouteName } = require("../helper/getRouteName");
const { getRouteId } = require("../helper/getRouteId");
// getRouteId middleware will insert categroy/menu id on the request body as categoryId iff available
/*
  @param req.routeName, res, next
  @return to next function defined in route
  @author galab
*/
const checkRoutePermission = async (req) => {
  console.log(color.red("2 in the check route permission")); //delete
  var permission = 0;
  const user = await verify(req);
  if (user) {
    const routeName = getRouteName(req);
    const categoryId = await getRouteId(routeName);
    if (categoryId) {
      var accessType = null;
      const access = req.method;
      if (access == "GET") {
        accessType = "read_access";
      } else if (access == "POST") {
        accessType = "write_access";
      } else if (access == "PUT") {
        accessType = "update_access";
      } else if (access == "DELETE") {
        accessType = "delete_access";
      }
      try {
        console.log("Access type: " + accessType);
        console.log(user);
        // !TODO: get roles by user type
        const role = await getRoleForUserTypeRepository(user.userType);
        console.log(categoryId, role.roleId, accessType);
        permission = await getPermissionForCategoryAndRoleId(
          categoryId,
          role.roleId,
          accessType
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  return permission;
};

module.exports = { checkRoutePermission };
