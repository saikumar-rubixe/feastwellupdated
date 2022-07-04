class FacilityModel {
  facilityCenterId;
  facilityName = null;
  headId = null;
  email = null;
  number = null;
  countryId = null;
  stateId = null;
  cityId = null;
  facilityStatus = null;
  createdDate = null;
  createdBy = null;
  updatedDate = null;
  updatedBy = null;
  countryName = null;
  stateName = null;
  CityName = null;

  fill(
    facilityCenterId,
    facilityName,
    headId,
    email,
    number,
    countryId,
    stateId,
    cityId,
    facilityStatus,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy,
    countryName,
    stateName,
    CityName
  ) {
    this.facilityCenterId = facilityCenterId;
    this.facilityName = facilityName;
    this.headId = headId;
    this.email = email;
    this.number = number;
    this.countryId = countryId;
    this.stateId = stateId;
    this.cityId = cityId;
    this.facilityStatus = facilityStatus;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
    this.countryName = countryName;
    this.stateName = stateName;
    this.CityName = CityName;
  }
}

module.exports = {
  FacilityModel,
};
