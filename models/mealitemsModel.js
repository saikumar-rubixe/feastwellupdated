class mealItemsModel {
  mealItem = null;
  mealItemName = null;
  status = null;
  userId = null;
  createdDate = null;
  updatedDate = null;
  fill(mealItem, mealItemName, status, userId, createdDate, updatedDate) {
    this.mealItem = mealItem;
    this.mealItemName = mealItemName;
    this.status = status;
    this.userId = userId;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}

module.exports = { mealItemsModel };
