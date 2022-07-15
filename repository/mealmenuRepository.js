const { runQuery, con } = require("../config/database");
const { MealMenuModel } = require("../models/mealMenuModel");
const date = require("date-and-time");
let newDate = new Date();

//1 get details By id
const getMealMenuDetailByIdRepository = async (id, res) => {
  try {
    let query = "select * from `meal_menu` where meal_menu_id  =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new MealMenuModel();
      model.fill(
        (mealMenuId = result.meal_menu_id),
        (mealMenuName = result.meal_menu_name),
        (menuDescription = result.meal_menu_description),
        (mealType = result.meal_type),
        (mealStatus = result.status),
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

// 2 get all details
const getAllMealMenuDetailsRepository = async (req, res) => {
  try {
    let array = [];
    let query = "select * from `meal_menu` ";
    let sql = con.format(query);
    let results = await runQuery(sql);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new MealMenuModel();
        let result = results[i];
        model.fill(
          (mealMenuId = result.meal_menu_id),
          (mealMenuName = result.meal_menu_name),
          (menuDescription = result.meal_menu_description),
          (mealType = result.meal_type),
          (mealStatus = result.status),
          (userId = result.user_id),
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

// 3 Create meal menu
const createMealMenuRepository = async (
  mealMenuName,
  menuDescription,
  mealType,
  mealStatus,
  userId,
  // mealItems
) => {
  //** insertion of meal menu  after creation of menu , with (menu id, mealitems ,userid and status ) needed to insert these all ids in menu contents table according to no of meal items id  sent */
  try {
    let query =
      "INSERT into `meal_menu` (`meal_menu_name`,`meal_menu_description`,`meal_type`,`status`,`user_id`,`created_date`,`updated_date`) VALUES(?,?,?,?,?,?,?) ";
    let sql = con.format(query, [
      mealMenuName,
      menuDescription,
      mealType,
      mealStatus,
      userId,
      newDate,
      newDate,
    ]);
    let insert = await runQuery(sql);
    let values = insert.insertId;  // menu inserted id
/** meal items adding test
    let array = []; // def an array to store the mealitems ids
  //  let itemsCreateIds= []  // to store the inserted ids after insertion
    array = mealitems;  // assigning mealitems to array
    let length = array.length   // get the length of the arrat 
    for (i = 0; i < length; i++){  // run the loop and make  insertion
      let query = "insert into `mealmenucontents` (meal_menu_id,meal_item_id,user_id,status,created_date,updated_date) VALUES (?,?,?,?,?,?)";
      let sql = con.format(query, [value, array[i], userId, itemStatus, newDate, newDate]);
      let insert2 = await runQuery(sql)
     // itemsCreateIds[i] = insert2.insertId;   // assinging the inserted ids into created array  
    }
    let insertionid = value
    return insertionid
 */
    if (values && values != 0 ) {
      return values;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log("Repo:CBE Something went wrong!");
    return false;
  }
};

// update meal menu
const updateMealMenuRepository = async (
  id,
  mealMenuName,
  menuDescription,
  mealType,
  mealStatus,
  userId
) => {
  try {
    let query =
      " UPDATE `meal_menu` set `meal_menu_name`=?,`meal_menu_description`=?,`meal_type`=?,`status`=? ,`user_id`=? where meal_menu_id  =?";
    let sql = con.format(query, [
      mealMenuName,
      menuDescription,
      mealType,
      mealStatus,
      userId,
      id,
    ]);
    let results = await runQuery(sql);
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

//delete
const deleteMealMenuRepository = async (id, res) => {
  try {
    let query = "DELETE from  `meal_menu` where meal_menu_id =?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
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

module.exports = {
  getMealMenuDetailByIdRepository,
  getAllMealMenuDetailsRepository,
  createMealMenuRepository,
  updateMealMenuRepository,
  deleteMealMenuRepository,
};
