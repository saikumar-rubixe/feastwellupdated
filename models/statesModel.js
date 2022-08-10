class States {
  id;
  Statename;
  countryId;
  countryCode;
  fipsCode;
  iso2;
  type;
  latitude;
  longitude;
  createdAt;
  updatedAt;
  flag;
  wikiDataId;

  fill(
    id,
    Statename,
    countryId,
    countryCode,
    fipsCode,
    iso2,
    type,
    latitude,
    longitude,
    createdAt,
    updatedAt,
    flag,
    wikiDataId
  ) {
    this.id = id;
    this.Statename = Statename;
    this.countryId = countryId;
    this.countryCode = countryCode;
    this.fipsCode = fipsCode;
    this.iso2 = iso2;
    this.type = type;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.flag = flag;
    this.wikiDataId = wikiDataId;
  }
}
module.exports = { States };
