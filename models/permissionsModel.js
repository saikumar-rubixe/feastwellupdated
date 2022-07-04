class permissionsModel {
  permissionId = null;
  roleId = null;
  readAccess = null;
  writeAccess = null;
  updateAccess = null;
  deleteAccess = null;
  permissionStatus = null;
  createdDate = null;
  updatedDate = null;
  fill(
    permissionId,
    roleId,
    readAccess,
    writeAccess,
    updateAccess,
    deleteAccess,
    permissionStatus,
    createdDate,
    updatedDate
  ) {
    this.permissionId = permissionId;
    this.roleId = roleId;
    this.readAccess = readAccess;
    this.writeAccess = writeAccess;
    this.updateAccess = updateAccess;
    this.deleteAccess = deleteAccess;
    this.permissionStatus = permissionStatus;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}

module.exports = { permissionsModel };
