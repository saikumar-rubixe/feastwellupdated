class FacilityModel {
  facilityCenterId = null;
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
  address = null;
  zipcode = null;
  countryName = null;
  stateName = null;
  cityName = null;

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
    address,
    zipcode,
    countryName,
    stateName,
    cityName
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
    this.address = address;
    this.zipcode = zipcode;
    this.countryName = countryName;
    this.stateName = stateName;
    this.cityName = cityName;
  }
}

module.exports = {
  FacilityModel,
};
