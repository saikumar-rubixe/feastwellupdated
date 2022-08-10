class ImageUploadDetails {
  tableId = null;
  residentId = null;
  nurseId = null;
  date = null;
  flag = null;
  imageUrl = null;
  fill(tableId, residentId, nurseId, date, flag, imageUrl) {
    this.tableId = tableId;
    this.residentId = residentId;
    this.nurseId = nurseId;
    this.date = date;
    this.flag = flag;
    this.imageUrl = imageUrl;
  }
}

module.exports = {
  ImageUploadDetails,
};
