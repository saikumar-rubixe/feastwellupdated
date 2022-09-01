const { runQuery } = require("../config/database");
const { MealTypeModel } = require("../models/mealTypesModel");
const { getPstDate } = require("../helper/getCanadaTime");
const date = getPstDate();
/* * 1 GET meal types based on resident Id
 * @param {*} residentId
 * @returns
 */
const getAllMealTypesRepository = async (residentId) => {
  let array = [];
  try {
    /** */
    let sql =
      "SELECT distinct id,meal_name as name from meal_types mt where NOT EXISTS (select id from image_details where resident_id = ? and DATE(?) and mt.id = image_details.meal_type )";
    let results = await runQuery(sql, [residentId, date]);
    console.log(results);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new MealTypeModel();
        let result = results[i];
        model.fill((id = result.id), (mealName = result.name));
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
