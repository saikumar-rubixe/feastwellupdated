class MealMenuModel {
  mealMenuId = null;
  mealMenuName = null;
  menuDescription = null;
  mealType = null; //(1: breakfast 2:lunch 3:snacks 4: dinner)
  mealStatus = null;
  userId = null;
  createdDate = null;
  updatedDate = null;
  mealItems = null;
  fill(
    mealMenuId,
    mealMenuName,
    menuDescription,
    mealType,
    mealStatus,
    userId,
    createdDate,
    updatedDate,
    mealItems
  ) {
    this.mealMenuId = mealMenuId;
    this.mealMenuName = mealMenuName;
    this.menuDescription = menuDescription;
    this.mealType = mealType;
    this.mealStatus = mealStatus;
    this.userId = userId;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.mealItems = mealItems;
  }
}
module.exports = {
  MealMenuModel,
};
