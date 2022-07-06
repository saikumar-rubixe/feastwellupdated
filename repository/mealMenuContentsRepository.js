/**Repository  is to interact with Database ,make the CRUD operations  and send the response back to
 *  the controller
 
 *  { runQuery } is to connect with db  (configured)
 * {con } is used to  set the string format to sql format
 *    {mealMenuContentsModel}Model is used to show the response with respective fields for eay understanding
 * ------------------------------------------------------------------------------------------
 * * meal menu contents ( menu id ,meal team id and status)
 * 
 * The methods Calls were as follows
 * 1.getMealMenuContentsDetailByIdRepository -->fetch the user by ID
 *
 */

const { runQuery, con } = require("../config/database");
const { mealMenuContentsModel } = require("../models/mealMenuContentsModel");
//1 get details By id
const getMealMenuContentsDetailByIdRepository = async (id, res) => {
  try {
    let query = "select * from `meal_menu_contents` where meal_content_id =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new mealMenuContentsModel();
      model.fill(
        (mealContentId = result.meal_content_id),
        (mealMenuId = result.meal_menu_id),
        (mealItemId = result.meal_item_id),
        (userId = result.user_id),
        (menuContentStatus = result.status),
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

// exports
module.exports = {
  getMealMenuContentsDetailByIdRepository,
};
