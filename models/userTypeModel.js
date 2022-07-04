class UserTypeModel {
  usersTypeId = null;
  userTypeName = null;

  fill(usersTypeId, userTypeName) {
    this.usersTypeId = usersTypeId;
    this.userTypeName = userTypeName;
  }
}

module.exports = { UserTypeModel };
