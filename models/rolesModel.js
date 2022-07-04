class RolesModel {
  roleId = null;
  roleName = null;
  menuId = null;
  userTypeId = null;
  roleStatus = null;
  createdDate = null;
  updatedDate = null;

  fill(
    roleId,
    roleName,
    menuId,
    userTypeId,
    roleStatus,
    createdDate,
    updatedDate
  ) {
    this.roleId = roleId;
    this.roleName = roleName;
    this.menuId = menuId;
    this.userTypeId = userTypeId;
    this.roleStatus = roleStatus;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}
module.exports = { RolesModel };
