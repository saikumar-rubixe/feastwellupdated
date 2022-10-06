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
      "SELECT distinct meal_type_id,meal_name as name ,meal_image as image from meal_types mt where NOT EXISTS (select image_details_id from image_details where resident_id = ? and DATE(?) and mt.meal_type_id = image_details.meal_type )";
    let results = await runQuery(sql, [residentId, date]);

    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new MealTypeModel();
        let result = results[i];
        model.fill(
          (id = result.meal_type_id),
          (mealName = result.name),
          (mealImage = result.image)
        );
        array.push(model);
      }
      return { count, array };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
module.exports = { getAllMealTypesRepository };
