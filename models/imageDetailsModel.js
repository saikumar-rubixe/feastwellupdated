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
  fill(
    tableId,
    residentId,
    nurseId,
    date,
    flag,
    imageUrl,
    mealType,
    mealName,
    residentName
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
  }
}

module.exports = {
  ImageUploadDetails,
};
