class MealImagesModel {
  id = null;
  residentId = null;
  mealId = null;
  mealType = null;
  mealImage = null;
  fill(id, residentId, mealId, mealType, mealImage) {
    this.id = id;
    this.residentId = residentId;
    this.mealId = mealId;
    this.mealType = mealType;
    this.mealImage = mealImage;
  }
}
module.exports = {
  MealImagesModel,
};
