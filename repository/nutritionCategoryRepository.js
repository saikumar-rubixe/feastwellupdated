const { runQuery, con } = require("../config/database");
const { NutritionCategoryModel } = require("../models/nutritionCategoryModel");
const getNutritionCategoryDetailByIdRepository = async (id, res) => {
  try {
    let query = "SELECT * FROM `nutrition_category` where nutrition_id  =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new NutritionCategoryModel();
      model.fill(
        (nutritionId = result.nutrition_id),
        (mealItemId = result.meal_item_id),
        (carbohydrates = result.carbohydrates),
        (proteins = result.proteins),
        (fats = result.fats),
        (vitamins = result.vitamins),
        (minerals = result.minerals),
        (fiber = result.fiber),
        (water = result.water),
        (calories = result.calories),
        (userId = result.user_id),
        (createdDate = result.created_date),
        (updatedDate = result.updated_date)
      );
      return model;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

module.exports = { getNutritionCategoryDetailByIdRepository };
