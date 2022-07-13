const { runQuery, con } = require("../config/database");
let newDate = new Date();
const { mealItemsModel } = require("../models/mealitemsModel");

const getMealItemsDetailByIdRepository = async (id, res) => {
  try {
    let query = "select * from `meal_items` where meal_item=?";
    let sql = con.format(query, [id]);
    let results = await runQuery(sql);
    if (results.length != 0) {
      let result = results[0];
      let model = new mealItemsModel();
      model.fill(
        (mealItem = result.meal_item),
        (mealItemName = result.meal_item_name),
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

const getAllMealItemsDetailsRepository = async (req, res) => {
  try {
    let array = [];
    let query = "select * from `meal_items` where 1=1 ";
    let sql = con.format(query);
    let results = await runQuery(sql);
    let count = results.length;
    if (count != 0) {
      for (i = 0; i < count; i++) {
        let model = new mealItemsModel();
        let result = results[i];
        model.fill(
          (mealItem = result.meal_item),
          (mealItemName = result.meal_item_name),
          (Status = result.status),
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
const createMealItemsRepository = async (mealItemName, Status, userId) => {
  try {
    let query =
      "INSERT into `meal_items` (`meal_item_name`,`status`,`user_id`,`created_date`,`updated_date`) VALUES(?,?,?,?,?) ";
    let sql = con.format(query, [
      mealItemName,
      Status,
      userId,
      newDate,
      newDate,
    ]);
    let results = await runQuery(sql);
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

const updateMealItemsRepository = async (id, mealItemName, Status, userId) => {
  try {
    let query =
      " UPDATE `meal_items` set `meal_item_name`=?,`status`=?,`user_id`=?,`updated_date`=? where meal_item  =?";
    let sql = con.format(query, [mealItemName, Status, userId, newDate, id]);
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

const deleteMealItemsRepository = async (id, res) => {
  try {
    let query = "DELETE from  `meal_items` where `meal_item`=?";
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
  getMealItemsDetailByIdRepository,
  getAllMealItemsDetailsRepository,
  createMealItemsRepository,
  updateMealItemsRepository,
  deleteMealItemsRepository,
};
