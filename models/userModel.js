class UserModel {
  userId = null
  fullName = null
  email = null
  phoneNumber = null
  userName = null
  password = null
  profileImage = null
  userType = null
  userStatus = null
  lastLogin = null
  loggedIpAddress = null
  createdDate = null
  updatedDate = null

  fill(
    userId,
    fullName,
    email,
    phoneNumber,
    userName,
    password,
    profileImage,
    userType,
    userStatus,
    lastLogin,
    loggedIpAddress,
    createdDate,
    updatedDate,
  ) {
    this.userId = userId
    this.fullName = fullName
    this.email = email

    this.phoneNumber = phoneNumber
    this.userName = userName
    this.password = password
    this.profileImage = profileImage
    this.userType = userType
    this.userStatus = userStatus
    this.lastLogin = lastLogin
    this.loggedIpAddress = loggedIpAddress
    this.createdDate = createdDate
    this.updatedDate = updatedDate
  }
}
module.exports = { UserModel }
