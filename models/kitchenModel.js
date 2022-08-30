class KitchenModel {
  kitchenId = null;
  kitchenName = null;
  number = null;
  countryId = null;
  stateId = null;
  cityId = null;
  kitchenStatus = null;
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
    kitchenId,
    kitchenName,
    number,
    countryId,
    stateId,
    cityId,
    kitchenStatus,
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
    this.kitchenId = kitchenId;
    this.kitchenName = kitchenName;
    this.number = number;
    this.countryId = countryId;
    this.stateId = stateId;
    this.cityId = cityId;
    this.kitchenStatus = kitchenStatus;
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
  KitchenModel,
};
