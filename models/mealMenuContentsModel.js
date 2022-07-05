class mealMenuContentsModel {
  mealContentId = null;
  mealMenuId = null;
  mealItemId = null;
  userId = null;
  menuContentStatus = null;
  createdDate = null;
  updatedDate = null;
  fill(
    mealContentId,
    mealMenuId,
    mealItemId,
    userId,
    menuContentStatus,
    createdDate,
    updatedDate
  ) {
    this.mealContentId = mealContentId;
    this.mealMenuId = mealMenuId;
    this.mealItemId = mealItemId;
    this.userId = userId;
    this.menuContentStatus = menuContentStatus;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}

module.exports = { mealMenuContentsModel };
