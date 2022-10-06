class UserTypeModel {
  usersTypeId = null;
  userTypeName = null;
  userHeirarchy = null;
  createdDate = null;
  updatedDate = null;
  createdBy = null;
  updatedBy = null;

  fill(
    usersTypeId,
    userTypeName,
    userHeirarchy,
    createdDate,
    updatedDate,
    createdBy,
    updatedBy
  ) {
    this.usersTypeId = usersTypeId;
    this.userTypeName = userTypeName;
    this.userHeirarchy = userHeirarchy;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}

module.exports = { UserTypeModel };
