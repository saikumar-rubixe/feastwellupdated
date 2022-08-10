class RolesModel {
  roleId = null;
  roleName = null;

  userTypeId = null;
  roleStatus = null;
  createdDate = null;
  updatedDate = null;

  fill(
    roleId,
    roleName,

    userTypeId,
    roleStatus,
    createdDate,
    updatedDate
  ) {
    this.roleId = roleId;
    this.roleName = roleName;

    this.userTypeId = userTypeId;
    this.roleStatus = roleStatus;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}
module.exports = { RolesModel };
