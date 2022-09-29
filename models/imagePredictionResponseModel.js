class ImagePredictionRepsonseModel {
  id = null;
  imageTableId = null;
  jsonResponse = null;
  createdDate = null;

  residentId = null;
  uploadedBy = null;
  flag = null;
  mealType = null;

  fill(
    id,
    imageTableId,
    jsonResponse,
    createdDate,
    residentId,
    uploadedBy,
    flag,
    mealType
  ) {
    this.id = id;
    this.imageTableId = imageTableId;
    this.jsonResponse = jsonResponse;
    this.createdDate = createdDate;
    this.residentId = residentId;
    this.uploadedBy = uploadedBy;
    this.flag = flag;
    this.mealType = mealType;
  }
}

module.exports = { ImagePredictionRepsonseModel };
