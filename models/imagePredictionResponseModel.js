class ImagePredictionRepsonseModel {
  id = null;
  imageTableId = null;
  jsonResponse = null;

  fill(id, imageTableId, jsonResponse) {
    this.id = id;
    this.imageTableId = imageTableId;
    this.jsonResponse = jsonResponse;
  }
}

module.exports = { ImagePredictionRepsonseModel };
