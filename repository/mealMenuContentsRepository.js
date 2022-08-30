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

let { runQuery, con } = require("../config/database");
const { getPstDate } = require("../helper/getCanadaTime");
//con = con();
//runQuery = runQuery();
let { mealMenuContentsModel } = require("../models/mealMenuContentsModel");

// 1 get all details
const getAllMealMenuDetailsRepository = async (req, res) => {
  try {
    let array = [];
    let query = "select * from `meal_menu_contents` where 1=1 ";
    //let sql = con.format(query);
    let results = await runQuery(query);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new mealMenuContentsModel();
        let result = results[i];
        model.fill(
          (mealContentId = result.meal_content_id),
          (mealMenuId = result.meal_menu_id),
          (mealItemId = result.meal_item_id),
          (userId = result.user_id),
          (menuContentStatus = result.status),
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
//2 get details By id
const getMealMenuContentsDetailByIdRepository = async (id, res) => {
  try {
    let query = "select * from `meal_menu_contents` where meal_content_id =?";
    //  let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
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

// 3  create repository
const createMealMenuContentsRepository = async (
  mealMenuId,
  mealItemId,
  userId,
  menuContentStatus
) => {
  try {
    let query =
      "INSERT into `meal_menu_contents` (`meal_menu_id`,`meal_item_id`,`user_id`,`status`,created_date,updated_date) VALUES(?,?,?,?,?,?) ";

    let results = await runQuery(query, [
      mealMenuId,
      mealItemId,
      userId,
      menuContentStatus,
      getPstDate(),
      getPstDate(),
    ]);
    let value = results.insertId;
    if (value && value != 0) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};
//  4 update
const updateMealMenuContentsRepository = async (
  id,
  mealMenuId,
  mealItemId,
  userId,
  menuContentStatus
) => {
  try {
    let query =
      " UPDATE `meal_menu_contents` set `meal_menu_id`=?,`meal_item_id`=?,`user_id`=?,`status`=?,`updated_date`=? where meal_content_id  =?";

    let results = await runQuery(query, [
      mealMenuId,
      mealItemId,
      userId,
      menuContentStatus,
      getPstDate(),
      id,
    ]);
    let value = results.affectedRows;
    console.log(`affected rows : ${value}`);
    if (value == 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// 5 delete  repository
const deleteMealMenuContentsRepository = async (id, res) => {
  try {
    let query = "DELETE from  `meal_menu_contents` where meal_content_id=?";
    // let sql = con.format(query, [id]);
    let results = await runQuery(query, [id]);
    let value = results.affectedRows;
    console.log(`affected rows : ${value}`);
    if (value == 1) {
      return true;
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
  getAllMealMenuDetailsRepository,
  getMealMenuContentsDetailByIdRepository,
  createMealMenuContentsRepository,
  updateMealMenuContentsRepository,
  deleteMealMenuContentsRepository,
};
