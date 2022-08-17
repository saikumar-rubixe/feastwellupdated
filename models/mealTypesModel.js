class MealTypeModel {
  id = null;
  mealName = null;
  status = null;
  createdDate = null;
  updatedDate = null;
  fill(id, mealName, status, createdDate, updatedDate) {
    this.id = id;
    this.mealName = mealName;
    this.status = status;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}
module.exports = {
  MealTypeModel,
};
