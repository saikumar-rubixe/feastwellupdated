class MealTypeModel {
  id = null;
  mealName = null;
  mealImage = null;
  status = null;
  createdDate = null;
  updatedDate = null;
  createdBy = null;
  updatedBy = null;

  fill(
    id,
    mealName,
    mealImage,
    status,
    createdDate,
    updatedDate,
    createdBy,
    updatedBy
  ) {
    this.id = id;
    this.mealName = mealName;
    this.mealImage = mealImage;
    this.status = status;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
module.exports = {
  MealTypeModel,
};
