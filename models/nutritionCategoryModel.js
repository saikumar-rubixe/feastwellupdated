class NutritionCategoryModel {
  nutritionId = null;
  mealItemId = null;
  carbohydrates = null;
  proteins = null;
  fats = null;
  vitamins = null;
  minerals = null;
  fiber = null;
  water = null;
  calories = null;
  userId = null;
  createdDate = null;
  fill(
    nutritionId,
    mealItemId,
    carbohydrates,
    proteins,
    fats,
    vitamins,
    minerals,
    fiber,
    water,
    calories,
    userId,
    createdDate
  ) {
    this.nutritionId = nutritionId;
    this.mealItemId = mealItemId;
    this.carbohydrates = carbohydrates;
    this.proteins = proteins;
    this.fats = fats;
    this.vitamins = vitamins;
    this.minerals = minerals;
    this.fiber = fiber;
    this.water = water;
    this.calories = calories;
    this.userId = userId;
    this.createdDate = createdDate;
  }
}
module.exports = { NutritionCategoryModel };
