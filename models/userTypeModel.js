class UserTypeModel {
  usersTypeId = null;
  userTypeName = null;
  userHeirarchy = null;

  fill(usersTypeId, userTypeName, userHeirarchy) {
    this.usersTypeId = usersTypeId;
    this.userTypeName = userTypeName;
    this.userHeirarchy = userHeirarchy;
  }
}

module.exports = { UserTypeModel };
