/*
 * Copyright (C) 2022 Rubixe
 *
 */

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
        // !TODO: get roles by user type
        const role = await getRoleForUserTypeRepository(user.userType);

        permission = await getPermissionForCategoryAndRoleId(
          categoryId,
          role.roleId,
          accessType
        );
      } catch (err) {
        console.log(err); //delete
      }
    }
  }

  return permission;
};

module.exports = { checkRoutePermission };
