class ImageUploadDetails {
  tableId = null;
  residentId = null;
  nurseId = null;
  date = null;
  flag = null;
  imageUrl = null;
  mealType = null;
  mealName = null;
  residentName = null;
  facilityId = null;
  facilityName = null;
  fill(
    tableId,
    residentId,
    nurseId,
    date,
    flag,
    imageUrl,
    mealType,
    mealName,
    residentName,
    facilityId,
    facilityName
  ) {
    this.tableId = tableId;
    this.residentId = residentId;
    this.nurseId = nurseId;
    this.date = date;
    this.flag = flag;
    this.imageUrl = imageUrl;
    this.mealType = mealType;
    this.mealName = mealName;
    this.residentName = residentName;
    this.facilityId = facilityId;
    this.facilityName = facilityName;
  }
}

module.exports = {
  ImageUploadDetails,
};
