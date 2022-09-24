class ResidentModel {
  userId = null;
  enrolmentId = null;
  fullName = null;
  userName = null;
  userType = null;
  userStatus = null;
  createdDate = null;
  updatedDate = null;
  createdBy = null;
  updatedBy = null;
  facilityId = null;
  facilityName = null;
  password = null;

  fill(
    userId,
    enrolmentId,
    fullName,
    userName,
    userType,
    userStatus,
    createdDate,
    updatedDate,
    createdBy,
    updatedBy,
    facilityId,
    facilityName,
    password
  ) {
    this.userId = userId;
    this.enrolmentId = enrolmentId;
    this.fullName = fullName;
    this.userName = userName;
    this.userType = userType;
    this.userStatus = userStatus;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.facilityId = facilityId;
    this.facilityName = facilityName;
    this.password = password;
  }
}
module.exports = { ResidentModel };
