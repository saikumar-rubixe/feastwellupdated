class UserModel {
  userId = null;
  fullName = null;
  phoneNumber = null;
  userName = null;
  userType = null;
  userStatus = null;
  lastLogin = null;
  loggedIpAddress = null;
  createdDate = null;
  updatedDate = null;
  enrolmentId = null;
  password = null;

  fill(
    userId,
    fullName,
    phoneNumber,
    userName,
    userType,
    userStatus,
    lastLogin,
    loggedIpAddress,
    createdDate,
    updatedDate,
    enrolmentId,
    password
  ) {
    this.userId = userId;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.userName = userName;
    this.userType = userType;
    this.userStatus = userStatus;
    this.lastLogin = lastLogin;
    this.loggedIpAddress = loggedIpAddress;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.enrolmentId = enrolmentId;
    this.password = password;
  }
}
module.exports = { UserModel };
