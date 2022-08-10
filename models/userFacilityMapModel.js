class UserFacilityMapModel {
  userFacilityId = null;
  userId = null;
  facilityId = null;
  status = null;
  createdDate = null;
  createdBy = null;
  updatedDate = null;
  updatedBy = null;

  fill(
    userFacilityId,
    userId,
    facilityId,
    status,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy
  ) {
    this.userFacilityId = userFacilityId;
    this.userId = userId;
    this.facilityId = facilityId;
    this.status = status;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
  }
}

module.exports = { UserFacilityMapModel };
