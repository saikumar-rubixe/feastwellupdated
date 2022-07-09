class ResidentFacilityMapModel {
  residentFacilityId = null;
  userId = null;
  facilityId = null;
  status = null;
  createdDate = null;
  createdBy = null;
  updatedDate = null;
  updatedBy = null;

  fill(
    residentFacilityId,
    userId,
    facilityId,
    status,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy
  ) {
    this.residentFacilityId = residentFacilityId;
    this.userId = userId;
    this.facilityId = facilityId;
    this.status = status;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
  }
}

module.exports = { ResidentFacilityMapModel };
