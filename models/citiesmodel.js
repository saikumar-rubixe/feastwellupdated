class CitiesModel {
  id = null;
  cityName = null;

  stateCode = null;
  countryId = null;
  stateId = null;
  countryCode = null;
  latitude = null;
  longitude = null;
  createdAt = null;
  updatedAt = null;
  flag = null;
  wikiDataId = null;
  fill(
    id,
    cityName,

    stateCode,
    countryId,
    stateId,
    countryCode,
    latitude,
    longitude,
    createdAt,
    updatedAt,
    flag,
    wikiDataId
  ) {
    this.id = id;
    this.cityName = cityName;

    this.stateCode = stateCode;
    this.countryId = countryId;
    this.stateId = stateId;
    this.countryCode = countryCode;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.flag = flag;
    this.wikiDataId = wikiDataId;
  }
}

module.exports = { CitiesModel };
