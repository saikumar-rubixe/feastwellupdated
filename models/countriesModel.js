class CountriesModel {
  id = null;
  name = null;
  phonecode = null;
  iso2 = null;
  timezones = null;
  iso3 = null;
  numericCode = null;
  capital = null;
  currency = null;
  currencyname = null;
  currencySymbol = null;
  tld = null;
  native = null;
  region = null;
  subregion = null;
  translations = null;
  latitude = null;
  longitude = null;
  emoji = null;
  emojiU = null;
  createdAt = null;
  updatedAt = null;
  flag = null;
  wikiDataId = null;
  fill(
    id,
    name,
    phonecode,
    iso2,
    timezones,
    iso3,
    numericCode,
    capital,
    currency,
    currencyname,
    currencySymbol,
    tld,
    native,
    region,
    subregion,
    translations,
    latitude,
    longitude,
    emoji,
    emojiU,
    createdAt,
    updatedAt,
    flag,
    wikiDataId
  ) {
    this.id = id;
    this.name = name;
    this.phonecode = phonecode;
    this.iso2 = iso2;
    this.timezones = timezones;
    this.iso3 = iso3;
    this.numericCode = numericCode;
    this.capital = capital;
    this.currency = currency;
    this.currencyname = currencyname;
    this.currencySymbol = currencySymbol;
    this.tld = tld;
    this.native = native;
    this.region = region;
    this.subregion = subregion;
    this.translations = translations;
    this.latitude = latitude;
    this.longitude = longitude;
    this.emoji = emoji;
    this.emojiU = emojiU;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.flag = flag;
    this.wikiDataId = wikiDataId;
  }
}

module.exports = { CountriesModel };
