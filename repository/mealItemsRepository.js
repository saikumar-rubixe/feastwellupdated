const { runQuery, con } = require("../config/database");

const { mealItemsModel } = require("../models/mealitemsModel");

const getMealItemsDetailByIdRepository = async (id, res) => {
  try {
    let query = "select * from `meal_items` where id=?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new mealItemsModel();
      model.fill(
        (mealItem = result.meal_menu_id),
        (mealItemName = result.meal_tem_name),
        (Status = result.status),
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

module.exports = { getMealItemsDetailByIdRepository };
