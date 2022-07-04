const { runQuery, con } = require("../config/database");
const { menuCategoryModel } = require("../models/menuCategoryModel");
const getMenuCategoryDetailByIdRepository = async (id, res) => {
  try {
    let query = "SELECT * FROM `menu_category` where `category_id` =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new menuCategoryModel();
      model.fill(
        (categoryId = result.category_id),
        (categoryName = result.category_name),
        (menuStatus = result.status),
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

module.exports = { getMenuCategoryDetailByIdRepository };
