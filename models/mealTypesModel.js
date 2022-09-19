class MealTypeModel {
  id = null;
  mealName = null;
  mealImage = null;
  status = null;
  createdDate = null;
  updatedDate = null;
  fill(id, mealName, mealImage, status, createdDate, updatedDate) {
    this.id = id;
    this.mealName = mealName;
    this.mealImage = mealImage;
    this.status = status;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}
module.exports = {
  MealTypeModel,
};
