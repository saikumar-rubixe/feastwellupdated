class mealItemsModel {
  mealItem = null;
  mealItemName = null;
  Status = null;
  userId = null;
  createdDate = null;
  updatedDate = null;
  fill(mealItem, mealItemName, Status, userId, createdDate, updatedDate) {
    this.mealItem = mealItem;
    this.mealItemName = mealItemName;
    this.Status = Status;
    this.userId = userId;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}

module.exports = { mealItemsModel };
