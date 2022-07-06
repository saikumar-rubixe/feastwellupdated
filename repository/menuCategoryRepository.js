/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *    {menuCategoryModel}Model is used to show the response with respective fields for eay understanding
 * ------------------------------------------------------------------------------------------
 * *menu category is to chechk the status (Active/InActive)
 * 
 * The methods Calls were as follows
 * 1.getMenuCategoryDetailByIdRepository -->fetch the user by ID
 *
 */
const { runQuery, con } = require("../config/database");
const { menuCategoryModel } = require("../models/menuCategoryModel");

// 1 get by id
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
// 2 get all categories
const getAllMenuCategoryDetailsRepository = async (req, res) => {
  let array = [];
  try {
    let query = "SELECT * from  `menu_category` where 1=1 ";
    let sql = con.format(query);
    let results = await runQuery(sql);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new menuCategoryModel();
        let result = results[i];
        model.fill(
          (categoryId = result.category_id),
          (categoryName = result.category_name),
          (menuStatus = result.status),
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

module.exports = {
  getMenuCategoryDetailByIdRepository,
  getAllMenuCategoryDetailsRepository,
};
