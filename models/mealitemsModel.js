class mealItemsModel {
  mealItem = null;
  mealItemName = null;
  status = null;
  createdBy = null;
  createdDate = null;
  updatedDate = null;
  updatedBy = null;
  fill(
    mealItem,
    mealItemName,
    status,
    createdBy,
    createdDate,
    updatedDate,
    updatedBy
  ) {
    this.mealItem = mealItem;
    this.mealItemName = mealItemName;
    this.status = status;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
  }
}

module.exports = { mealItemsModel };
