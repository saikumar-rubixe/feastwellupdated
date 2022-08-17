class UserFacilityMapModel {
  id = null;
  userId = null;
  facilityId = null;
  status = null;
  createdDate = null;
  createdBy = null;
  updatedDate = null;
  updatedBy = null;
  fullName = null;
  userName = null;
  userType = null;

  fill(
    id,
    userId,
    facilityId,
    status,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy,
    fullName,
    userName,
    userType
  ) {
    this.id = id;
    this.userId = userId;
    this.facilityId = facilityId;
    this.status = status;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
    this.fullName = fullName;
    this.userName = userName;
    this.userType = userType;
  }
}

module.exports = { UserFacilityMapModel };
