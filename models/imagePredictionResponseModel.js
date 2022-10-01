class ImagePredictionRepsonseModel {
  id = null;
  imageTableId = null;
  createdDate = null;
  residentId = null;
  uploadedBy = null;
  flag = null;
  mealType = null;
  jsonResponse = null;

  fill(
    id,
    imageTableId,
    createdDate,
    residentId,
    uploadedBy,
    flag,
    mealType,
    jsonResponse
  ) {
    this.id = id;
    this.imageTableId = imageTableId;
    this.createdDate = createdDate;
    this.residentId = residentId;
    this.uploadedBy = uploadedBy;
    this.flag = flag;
    this.mealType = mealType;
    this.jsonResponse = jsonResponse;
  }
}

module.exports = { ImagePredictionRepsonseModel };
