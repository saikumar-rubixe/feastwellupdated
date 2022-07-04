class mealMenuContentsModel {
  mealContentId = null;
  mealMenuId = null;
  mealItemId = null;
  userId = null;
  status = null;
  createdDate = null;
  updatedDate = null;
  fill(
    mealContentId,
    mealMenuId,
    mealItemId,
    userId,
    status,
    createdDate,
    updatedDate
  ) {
    this.mealContentId = mealContentId;
    this.mealMenuId = mealMenuId;
    this.mealItemId = mealItemId;
    this.userId = userId;
    this.status = status;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}

module.exports = { mealMenuContentsModel };
