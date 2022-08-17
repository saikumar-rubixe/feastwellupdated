const { runQuery } = require("../config/database");
const { MealTypeModel } = require("../models/mealTypesModel");

const getAllMealTypesRepository = async (req, res) => {
  let array = [];
  try {
    let sql = "select * from `meal_types`";

    let results = await runQuery(sql);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new MealTypeModel();
        let result = results[i];
        model.fill(
          (id = result.id),
          (mealName = result.meal_name),
          (status = result.status),
          (createdDate = result.created_date),
          (updatedDate = result.updated_date)
        );
        array.push(model);
      }
      return { count, array };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};
module.exports = { getAllMealTypesRepository };
