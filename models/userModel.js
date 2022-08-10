class UserModel {
  userId = null;
  fullName = null;
  phoneNumber = null;
  userName = null;
  password = null;
  userType = null;
  userStatus = null;
  lastLogin = null;
  loggedIpAddress = null;
  createdDate = null;
  updatedDate = null;
  enrolmentID = null;

  fill(
    userId,
    fullName,
    phoneNumber,
    userName,
    password,
    userType,
    userStatus,
    lastLogin,
    loggedIpAddress,
    createdDate,
    updatedDate,

    enrolmentID
  ) {
    this.userId = userId;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.userName = userName;
    this.password = password;
    this.userType = userType;
    this.userStatus = userStatus;
    this.lastLogin = lastLogin;
    this.loggedIpAddress = loggedIpAddress;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.enrolmentID = enrolmentID;
  }
}
module.exports = { UserModel };
