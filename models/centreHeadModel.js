class CenterHeadmodel {
  centerHeadId = null;
  centerHeadName = null;
  personId = null;
  centeremail = null;
  centerContactNumber = null;
  centerCountryId = null;
  centerStateId = null;
  centerCityId = null;
  centerHeadStatus = null;
  createdDate = null;
  createdBy = null;
  updatedDate = null;
  updatedBy = null;
  fill(
    centerHeadId,
    centerHeadName,
    personId,
    centeremail,
    centerContactNumber,
    centerCountryId,
    centerStateId,
    centerCityId,
    centerHeadStatus,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy
  ) {
    this.centerHeadId = centerHeadId;
    this.centerHeadName = centerHeadName;
    this.personId = personId;
    this.centeremail = centeremail;
    this.centerContactNumber = centerContactNumber;
    this.centerCountryId = centerCountryId;
    this.centerStateId = centerStateId;
    this.centerCityId = centerCityId;
    this.centerHeadStatus = centerHeadStatus;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
  }
}

module.exports = { CenterHeadmodel };