class RolesModel {
  roleId = null;
  roleName = null;

  userTypeId = null;
  roleStatus = null;
  createdDate = null;
  updatedDate = null;
  createdBy = null;
  updatedBy = null;
  fill(
    roleId,
    roleName,

    userTypeId,
    roleStatus,
    createdDate,
    updatedDate,
    createdBy,
    updatedBy
  ) {
    this.roleId = roleId;
    this.roleName = roleName;

    this.userTypeId = userTypeId;
    this.roleStatus = roleStatus;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
module.exports = { RolesModel };
